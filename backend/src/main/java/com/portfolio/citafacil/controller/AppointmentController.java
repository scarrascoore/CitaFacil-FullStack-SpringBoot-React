package com.portfolio.citafacil.controller;

import com.portfolio.citafacil.dto.AppointmentCreateRequest;
import com.portfolio.citafacil.dto.AppointmentResponse;
import com.portfolio.citafacil.dto.AppointmentStatusUpdateRequest;
import com.portfolio.citafacil.entity.AppointmentStatus;
import com.portfolio.citafacil.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> findAll() {
        return ResponseEntity.ok(appointmentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.findById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AppointmentResponse>> findByStatus(
            @PathVariable AppointmentStatus status
    ) {
        return ResponseEntity.ok(appointmentService.findByStatus(status));
    }

    @GetMapping("/date/{appointmentDate}")
    public ResponseEntity<List<AppointmentResponse>> findByAppointmentDate(
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate appointmentDate
    ) {
        return ResponseEntity.ok(appointmentService.findByAppointmentDate(appointmentDate));
    }

    @GetMapping("/search")
    public ResponseEntity<List<AppointmentResponse>> findByPatientName(
            @RequestParam String patientName
    ) {
        return ResponseEntity.ok(appointmentService.findByPatientName(patientName));
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> create(
            @Valid @RequestBody AppointmentCreateRequest request
    ) {
        AppointmentResponse response = appointmentService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<AppointmentResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentStatusUpdateRequest request
    ) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, request));
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<AppointmentResponse> confirm(@PathVariable Long id) {
        AppointmentStatusUpdateRequest request = new AppointmentStatusUpdateRequest(
                AppointmentStatus.CONFIRMED
        );

        return ResponseEntity.ok(appointmentService.updateStatus(id, request));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<AppointmentResponse> cancel(@PathVariable Long id) {
        AppointmentStatusUpdateRequest request = new AppointmentStatusUpdateRequest(
                AppointmentStatus.CANCELLED
        );

        return ResponseEntity.ok(appointmentService.updateStatus(id, request));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<AppointmentResponse> complete(@PathVariable Long id) {
        AppointmentStatusUpdateRequest request = new AppointmentStatusUpdateRequest(
                AppointmentStatus.COMPLETED
        );

        return ResponseEntity.ok(appointmentService.updateStatus(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        appointmentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}