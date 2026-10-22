package com.agriconnect.backend.repository;

import com.agriconnect.backend.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findBySellerEmail(String sellerEmail);
}