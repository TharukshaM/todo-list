package com.todolist.backend.dto.todolist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ToDoItemRequestDto {

    private String title;
    private String description;
}
