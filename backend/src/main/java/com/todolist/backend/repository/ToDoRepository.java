package com.todolist.backend.repository;

import com.todolist.backend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoRepository extends JpaRepository<Todo, Integer> {
    List<Todo> findByUserId(Integer userId);
}
