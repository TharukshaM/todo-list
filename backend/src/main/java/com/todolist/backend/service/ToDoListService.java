package com.todolist.backend.service;

import com.todolist.backend.dto.todolist.ToDoItemRequestDto;
import com.todolist.backend.dto.todolist.ToDoItemResponseDto;

import java.util.List;

public interface ToDoListService {
    ToDoItemResponseDto addToDoItem(int userid, ToDoItemRequestDto toDoItemRequestDto);
    List<ToDoItemResponseDto> getLatestToDoItems(int userid);
    ToDoItemResponseDto updateToDoItem(int userId,int todoId, ToDoItemRequestDto requestDto);
    String deleteToDoItem(int userId, int todoId);
    ToDoItemResponseDto toggleCompleted(int userId, int todoId);

}
