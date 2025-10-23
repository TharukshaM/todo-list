package com.todolist.backend.dto.todolist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ListResponseDto {
    private int userId;
    private String title;
    private String description;
}
