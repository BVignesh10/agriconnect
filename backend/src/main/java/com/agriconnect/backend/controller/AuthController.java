package com.agriconnect.backend.controller;

import com.agriconnect.backend.entity.User;
import com.agriconnect.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> signUpRequest) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, Object> loginRequest) {
        String email = (String) loginRequest.get("email");
        String token = jwtUtils.generateToken(email);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", email);
        response.put("fullName", email.split("@")[0]);

        return ResponseEntity.ok(response);
    }
}