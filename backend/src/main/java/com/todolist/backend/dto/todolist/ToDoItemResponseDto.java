package com.todolist.backend.dto.todolist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ToDoItemResponseDto {
    private int id;
    private String title;
    private String description;
}
