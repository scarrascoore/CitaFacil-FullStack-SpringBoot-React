import {useState} from 'react';
import type {AppointmentCreateRequest} from '../types/appointment';

interface AppointmentFormProps {
    onCreateAppointment: (request: AppointmentCreateRequest) => Promise<void>;
}

const initialFormState: AppointmentCreateRequest = {
    patientName: '',
    patientEmail: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
};

export default function AppointmentForm({onCreateAppointment}: AppointmentFormProps) 
{
    const [formData, setFormData] = useState<AppointmentCreateRequest>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value
        }));
    }


async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
     
    try {
        await onCreateAppointment(formData);
            setFormData(initialFormState);
    } finally {
        setIsSubmitting(false);
    }
}

    return (
        <section className="card">
        <h2>Registrar Cita</h2>

        <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="patientName">Nombre del Paciente</label>
                    <input
                        id="patientName"
                        name="patientName"
                        type="text"
                        value={formData.patientName}
                        onChange={handleChange}
                        placeholder="Ejemplo: Juan Perez"
                        required
                    />
            </div>

            <div className="form-group">
                <label htmlFor="patientEmail">Correo Electrónico</label>
                <input
                    id="patientEmail"
                    name="patientEmail"
                    type="email"
                    value={formData.patientEmail}
                    onChange={handleChange}
                    placeholder="Ejemplo: juan.perez@example.com"
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="appointmentDate">Fecha</label>
                    <input
                        id="appointmentDate"
                        name="appointmentDate"
                        type="date"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                    />
                </div>            
            </div>

            <div className="form-group">
                <label htmlFor="appointmentTime">Hora</label>
                <input
                    id="appointmentTime"
                    name="appointmentTime"
                    type="time"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="reason">Motivo de la Cita</label>
                <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Ejemplo: Revisión médica"
                    rows={4}
                    required
                />
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Registrando...' : 'Registrar Cita'}
            </button>
        </form>
    </section>

    );
}