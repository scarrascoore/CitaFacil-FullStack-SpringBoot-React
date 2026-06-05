package com.portfolio.citafacil.dto;

import com.portfolio.citafacil.entity.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record AppointmentResponse(
        Long id,
        String patientName,
        String patientEmail,
        LocalDate appointmentDate,
        LocalTime appointmentTime,
        String reason,
        AppointmentStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
