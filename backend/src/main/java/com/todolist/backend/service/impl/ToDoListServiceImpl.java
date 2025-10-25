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

import java.util.List;

@Service
@RequiredArgsConstructor
public class ToDoListServiceImpl implements ToDoListService {
    private final ToDoRepository toDoRepository;
    private final UserRepository userRepository;

    @Override
    public ToDoItemResponseDto addToDoItem(int userid, ToDoItemRequestDto toDoItemRequestDto) {
        try {
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
                    .createdAt(savedTodo.getCreatedAt())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<ToDoItemResponseDto> getLatestToDoItems(int userId) {
        try {
            List<Todo> todos = toDoRepository.findTop5ByUserIdOrderByCreatedAtDesc(userId);
            return todos.stream()
                    .map(todo -> ToDoItemResponseDto.builder()
                            .id(todo.getId())
                            .title(todo.getTitle())
                            .description(todo.getDescription())
                            .completed(todo.isCompleted())
                            .createdAt(todo.getCreatedAt())
                            .build())
                    .toList();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public ToDoItemResponseDto updateToDoItem(int userId,int todoId, ToDoItemRequestDto requestDto) {
        try{
            Todo todo = toDoRepository.findById(todoId)
                    .orElseThrow(() -> new RuntimeException("Todo item not found"));

            if (todo.getUser().getId() != userId) {
                throw new RuntimeException("Unauthorized to update this todo");
            }
            if (requestDto.getTitle() != null && !requestDto.getTitle().isEmpty()) {
                todo.setTitle(requestDto.getTitle());
            }

            if (requestDto.getDescription() != null && !requestDto.getDescription().isEmpty()) {
                todo.setDescription(requestDto.getDescription());
            }
            toDoRepository.save(todo);

            return ToDoItemResponseDto.builder()
                    .id(todo.getId())
                    .title(todo.getTitle())
                    .description(todo.getDescription())
                    .createdAt(todo.getCreatedAt())
                    .build();
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public String deleteToDoItem(int userId, int todoId) {
        try{
            Todo todo = toDoRepository.findById(todoId)
                    .orElseThrow(() -> new RuntimeException("Todo item not found"));

            if (todo.getUser().getId() != userId) {
                throw new RuntimeException("Unauthorized to delete this todo");
            }

            toDoRepository.delete(todo);
            return "Todo item deleted successfully";
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
