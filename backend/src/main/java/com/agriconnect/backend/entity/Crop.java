package com.agriconnect.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "crops")
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "crop_name", nullable = false)
    private String cropName;

    @Column(name = "crop_category")
    private String cropCategory;

    @Column(name = "quantity_in_quintals")
    private Double quantityInQuintals;

    @Column(name = "price_per_quintal")
    private Double pricePerQuintal;

    @Column(name = "location")
    private String location;

    @Column(name = "seller_email")
    private String sellerEmail;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @Column(name = "quality_grade")
    private String qualityGrade;

    public Crop() {}

    public Crop(Long id, String cropName, String cropCategory, Double quantityInQuintals, Double pricePerQuintal, String location, String sellerEmail, String imageUrl, String qualityGrade) {
        this.id = id;
        this.cropName = cropName;
        this.cropCategory = cropCategory;
        this.quantityInQuintals = quantityInQuintals;
        this.pricePerQuintal = pricePerQuintal;
        this.location = location;
        this.sellerEmail = sellerEmail;
        this.imageUrl = imageUrl;
        this.qualityGrade = qualityGrade;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getCropCategory() { return cropCategory; }
    public void setCropCategory(String cropCategory) { this.cropCategory = cropCategory; }

    public Double getQuantityInQuintals() { return quantityInQuintals; }
    public void setQuantityInQuintals(Double quantityInQuintals) { this.quantityInQuintals = quantityInQuintals; }

    public Double getPricePerQuintal() { return pricePerQuintal; }
    public void setPricePerQuintal(Double pricePerQuintal) { this.pricePerQuintal = pricePerQuintal; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSellerEmail() { return sellerEmail; }
    public void setSellerEmail(String sellerEmail) { this.sellerEmail = sellerEmail; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getQualityGrade() { return qualityGrade; }
    public void setQualityGrade(String qualityGrade) { this.qualityGrade = qualityGrade; }
}