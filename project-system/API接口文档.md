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

### 3. 完善个人信息

**接口**: `PUT /api/users/{id}/profile`

**路径参数**:
- `id`: 用户ID

**请求参数**:

必填字段:
- `realName`: 姓名
- `studentNo`: 学号
- `gender`: 性别(0-女,1-男)
- `schoolName`: 学校名称
- `collegeName`: 学院名称
- `className`: 班级名称

可选字段:
- `phone`: 手机号
- `email`: 邮箱
- `avatarUrl`: 用户头像URL
- `isManager`: 是否为管理者(true/false)

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
  "isManager": false
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

### 2. 新增学校

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

### 3. 查询学校列表

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

### 4. 更新学校

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

### 5. 删除学校

**接口**: `DELETE /api/campus/schools/{id}`

**路径参数**:
- `id`: 学校ID

---

### 6. 新增学院

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

### 7. 查询学院列表

**接口**: `GET /api/campus/schools/{schoolId}/colleges`

**路径参数**:
- `schoolId`: 学校ID

---

### 8. 更新学院

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

### 9. 删除学院

**接口**: `DELETE /api/campus/schools/{schoolId}/colleges/{id}`

**路径参数**:
- `schoolId`: 学校ID
- `id`: 学院ID

---

### 10. 新增班级

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

### 11. 查询班级列表

**接口**: `GET /api/campus/colleges/{collegeId}/classes`

**路径参数**:
- `collegeId`: 学院ID

---

### 12. 更新班级

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

### 13. 删除班级

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

