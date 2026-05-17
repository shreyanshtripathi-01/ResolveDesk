package com.resolvedesk.backend.controller;

import com.resolvedesk.backend.entity.Complaint;
import com.resolvedesk.backend.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        complaint.setStatus("Pending");
        return complaintRepository.save(complaint);
    }
    
    @PutMapping("/{id}")
    public Complaint updateComplaintStatus(@PathVariable Long id, @RequestBody Complaint updatedComplaint) {
        Complaint complaint = complaintRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setStatus(updatedComplaint.getStatus());
        return complaintRepository.save(complaint);
    }
    
    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable Long id) {
        complaintRepository.deleteById(id);
        return "Complaint deleted successfully";
    }
}

