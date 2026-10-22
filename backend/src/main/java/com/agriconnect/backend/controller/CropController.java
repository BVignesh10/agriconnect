package com.agriconnect.backend.controller;

import com.agriconnect.backend.entity.Crop;
import com.agriconnect.backend.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class CropController {

    @Autowired
    private CropRepository cropRepository;

    @PostMapping
    public ResponseEntity<?> createCropListing(@RequestBody Crop crop) {
        try {
            if (crop.getCropName() == null || crop.getCropName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Crop name is required!");
            }
            Crop savedCrop = cropRepository.save(crop);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCrop);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Database error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Crop>> getAllCrops() {
        List<Crop> crops = cropRepository.findAll();
        return ResponseEntity.ok(crops);
    }

    @GetMapping("/seller/{email}")
    public ResponseEntity<List<Crop>> getCropsBySeller(@PathVariable String email) {
        List<Crop> crops = cropRepository.findBySellerEmail(email);
        return ResponseEntity.ok(farmsOrCrops(crops));
    }

    private List<Crop> farmsOrCrops(List<Crop> list) {
        return list;
    }
}