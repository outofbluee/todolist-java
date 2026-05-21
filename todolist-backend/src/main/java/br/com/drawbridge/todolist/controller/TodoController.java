package br.com.drawbridge.todolist.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.drawbridge.todolist.model.entity.Todo;
import br.com.drawbridge.todolist.model.service.TodoService;

@RestController
@CrossOrigin(origins = {
	"http://localhost:3000",
	"http://127.0.0.1:3000",
	"http://127.0.0.1:5500"
})
@RequestMapping("/todos")
public class TodoController {

	private TodoService todoService;

	// Constructor-based Dependency Injection
	public TodoController(TodoService todoService) {
		this.todoService = todoService;
	}

	@PostMapping
	List<Todo> create(@RequestBody Todo todo) {
		return todoService.create(todo);
	}

	@GetMapping
	List<Todo> list() {
		return todoService.list();
	}

	@PutMapping
	List<Todo> update(@RequestBody Todo todo) {
		return todoService.update(todo);
	}

	@DeleteMapping("/{id}")
	List<Todo> delete(@PathVariable("id") Long id) {
		return todoService.delete(id);
	}

}
