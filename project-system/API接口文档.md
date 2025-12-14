# API 接口文档

## 基础信息

- **基础URL**: `http://localhost:8080/api`
- **响应格式**: JSON
- **统一响应结构**:
```json
{
  "code": 200,
  "message": "响应消息",
  "success": true,
  "data": {}
}
```

---

## 一、用户相关接口

### 1. 用户注册

**接口**: `POST /api/users/register`

**请求参数**:
```json
{
  "username": "账号",
  "password": "密码"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "注册成功",
  "success": true,
  "data": {
    "userId": 1
  }
}
```

---

### 2. 用户登录

**接口**: `POST /api/users/login`

**请求参数**:
```json
{
  "username": "账号",
  "password": "密码"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "登录成功",
  "success": true,
  "data": {
    "token": "登录令牌",
    "user": {}
  }
}
```

---

### 3. 获取用户列表

**接口**: `GET /api/users`

**请求参数** (查询参数):
- `currentPage`: 当前页码，默认值为 1
- `pageSize`: 每页显示条数，默认值为 10

**请求示例**:
```
GET /api/users?currentPage=1&pageSize=10
```

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "success": true,
  "data": {
    "page": {
      "total": 100,
      "currentPage": 1,
      "pageSize": 10,
      "totalPage": 10,
      "records": []
    }
  }
}
```

---

### 4. 模糊查询用户

**接口**: `GET /api/users/search`

**请求参数** (查询参数):
- `keyword`: 搜索关键词（可选），支持根据用户名、姓名或学号模糊查询
- `currentPage`: 当前页码，默认值为 1
- `pageSize`: 每页显示条数，默认值为 10

**请求示例**:
```
GET /api/users/search?keyword=张三&currentPage=1&pageSize=10
```

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "success": true,
  "data": {
    "page": {
      "total": 5,
      "currentPage": 1,
      "pageSize": 10,
      "totalPage": 1,
      "records": []
    }
  }
}
```

---

### 5. 删除用户

**接口**: `DELETE /api/users/{id}`

**路径参数**:
- `id`: 用户ID

**响应示例**:
```json
{
  "code": 200,
  "message": "删除成功",
  "success": true,
  "data": {}
}
```

---

### 6. 批量删除用户

**接口**: `DELETE /api/users`

**请求参数**:
```json
[1, 2, 3]
```

**响应示例**:
```json
{
  "code": 200,
  "message": "批量删除成功",
  "success": true,
  "data": {}
}
```

---

### 7. 完善个人信息

**接口**: `PUT /api/users/{id}/profile`

**路径参数**:
- `id`: 用户ID

**请求参数** (所有字段均为可选):
- `realName`: 姓名
- `studentNo`: 学号
- `gender`: 性别(0-女,1-男)
- `phone`: 手机号
- `email`: 邮箱
- `schoolName`: 学校名称
- `collegeName`: 学院名称
- `className`: 班级名称
- `avatarUrl`: 用户头像URL
- `isManager`: 是否为管理者(true/false)
- `isBoss`: 是否为超级管理者(true/false)
- `password`: 密码

**请求示例**:
```json
{
  "realName": "张三",
  "studentNo": "2021001",
  "gender": 1,
  "schoolName": "XX大学",
  "collegeName": "计算机学院",
  "className": "计算机1班",
  "phone": "13800138000",
  "email": "zhangsan@example.com",
  "avatarUrl": "https://example.com/avatar.jpg",
  "isManager": false,
  "isBoss": false,
  "password": "newPassword123"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "信息完善成功",
  "success": true,
  "data": {
    "user": {}
  }
}
```

---

## 二、校园信息相关接口

### 1. 获取树形结构

**接口**: `GET /api/campus/tree`

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "success": true,
  "data": {
    "items": []
  }
}
```

---

### 2. 创建校园信息

**接口**: `POST /api/campus`

**请求参数**:
- `schoolName`: 学校名称（必填）
- `collegeName`: 学院名称（可选）
- `className`: 班级名称（可选）
- `sort`: 排序（可选，默认0）
- `status`: 状态（可选，默认1）

**请求示例**:
```json
{
  "schoolName": "清华大学",
  "collegeName": "电子信息学院",
  "className": "计科04班"
}
```

**说明**:
- 如果三个字段都不存在，会创建三条数据：学校、学院、班级
- 如果学校已存在，其他不存在，则只创建学院和班级
- 如果学校和学院都已存在，班级不存在，则只创建班级
- 如果都已存在，则不创建任何数据

**响应示例**:
```json
{
  "code": 200,
  "message": "创建成功",
  "success": true,
  "data": {
    "createdIds": [1, 2, 3],
    "count": 3
  }
}
```

---

### 3. 新增学校

**接口**: `POST /api/campus/schools`

**请求参数**:
```json
{
  "schoolName": "学校名称",
  "sort": 0,
  "status": 1
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "新增学校成功",
  "success": true,
  "data": {
    "id": 1
  }
}
```

---

### 4. 查询学校列表

**接口**: `GET /api/campus/schools`

**响应示例**:
```json
{
  "code": 200,
  "success": true,
  "data": {
    "items": []
  }
}
```

---

### 5. 更新学校

**接口**: `PUT /api/campus/schools/{id}`

**路径参数**:
- `id`: 学校ID

**请求参数**:
```json
{
  "schoolName": "学校名称",
  "sort": 0,
  "status": 1
}
```

---

### 6. 删除学校

**接口**: `DELETE /api/campus/schools/{id}`

**路径参数**:
- `id`: 学校ID

---

### 7. 新增学院

**接口**: `POST /api/campus/schools/{schoolId}/colleges`

**路径参数**:
- `schoolId`: 学校ID

**请求参数**:
```json
{
  "collegeName": "学院名称",
  "sort": 0,
  "status": 1
}
```

---

### 8. 查询学院列表

**接口**: `GET /api/campus/schools/{schoolId}/colleges`

**路径参数**:
- `schoolId`: 学校ID

---

### 9. 更新学院

**接口**: `PUT /api/campus/schools/{schoolId}/colleges/{id}`

**路径参数**:
- `schoolId`: 学校ID
- `id`: 学院ID

**请求参数**:
```json
{
  "collegeName": "学院名称",
  "sort": 0,
  "status": 1
}
```

---

### 10. 删除学院

**接口**: `DELETE /api/campus/schools/{schoolId}/colleges/{id}`

**路径参数**:
- `schoolId`: 学校ID
- `id`: 学院ID

---

### 11. 新增班级

**接口**: `POST /api/campus/colleges/{collegeId}/classes`

**路径参数**:
- `collegeId`: 学院ID

**请求参数**:
```json
{
  "className": "班级名称",
  "sort": 0,
  "status": 1
}
```

---

### 12. 查询班级列表

**接口**: `GET /api/campus/colleges/{collegeId}/classes`

**路径参数**:
- `collegeId`: 学院ID

---

### 13. 更新班级

**接口**: `PUT /api/campus/colleges/{collegeId}/classes/{id}`

**路径参数**:
- `collegeId`: 学院ID
- `id`: 班级ID

**请求参数**:
```json
{
  "className": "班级名称",
  "sort": 0,
  "status": 1
}
```

---

### 14. 删除班级

**接口**: `DELETE /api/campus/colleges/{collegeId}/classes/{id}`

**路径参数**:
- `collegeId`: 学院ID
- `id`: 班级ID

---

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求失败（参数错误、业务错误等） |

