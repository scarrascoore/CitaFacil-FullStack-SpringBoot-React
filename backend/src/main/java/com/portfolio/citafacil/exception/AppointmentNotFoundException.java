package com.portfolio.citafacil.exception;

public class AppointmentNotFoundException extends RuntimeException {
    public AppointmentNotFoundException(Long id) {
        super("Appointment with id  " + id + " was not found");
    }
}
