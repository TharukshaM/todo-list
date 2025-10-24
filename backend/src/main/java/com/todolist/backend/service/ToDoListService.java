package com.todolist.backend.service;

import com.todolist.backend.dto.todolist.ToDoItemRequestDto;
import com.todolist.backend.dto.todolist.ToDoItemResponseDto;

import java.util.List;

public interface ToDoListService {
    ToDoItemResponseDto addToDoItem(int userid, ToDoItemRequestDto toDoItemRequestDto);
    List<ToDoItemResponseDto> getLatestToDoItems(int userid);
}
