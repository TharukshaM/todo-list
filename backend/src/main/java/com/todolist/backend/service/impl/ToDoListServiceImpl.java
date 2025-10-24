package com.todolist.backend.service.impl;

import com.todolist.backend.dto.todolist.ToDoItemRequestDto;
import com.todolist.backend.dto.todolist.ToDoItemResponseDto;
import com.todolist.backend.model.Todo;
import com.todolist.backend.model.User;
import com.todolist.backend.repository.ToDoRepository;
import com.todolist.backend.repository.UserRepository;
import com.todolist.backend.service.ToDoListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ToDoListServiceImpl implements ToDoListService {
    private final ToDoRepository toDoRepository;
    private final UserRepository userRepository;

    @Override
    public ToDoItemResponseDto addToDoItem(int userid, ToDoItemRequestDto toDoItemRequestDto) {
        try{
            User user = userRepository.findById(userid).get();
            Todo todo = Todo.builder()
                    .title(toDoItemRequestDto.getTitle())
                    .description(toDoItemRequestDto.getDescription())
                    .user(user)
                    .build();
            Todo savedTodo = toDoRepository.save(todo);
            return ToDoItemResponseDto.builder()
                    .id(savedTodo.getId())
                    .title(savedTodo.getTitle())
                    .description(savedTodo.getDescription())
                    .build();
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
