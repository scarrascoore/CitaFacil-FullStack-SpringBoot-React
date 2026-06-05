package com.portfolio.citafacil.service;

import com.portfolio.citafacil.dto.AppointmentCreateRequest;
import com.portfolio.citafacil.dto.AppointmentResponse;
import com.portfolio.citafacil.dto.AppointmentStatusUpdateRequest;
import com.portfolio.citafacil.entity.AppointmentStatus;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {
    List<AppointmentResponse> findAll();
    AppointmentResponse findById(Long id);
    List<AppointmentResponse> findByStatus(AppointmentStatus status);
    List<AppointmentResponse> findByAppointmentDate(LocalDate appointmentDate);
    List<AppointmentResponse> findByPatientName(String patientName);
    AppointmentResponse create(AppointmentCreateRequest request);
    AppointmentResponse updateStatus(Long id, AppointmentStatusUpdateRequest request);
    void deleteById(Long id);
}
