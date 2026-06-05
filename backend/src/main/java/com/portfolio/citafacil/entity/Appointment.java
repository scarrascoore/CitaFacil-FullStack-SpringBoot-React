package com.portfolio.citafacil.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name="appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 120)
    private String patientName;

    @Column(nullable = false,length = 150)
    private String patientEmail;

    @Column(nullable = false)
    private LocalDate appointmentDate;

    @Column(nullable = false)
    private LocalTime appointmentTime;

    @Column(nullable = false,length = 500)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AppointmentStatus status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    protected Appointment() {}

    public Appointment(
            String patientName,
            String patientEmail,
            LocalDate appointmentDate,
            LocalTime appointmentTime,
            String reason
    ){
        this.patientName = patientName;
        this.patientEmail = patientEmail;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.reason = reason;
        this.status = AppointmentStatus.PENDING;
        this.createdAt = LocalDateTime.now();
    }

    public void updateStatus(AppointmentStatus status){
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }

    public boolean isCancelled(){
        return this.status == AppointmentStatus.CANCELLED;
    }
    public boolean isCompleted(){
        return this.status == AppointmentStatus.COMPLETED;
    }

    public Long getId() {
        return id;
    }

    public String getPatientName() {
        return patientName;
    }

    public String getPatientEmail() {
        return patientEmail;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public String getReason() {
        return reason;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
