package com.todolist.backend.dto.todolist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Timestamp;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ToDoItemResponseDto {
    private int id;
    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime createdAt;
}
