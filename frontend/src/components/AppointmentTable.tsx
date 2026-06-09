import type { Appointment } from '../types/appointment';
import StatusBadge from './StatusBadge';

interface AppointmentTableProps {
    appointments: Appointment[];
    onConfirmAppointment: (appointmentId: number) => Promise<void>;
    onCancelAppointment: (appointmentId: number) => Promise<void>;
    onCompleteAppointment: (appointmentId: number) => Promise<void>;
    onDeleteAppointment: (appointmentId: number) => Promise<void>;
}

export default function AppointmentTable({
    appointments,
    onConfirmAppointment,
    onCancelAppointment,
    onCompleteAppointment,
    onDeleteAppointment,
}: AppointmentTableProps) {
    if (appointments.length === 0) {
    return (
        <section className="card">
            <h2>Citas registradas</h2>
            <p className= "empty-message">No hay citas registradas.</p>
        </section>
    );  
    }

    return (
        <section className="card">
            <h2>Citas registradas</h2>

            <div className="table-container">
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Correo</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Motivo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.patientName}</td>
                                <td>{appointment.patientEmail}</td>
                                <td>{appointment.appointmentDate}</td>
                                <td>{appointment.appointmentTime}</td>
                                <td>{appointment.reason}</td>
                                <td><StatusBadge status={appointment.status} /></td>
                                <td>

                                    <div className="actions">
                                        <button type="button" className="button-secondary" 
                                        onClick={() => onConfirmAppointment(appointment.id)}
                                        disabled={
                                            appointment.status === 'CANCELLED' ||
                                            appointment.status === 'COMPLETED' ||
                                            appointment.status === 'CONFIRMED'
                                        }>
                                            Confirmar
                                        </button>
                                        
                                        <button type="button" className="button-success" 
                                        onClick={() => onCompleteAppointment(appointment.id)}
                                        disabled={
                                            appointment.status !== 'CONFIRMED'
                                        }>
                                            Completar
                                        </button>
                                        
                                        <button type="button" className="button-warning" 
                                        onClick={() => onCancelAppointment(appointment.id)}
                                        disabled={
                                            appointment.status === 'CANCELLED' ||
                                            appointment.status === 'COMPLETED'
                                        }>
                                            Cancelar
                                        </button>

                                        <button type="button" className="button-danger" 
                                        onClick={() => onDeleteAppointment(appointment.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );  
}
