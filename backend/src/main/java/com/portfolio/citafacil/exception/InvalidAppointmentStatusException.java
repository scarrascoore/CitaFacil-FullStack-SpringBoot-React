package com.portfolio.citafacil.exception;

public class InvalidAppointmentStatusException extends RuntimeException {
    public InvalidAppointmentStatusException(Long id, String message) {
        super("Appointment with id  " + id + " cannot be updated. " + message);
    }
}
