package com.agriconnect.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/advisory")
@CrossOrigin(origins = "http://localhost:3000")
public class AdvisoryController {

    @GetMapping("/weather/{location}")
    public ResponseEntity<Map<String, Object>> getWeatherInfo(@PathVariable String location) {
        Map<String, Object> weatherData = new HashMap<>();
        weatherData.put("location", location);
        weatherData.put("temperature", "31°C");
        weatherData.put("humidity", "78%");
        weatherData.put("condition", "Partly Cloudy");
        weatherData.put("rainAlert", "Light rain expected in next 24 hours. Postpone pesticide spraying.");
        return ResponseEntity.ok(weatherData);
    }

    @PostMapping("/disease-check")
    public ResponseEntity<Map<String, String>> analyzeDisease(@RequestBody Map<String, String> request) {
        String cropName = request.getOrDefault("cropName", "").toLowerCase();
        String symptom = request.getOrDefault("symptom", "").toLowerCase();

        Map<String, String> response = new HashMap<>();

        if (symptom.contains("yellow") || symptom.contains("spots")) {
            response.put("disease", "Leaf Spot / Yellowing Fungus");
            response.put("severity", "Moderate");
            response.put("treatment", "Spray Copper Oxychloride (3g/liter) or Mancozeb within 3 days.");
        } else if (symptom.contains("wilt") || symptom.contains("dry")) {
            response.put("disease", "Bacterial Wilt / Root Rot");
            response.put("severity", "High");
            response.put("treatment", "Ensure proper soil drainage and apply Trichoderma viride near root zones.");
        } else {
            response.put("disease", "General Pest Attack / Nutrient Deficiency");
            response.put("severity", "Low");
            response.put("treatment", "Apply balanced NPK fertilizer and monitor for 48 hours.");
        }

        return ResponseEntity.ok(response);
    }
}