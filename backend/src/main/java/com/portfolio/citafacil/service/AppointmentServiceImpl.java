package com.portfolio.citafacil.service;

import com.portfolio.citafacil.dto.AppointmentCreateRequest;
import com.portfolio.citafacil.dto.AppointmentResponse;
import com.portfolio.citafacil.dto.AppointmentStatusUpdateRequest;
import com.portfolio.citafacil.entity.Appointment;
import com.portfolio.citafacil.entity.AppointmentStatus;
import com.portfolio.citafacil.exception.AppointmentNotFoundException;
import com.portfolio.citafacil.exception.InvalidAppointmentStatusException;
import com.portfolio.citafacil.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public List<AppointmentResponse> findAll() {
        return appointmentRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public AppointmentResponse findById(Long id) {
        Appointment appointment = findAppointmentOrThrow(id);
        return toResponse(appointment);
    }

    @Override
    public List<AppointmentResponse> findByStatus(AppointmentStatus status) {
        return appointmentRepository.findByStatus(status)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<AppointmentResponse> findByAppointmentDate(LocalDate appointmentDate) {
        return appointmentRepository.findByAppointmentDate(appointmentDate)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<AppointmentResponse> findByPatientName(String patientName) {
        return appointmentRepository.findByPatientNameContainingIgnoreCase(patientName)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public AppointmentResponse create(AppointmentCreateRequest request) {
        Appointment appointment = new Appointment(
                request.patientName(),
                request.patientEmail(),
                request.appointmentDate(),
                request.appointmentTime(),
                request.reason()
        );
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return toResponse(savedAppointment);
    }

    @Override
    public AppointmentResponse updateStatus(Long id, AppointmentStatusUpdateRequest request) {
        Appointment appointment = findAppointmentOrThrow(id);
        validateAppointmentCanBeUpdated(appointment, request.status());
        appointment.updateStatus(request.status());
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return toResponse(updatedAppointment);
    }

    @Override
    public void deleteById(Long id) {
        Appointment appointment = findAppointmentOrThrow(id);
        appointmentRepository.delete(appointment);
    }

    private Appointment findAppointmentOrThrow(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(()-> new AppointmentNotFoundException(id));
    }

    private void validateAppointmentCanBeUpdated(
            Appointment appointment,
            AppointmentStatus newStatus)
    {
        if (appointment.isCancelled()){
            throw new InvalidAppointmentStatusException(
                    appointment.getId(),
                    "Cancelled appointment cannot be modified"
            );
        }
        if (appointment.isCompleted()){
            throw new InvalidAppointmentStatusException(
                    appointment.getId(),
                    "Completed appointment cannot be modified"
            );
        }
    }

    private AppointmentResponse toResponse(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getPatientName(),
                appointment.getPatientEmail(),
                appointment.getAppointmentDate(),
                appointment.getAppointmentTime(),
                appointment.getReason(),
                appointment.getStatus(),
                appointment.getCreatedAt(),
                appointment.getUpdatedAt()
        );
    }
}
