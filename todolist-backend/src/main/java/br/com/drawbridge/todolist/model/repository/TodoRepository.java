package br.com.drawbridge.todolist.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.drawbridge.todolist.model.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
