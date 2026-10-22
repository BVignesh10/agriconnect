package com.agriconnect.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "equipments")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "equipment_type")
    private String equipmentType;

    @Column(name = "rent_rate")
    private Double rentRate;

    @Column(name = "rate_unit")
    private String rateUnit;

    @Column(name = "available_timings")
    private String availableTimings;

    @Column(name = "location")
    private String location;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "owner_phone")
    private String ownerPhone;

    @Column(name = "is_available")
    private Boolean isAvailable = true;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    public Equipment() {}

    public Equipment(Long id, String title, String equipmentType, Double rentRate, String rateUnit, String availableTimings, String location, String ownerName, String ownerPhone, Boolean isAvailable, String imageUrl) {
        this.id = id;
        this.title = title;
        this.equipmentType = equipmentType;
        this.rentRate = rentRate;
        this.rateUnit = rateUnit;
        this.availableTimings = availableTimings;
        this.location = location;
        this.ownerName = ownerName;
        this.ownerPhone = ownerPhone;
        this.isAvailable = isAvailable;
        this.imageUrl = imageUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getEquipmentType() { return equipmentType; }
    public void setEquipmentType(String equipmentType) { this.equipmentType = equipmentType; }

    public Double getRentRate() { return rentRate; }
    public void setRentRate(Double rentRate) { this.rentRate = rentRate; }

    public String getRateUnit() { return rateUnit; }
    public void setRateUnit(String rateUnit) { this.rateUnit = rateUnit; }

    public String getAvailableTimings() { return availableTimings; }
    public void setAvailableTimings(String availableTimings) { this.availableTimings = availableTimings; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getOwnerPhone() { return ownerPhone; }
    public void setOwnerPhone(String ownerPhone) { this.ownerPhone = ownerPhone; }

    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}