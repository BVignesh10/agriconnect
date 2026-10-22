package com.agriconnect.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "farms")
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String farmName;

    private String location;

    private Double areaInAcres;

    private String soilType;

    private String ownerEmail;

    public Farm() {}

    public Farm(Long id, String farmName, String location, Double areaInAcres, String soilType, String ownerEmail) {
        this.id = id;
        this.farmName = farmName;
        this.location = location;
        this.areaInAcres = areaInAcres;
        this.soilType = soilType;
        this.ownerEmail = ownerEmail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFarmName() {
        return farmName;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getAreaInAcres() {
        return areaInAcres;
    }

    public void setAreaInAcres(Double areaInAcres) {
        this.areaInAcres = areaInAcres;
    }

    public String getSoilType() {
        return soilType;
    }

    public void setSoilType(String soilType) {
        this.soilType = soilType;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }
}