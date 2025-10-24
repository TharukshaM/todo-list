package com.todolist.backend.controller;

import com.todolist.backend.dto.todolist.ToDoItemRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@RestController
@RequestMapping("/todolist")
@RequiredArgsConstructor
public class TodoListController {
//    private final ToDoListService toDoListService;

    private String curruntUser(){
        String email = getContext().getAuthentication().getName();
        System.out.println("Currunting user: " + email);
        return email;
    }

    @PostMapping("/additem")
    public ResponseEntity<String> addItem(@RequestBody ToDoItemRequestDto toDoItemRequestDto) {
            System.out.println("f Received ToDo Item: {toDoItemRequestDto}");
            var user = curruntUser();
            return ResponseEntity.ok("User found : " + user);
    }
}
