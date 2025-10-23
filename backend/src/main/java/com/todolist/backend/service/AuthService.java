package com.todolist.backend.service;

import com.todolist.backend.dto.auth.login.AuthResponse;
import com.todolist.backend.dto.auth.login.LoginRequest;
import com.todolist.backend.dto.auth.register.RegistrationRequest;
import com.todolist.backend.dto.auth.register.RegistrationResponse;
import jakarta.validation.Valid;

public interface AuthService {
    RegistrationResponse register(@Valid RegistrationRequest request);
    AuthResponse login(@Valid LoginRequest loginRequest );
}
