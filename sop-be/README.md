# sop-be

## Getting Started

```bash
# option:
psql -h 10.0.0.254 -p 31854 -U postgres -d postgres
```

## API

### Todo

| 方法            | 示例            |                   成功                    |                   失败                   |
|:--------------|:--------------|:---------------------------------------:|:--------------------------------------:|
| **POST**      | `/todos`      | ✔**201 Created** + `Location` + `{...}` |          ✔**400 Bad Request**          |
| **GET**       | `/todos`      |     ✔️**200 OK** + `[]` / `[{...}]`     |                  ✔不适用                  |
| **GET By ID** | `/todos/{id}` |          ✔**200 OK** + `{...}`          |           ✔**404 Not Found**           |
| **PATCH**     | `/todos/{id}` |          ✔**200 OK** + `{...}`          | ✔**400 Bad Request**/**404 Not Found** |
| **DELETE**    | `/todos/{id}` |          ✔️**204 No Content**           |          ✔️**404 Not Found**           |

# bugs
1. java.util.UUID.fromString() 方法本身就
