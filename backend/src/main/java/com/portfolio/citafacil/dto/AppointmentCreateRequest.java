package com.portfolio.citafacil.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentCreateRequest(
        @NotBlank(message = "The patient name is required")
        @Size(max = 120, message = "The patient must have a maximum of 120 characters")
        String patientName,

        @NotBlank(message = "The patient email is required")
        @Email(message = "The patient email must be valid")
        @Size(max = 150, message = "The patient email must have a maximum of 150 characters")
        String patientEmail,

        @NotNull(message = "The patient email is required")
        @FutureOrPresent(message = "The appointment dat must be today or a future date")
        LocalDate appointmentDate,

        @NotNull(message = "The appointment time is required")
        LocalTime appointmentTime,

        @NotBlank(message = "The reason is required")
        @Size(max = 500, message = "The reason must have a maximum 500 characters")
        String reason
) {
}
