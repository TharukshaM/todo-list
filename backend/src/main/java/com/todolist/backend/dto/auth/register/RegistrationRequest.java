package com.todolist.backend.dto.auth.register;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {
    @NotBlank
    private String name;
    @NotBlank @Email
    private String email;
    @NotBlank  @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
}
