package cn.sh.lz.controller;

import cn.sh.lz.dto.TodoCreate;
import cn.sh.lz.dto.TodoUpdate;
import cn.sh.lz.model.Todo;
import cn.sh.lz.service.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequestMapping("/api/todos")
@RequiredArgsConstructor
@RestController
@Tag(name = "Todo", description = "待办事项API")
public class TodoController {
    private final TodoService todoService;

    private static <T> ResponseEntity<T> okOrNotFound(Optional<T> optional) {
        return optional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "创建待办事项")
    public ResponseEntity<Todo> create(@RequestBody @Valid TodoCreate request) {
        Todo todo = todoService.create(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(todo.getId()).toUri();
        return ResponseEntity.created(location).body(todo);
    }

    @GetMapping
    @Operation(summary = "查询全部待办事项")
    public List<Todo> read() {
        return todoService.read();
    }

    @GetMapping("/{id}")
    @Operation(summary = "按ID查询待办事项")
    public ResponseEntity<Todo> readById(@PathVariable UUID id) {
        return okOrNotFound(todoService.readById(id));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "部分更新待办事项")
    public ResponseEntity<Todo> update(@PathVariable UUID id, @RequestBody @Valid TodoUpdate request) {
        return okOrNotFound(todoService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除待办事项")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        return todoService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
