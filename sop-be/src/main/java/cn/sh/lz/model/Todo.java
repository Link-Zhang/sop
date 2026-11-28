package cn.sh.lz.model;

import com.github.f4b6a3.uuid.UuidCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.UUID;

@AllArgsConstructor
@Builder
@Data
@Entity
@NoArgsConstructor
@Schema(description = "待办事项", name = "Todo")
@Table(indexes = {@Index(columnList = "date DESC", name = "idx_todo_date")}, name = "todo")
public class Todo {
    @Id
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "待办主键（UUID v7）", example = "01a20ce8-1d51-7317-b0f7-a32b3cb193ed")
    private UUID id;

    @Column(length = 256, nullable = false)
    @NotBlank(message = "待办内容（至少一个非空字符）")
    @Schema(description = "待办内容（至少一个非空字符,不超过256个字符）", example = "Study", maxLength = 256, requiredMode = Schema.RequiredMode.REQUIRED)
    @Size(max = 256, message = "待办内容(不超过256个字符)")
    private String content;

    @Builder.Default
    @Column(nullable = false)
    @NotNull
    @Schema(defaultValue = "false", description = "待办状态", example = "false", requiredMode = Schema.RequiredMode.REQUIRED)
    private Boolean status = Boolean.FALSE;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "创建时间（UTC，ISO-8601）", example = "2026-11-26T10:08:05.042Z")
    private Instant date;

    @PrePersist
    void prePersist() {
        if (id == null) {
            id = UuidCreator.getTimeOrderedEpoch();
        }
    }
}
