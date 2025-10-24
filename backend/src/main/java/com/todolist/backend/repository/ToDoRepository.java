package com.todolist.backend.repository;

import com.todolist.backend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ToDoRepository extends JpaRepository<Todo, Integer> {
    List<Todo> findByUserId(Integer userId);

    Optional<Todo> findById(Integer id);

}
