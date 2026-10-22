package com.agriconnect.backend.controller;

import com.agriconnect.backend.entity.Equipment;
import com.agriconnect.backend.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipments")
@CrossOrigin(origins = "*")
public class EquipmentController {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @GetMapping
    public ResponseEntity<List<Equipment>> getAllEquipments() {
        return ResponseEntity.ok(equipmentRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment) {
        if (equipment.getIsAvailable() == null) equipment.setIsAvailable(true);
        return ResponseEntity.ok(equipmentRepository.save(equipment));
    }
}