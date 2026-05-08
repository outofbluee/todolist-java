package br.com.drawbridge.todolist.model.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.drawbridge.todolist.model.entity.Todo;
import br.com.drawbridge.todolist.model.repository.TodoRepository;

@Service
public class TodoService {

	private TodoRepository todoRepository;

	// Constructor-based Dependency Injection
	public TodoService(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	public List<Todo> create(Todo todo) {
		todoRepository.save(todo);
		return list();
	}
	
	public List<Todo> list() {
		Sort sort = Sort.by("done").ascending()
				.and(Sort.by("priority").ascending())
				.and(Sort.by("name").ascending());
		return todoRepository.findAll(sort);
	}
	
	public List<Todo> update(Todo todo) {
		todoRepository.save(todo);
		return list();
	}
	
	public List<Todo> delete(Long id) {
		todoRepository.deleteById(id);
		return list();
	}

}
