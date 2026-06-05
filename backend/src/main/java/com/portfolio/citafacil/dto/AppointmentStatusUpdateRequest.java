package com.portfolio.citafacil.dto;

import com.portfolio.citafacil.entity.AppointmentStatus;
import jakarta.validation.constraints.NotNull;

public record AppointmentStatusUpdateRequest(
        @NotNull(message = "The appointment status is required")
        AppointmentStatus status
) {
}
