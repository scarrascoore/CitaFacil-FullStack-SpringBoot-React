import { useEffect, useState } from "react";
import {
  cancelAppointment,
  completeAppointment,
  confirmAppointment,
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAppointmentsByStatus,
} from "../api/appointmentApi";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentTable from "../components/AppointmentTable";
import type {
  Appointment,
  AppointmentCreateRequest,
  AppointmentStatus,
} from "../types/appointment";

const statusOptions: AppointmentStatus[] = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | "ALL">(
    "ALL"
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function loadAppointments() {
    setLoading(true);
    setErrorMessage(null);

    try {
      const data =
        selectedStatus === "ALL"
          ? await getAppointments()
          : await getAppointmentsByStatus(selectedStatus);

      setAppointments(data);
    } catch {
      setErrorMessage("No se pudieron cargar las citas. Verifica que el backend esté activo.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isCancelled = false;

    const fetchAppointments = async () => {
      setLoading(true);
      setErrorMessage(null);

      try {
        const data =
          selectedStatus === "ALL"
            ? await getAppointments()
            : await getAppointmentsByStatus(selectedStatus);

        if (!isCancelled) {
          setAppointments(data);
        }
      } catch {
        if (!isCancelled) {
          setErrorMessage("No se pudieron cargar las citas. Verifica que el backend esté activo.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    Promise.resolve().then(fetchAppointments);

    return () => {
      isCancelled = true;
    };
  }, [selectedStatus]);

  async function handleCreateAppointment(request: AppointmentCreateRequest) {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await createAppointment(request);
      setSuccessMessage("Cita registrada correctamente.");
      await loadAppointments();
    } catch {
      setErrorMessage("No se pudo registrar la cita. Revisa los datos ingresados.");
    }
  }

  async function handleConfirmAppointment(id: number) {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await confirmAppointment(id);
      setSuccessMessage("Cita confirmada correctamente.");
      await loadAppointments();
    } catch {
      setErrorMessage("No se pudo confirmar la cita.");
    }
  }

  async function handleCancelAppointment(id: number) {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await cancelAppointment(id);
      setSuccessMessage("Cita cancelada correctamente.");
      await loadAppointments();
    } catch {
      setErrorMessage("No se pudo cancelar la cita.");
    }
  }

  async function handleCompleteAppointment(id: number) {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await completeAppointment(id);
      setSuccessMessage("Cita completada correctamente.");
      await loadAppointments();
    } catch {
      setErrorMessage("Solo una cita confirmada puede marcarse como completada.");
    }
  }

  async function handleDeleteAppointment(id: number) {
    const shouldDelete = window.confirm("¿Seguro que deseas eliminar esta cita?");

    if (!shouldDelete) {
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await deleteAppointment(id);
      setSuccessMessage("Cita eliminada correctamente.");
      await loadAppointments();
    } catch {
      setErrorMessage("No se pudo eliminar la cita.");
    }
  }

  return (
    <main className="page-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">Full Stack Java + React</p>
          <h1>CitaFácil</h1>
          <p className="page-description">
            Aplicación web para registrar, consultar y gestionar citas usando React,
            TypeScript, Spring Boot y PostgreSQL.
          </p>
        </div>
      </header>

      <section className="toolbar card">
        <div>
          <label htmlFor="statusFilter">Filtrar por estado</label>
          <select
            id="statusFilter"
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value as AppointmentStatus | "ALL")
            }
          >
            <option value="ALL">Todos</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </section>

      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="layout-grid">
        <AppointmentForm onCreateAppointment={handleCreateAppointment} />

        {loading ? (
          <section className="card">
            <h2>Citas registradas</h2>
            <p>Cargando citas...</p>
          </section>
        ) : (
          <AppointmentTable
            appointments={appointments}
            onConfirmAppointment={handleConfirmAppointment}
            onCancelAppointment={handleCancelAppointment}
            onCompleteAppointment={handleCompleteAppointment}
            onDeleteAppointment={handleDeleteAppointment}
          />
        )}
      </div>
    </main>
  );
}