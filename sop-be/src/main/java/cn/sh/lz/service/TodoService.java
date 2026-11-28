package cn.sh.lz.service;

import cn.sh.lz.dto.TodoCreate;
import cn.sh.lz.dto.TodoUpdate;
import cn.sh.lz.model.Todo;
import cn.sh.lz.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class TodoService {
    private final TodoRepository todoRepository;

    @Transactional
    public Todo create(TodoCreate request) {
        Todo todo = Todo.builder().content(request.getContent()).build();
        return todoRepository.save(todo);
    }

    public List<Todo> read() {
        return todoRepository.findAll();
    }

    public Optional<Todo> readById(UUID id) {
        return todoRepository.findById(id);
    }

    @Transactional
    public Optional<Todo> update(UUID id, TodoUpdate request) {
        return readById(id).map(todo -> {
            if (request.getStatus() != null) {
                todo.setStatus(request.getStatus());
            }
            return todoRepository.save(todo);
        });
    }

    @Transactional
    public boolean delete(UUID id) {
        if (!todoRepository.existsById(id)) {
            return false;
        }
        todoRepository.deleteById(id);
        return true;
    }
}
