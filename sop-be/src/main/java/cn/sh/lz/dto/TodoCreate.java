package cn.sh.lz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Schema(description = "新增待办事项", name = "TodoCreate")
public class TodoCreate {
    @NotBlank(message = "待办内容（至少一个非空字符）")
    @Schema(description = "待办内容（至少一个非空字符,不超过256个字符）", example = "Study", maxLength = 256, requiredMode = Schema.RequiredMode.REQUIRED)
    @Size(max = 256, message = "待办内容(不超过256个字符)")
    private String content;
}
