package com.todolist.backend.controller;

import com.todolist.backend.dto.auth.login.AuthResponse;
import com.todolist.backend.dto.auth.login.LoginRequest;
import com.todolist.backend.dto.auth.register.RegistrationRequest;
import com.todolist.backend.dto.auth.register.RegistrationResponse;
import com.todolist.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@Valid @RequestBody RegistrationRequest request){
        RegistrationResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request){
        System.out.println("Login attempt for email");
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

}
