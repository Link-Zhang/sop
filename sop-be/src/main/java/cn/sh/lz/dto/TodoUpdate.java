package cn.sh.lz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "部分更新待办事项", name = "TodoUpdate")
public class TodoUpdate {
    @Schema(description = "待办状态", example = "false")
    private Boolean status;
}
