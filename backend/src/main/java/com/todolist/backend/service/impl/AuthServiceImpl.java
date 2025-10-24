package com.todolist.backend.service.impl;

import com.todolist.backend.dto.auth.login.AuthResponse;
import com.todolist.backend.dto.auth.login.LoginRequest;
import com.todolist.backend.dto.auth.register.RegistrationRequest;
import com.todolist.backend.dto.auth.register.RegistrationResponse;
import com.todolist.backend.model.User;
import com.todolist.backend.repository.UserRepository;
import com.todolist.backend.security.JwtService;
import com.todolist.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.server.ResponseStatusException;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public RegistrationResponse register(RegistrationRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email already exists");
            }
            String hashedPassword = passwordEncoder.encode(request.getPassword());
            User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .hashedPassword(hashedPassword)
                    .build();

            userRepository.save(user);

            return RegistrationResponse.builder()
                    .useId(user.getId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }

    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        try {
            User user = userRepository.findByEmail(loginRequest.email().toLowerCase())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            if (!passwordEncoder.matches(loginRequest.password(), user.getHashedPassword())) {
                throw new RuntimeException("Invalid credentials");
            }
            String token = jwtService.generateToken(user);
            return new AuthResponse(token);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, ex.getMessage(), ex);
        }

    }
}