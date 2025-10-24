package com.todolist.backend.service;

import com.todolist.backend.dto.todolist.ToDoItemRequestDto;
import com.todolist.backend.dto.todolist.ToDoItemResponseDto;

public interface ToDoListService {
    ToDoItemResponseDto addToDoItem(int userid, ToDoItemRequestDto toDoItemRequestDto);
}
