import axios from "axios";
import type { 
    Appointment,
    AppointmentCreateRequest,
    AppointmentStatus,
    AppointmentStatusUpdateRequest,
} from '../types/appointment';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: 
    {
        "Content-Type": "application/json",
    },
});

export async function getAppointments(): Promise<Appointment[]> {
    const response = await api.get<Appointment[]>("/appointments");
    return response.data;
}

export async function getAppointmentsByStatus(
    status: AppointmentStatus): Promise<Appointment[]> 
{
    const response = await api.get<Appointment[]>(`/appointments?status=${status}`);
    return response.data;
}

export async function createAppointment(
    request: AppointmentCreateRequest): Promise<Appointment> 
{
    const response = await api.post<Appointment>("/appointments", request);
    return response.data;
}

export async function updateAppointmentStatus(
    id: number,
    request: AppointmentStatusUpdateRequest): Promise<Appointment> 
{
    const response = await api.patch<Appointment>(
        `/appointments/${id}`, request);
    return response.data;
}

export async function confirmAppointment(id: number): Promise<Appointment> {
    const response = await api.patch<Appointment>(
        `/appointments/${id}/confirm`);
    return response.data;
}

export async function cancelAppointment(id: number): Promise<Appointment> 
{
    const response = await api.patch<Appointment>(`/appointments/${id}/cancel`);
    return response.data;
}

export async function completeAppointment(id: number): Promise<Appointment> 
{
    const response = await api.patch<Appointment>(`/appointments/${id}/complete`);
    return response.data;
}

export async function deleteAppointment(id: number): Promise<void> 
{
    await api.delete(`/appointments/${id}`);
}


