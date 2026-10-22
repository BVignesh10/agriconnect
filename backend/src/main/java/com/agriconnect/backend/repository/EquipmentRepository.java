package com.agriconnect.backend.repository;

import com.agriconnect.backend.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByIsAvailable(Boolean isAvailable);
}