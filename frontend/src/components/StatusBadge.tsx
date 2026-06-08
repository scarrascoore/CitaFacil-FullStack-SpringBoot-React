import type {AppointmentStatus} from "../types/appointment";

interface StatusBadgeProps {
  status: AppointmentStatus;
}

export default function StatusBadge({status}: StatusBadgeProps) {
const labelByStatus: Record<AppointmentStatus, string> = {
        PENDING: "Pendiente",
        CONFIRMED: "Confirmada",
        CANCELLED: "Cancelada",
        COMPLETED: "Completada",
        
};

const classNameByStatus: Record<AppointmentStatus, string> = {
        PENDING: "badge badge-pending",
        CONFIRMED: "badge badge-confirmed",
        CANCELLED: "badge badge-cancelled",
        COMPLETED: "badge badge-completed",
        
};

    return <span className={classNameByStatus[status]}>{labelByStatus[status]}</span>;
}