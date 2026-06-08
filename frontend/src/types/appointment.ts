export type AppointmentStatus = 
    |"PENDING"
    |"CONFIRMED"
    |"CANCELLED"
    |"COMPLETED";

export interface Appointment {
    id: number;
    patientName: string;
    patientEmail: string;
    appointmentDate: string;
    appointmentTime: string;
    reason: string;
    status: AppointmentStatus;
    createdAt: string;
    updatedAt: string | null;
}

export interface AppointmentCreateRequest{
patientName: string;
patientEmail: string;
appointmentDate: string;
appointmentTime: string;
reason: string;
}

export interface AppointmentStatusUpdateRequest{
    status: AppointmentStatus;
}