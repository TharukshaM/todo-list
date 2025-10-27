package com.todolist.backend.controller;

import com.todolist.backend.dto.todolist.ToDoItemRequestDto;
import com.todolist.backend.dto.todolist.ToDoItemResponseDto;
import com.todolist.backend.service.ToDoListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@RestController
@RequestMapping("/api/todolist")
@RequiredArgsConstructor
public class TodoListController {
    private final ToDoListService toDoListService;

    private Integer currentUser() {
        var auth = getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        String userId = auth.getName();
        if (userId == null || userId.isBlank()) {
            throw new RuntimeException("User not found");
        }
        try {
            return Integer.parseInt(userId);
        } catch (NumberFormatException ex) {
            throw new RuntimeException("Unable to parse user id from authentication name", ex);
        }
    }

    @PostMapping("/additem")
    public ResponseEntity<ToDoItemResponseDto> addItem(@RequestBody ToDoItemRequestDto toDoItemRequestDto) {
            int userId = currentUser();
            ToDoItemResponseDto item = toDoListService.addToDoItem(userId, toDoItemRequestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }
    @GetMapping("/items")
    public ResponseEntity<List<ToDoItemResponseDto>> getLatestFiveItems() {
        int userId = currentUser();
        List<ToDoItemResponseDto> items = toDoListService.getLatestToDoItems(userId);
        return ResponseEntity.ok(items);
    }

    @PutMapping("/item/{id}")
    public ResponseEntity<ToDoItemResponseDto> updateItem(
            @PathVariable int id,
            @RequestBody ToDoItemRequestDto toDoItemRequestDto) {

        int userId = currentUser();
        ToDoItemResponseDto updatedItem = toDoListService.updateToDoItem(userId, id, toDoItemRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedItem);
    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable int id) {
        int userId = currentUser();
        toDoListService.deleteToDoItem(userId, id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Item deleted");
    }

    @PatchMapping("/item/{id}/toggle")
    public ResponseEntity<ToDoItemResponseDto> toggleCompleted(@PathVariable int id) {
        int userId = currentUser();
        ToDoItemResponseDto updatedItem = toDoListService.toggleCompleted(userId, id);
        return ResponseEntity.ok(updatedItem);
    }

}
