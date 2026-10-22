package com.agriconnect.backend.controller;

import com.agriconnect.backend.entity.Farm;
import com.agriconnect.backend.repository.FarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farms")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class FarmController {

    @Autowired
    private FarmRepository farmRepository;

    @PostMapping
    public ResponseEntity<?> createFarm(@RequestBody Farm farm) {
        try {
            Farm savedFarm = farmRepository.save(farm);
            return ResponseEntity.ok(savedFarm);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving farm: " + e.getMessage());
        }
    }

    @GetMapping("/owner/{email}")
    public ResponseEntity<List<Farm>> getFarmsByOwner(@PathVariable String email) {
        List<Farm> farms = farmRepository.findByOwnerEmail(email);
        return ResponseEntity.ok(farms);
    }
}