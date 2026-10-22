package com.agriconnect.backend.repository;

import com.agriconnect.backend.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Long> {
    List<Farm> findByOwnerEmail(String ownerEmail);
}