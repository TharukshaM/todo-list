package com.todolist.backend.dto.auth.register;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationResponse {
    @NotBlank
    private int useId;
    @NotBlank
    private String name;
    @NotBlank
    private String email;
}
