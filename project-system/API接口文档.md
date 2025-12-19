## API 接口文档

### 基础信息

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
      "records": [
        {
          "id": 1,
          "name": "计算机协会",
          "memberCount": 35
        }
      ]
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

---

## 三、社团相关接口

### 1. 添加社团

**接口**: `POST /api/clubs`

**请求参数**:
- `iconUrl`: 社团图标URL（可选）
- `name`: 社团名称（必填）
- `tags`: 社团标签（可选，多个标签用逗号分隔）
- `description`: 社团简介（可选）

**请求示例**:
```json
{
  "iconUrl": "https://example.com/club-icon.jpg",
  "name": "计算机协会",
  "tags": "技术,编程,计算机",
  "description": "致力于计算机技术交流与学习的社团"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "创建社团成功",
  "success": true,
  "data": {
    "club": {},
    "clubId": 1
  }
}
```

---

### 2. 模糊查询社团列表

**接口**: `POST /api/clubs/search`

**请求参数**:
- `keyword`: 搜索关键词（可选），支持根据社团名称、标签或简介模糊查询
- `currentPage`: 当前页码，默认值为 1
- `pageSize`: 每页显示条数，默认值为 10

**请求示例**:
```json
{
  "keyword": "计算机",
  "currentPage": 1,
  "pageSize": 10
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "success": true,
  "data": {
    "page": {
      "total": 10,
      "currentPage": 1,
      "pageSize": 10,
      "totalPage": 1,
      "records": [
        {
          "id": 1,
          "name": "计算机协会",
          "tags": "技术,编程,计算机",
          "description": "...",
          "memberCount": 35
        }
      ]
    }
  }
}
```

---

### 3. 加入社团

**接口**: `POST /api/clubs/join`

**请求参数**:
- `clubId`: 社团ID（必填）
- `userId`: 用户ID（必填）

**请求示例**:
```json
{
  "clubId": 1,
  "userId": 1
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "加入社团成功",
  "success": true,
  "data": {
    "clubMember": {}
  }
}
```

**错误响应**:
- 如果已经加入该社团，返回："您已经加入该社团"
- 如果社团不存在，返回："社团不存在"
- 如果社团已禁用，返回："该社团已禁用"

---

### 4. 模糊查询已加入的社团列表

**接口**: `POST /api/clubs/joined`

**请求参数**:
- `userId`: 用户ID（必填）
- `keyword`: 搜索关键词（可选），支持根据社团名称、标签或简介模糊查询
- `currentPage`: 当前页码，默认值为 1
- `pageSize`: 每页显示条数，默认值为 10

**请求示例**:
```json
{
  "userId": 1,
  "keyword": "计算机",
  "type": "join",        // join：我加入的；management：我管理的
  "currentPage": 1,
  "pageSize": 10
}
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
      "records": [
        {
          "id": 1,
          "name": "计算机协会",
          "memberCount": 35
        }
      ]
    }
  }
}
```

---

### 5. 获取用户管理的社团下拉列表

**接口**: `GET /api/clubs/managed`

**请求参数** (查询参数):
- `userId`: 用户ID（必填）

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "success": true,
  "data": {
    "items": [
      {
        "text": "社团名称",
        "value": 1
      }
    ]
  }
}
```

---

### 6. 获取社团成员列表

**接口**: `GET /api/clubs/{clubId}/members`

**路径参数**:
- `clubId`: 社团ID（必填）

**响应示例**（已调整为返回完整的用户信息）:
```json
{
  "code": 200,
  "message": "查询成功",
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "clubId": 1,
        "userId": 1,
        "isManager": true,
        "joinTime": "2025-01-01T10:00:00",
        "user": {
          "id": 1,
          "username": "zhangsan",
          "realName": "张三",
          "studentNo": "20250001",
          "gender": 1,
          "phone": "13800000000",
          "email": "zhangsan@example.com",
          "schoolName": "XX大学",
          "collegeName": "计算机学院",
          "className": "计科1班",
          "avatarUrl": "https://example.com/avatar.jpg",
          "isCompleted": true,
          "isManager": false,
          "isBoss": false,
          "createTime": "2025-01-01T09:00:00",
          "updateTime": "2025-01-02T09:00:00"
        }
      }
    ]
  }
}
```

---

### 7. 设置社团人员为管理员 / 取消管理员

**接口**: `POST /api/clubs/{clubId}/members/{userId}/manager`

**路径参数**:
- `clubId`: 社团ID（必填）
- `userId`: 用户ID（必填）

**请求参数** (查询参数):
- `isManager`: 是否设置为管理员（true：设置为管理员，false：取消管理员），默认 true

**请求示例**:
```
POST /api/clubs/1/members/1/manager?isManager=true
```

**成功响应示例**:
```json
{
  "code": 200,
  "message": "设置管理员成功",
  "success": true,
  "data": {}
}
```

**失败场景说明**:
- 当该用户未加入该社团时，返回：`"该用户未加入该社团"`
- 当将某成员设置为管理员且其已是该社团管理员时，返回：`"该成员已是该社团的管理员"`

**说明**:
- 当 `isManager=true` 时：将该用户在该社团中的 `isManager` 标记为 true
- 当 `isManager=false` 时：将该用户在该社团中的 `isManager` 标记为 false
- 如果该用户未加入该社团，将返回错误提示

---

## 四、活动相关接口

### 1. 创建活动

**接口**: `POST /api/activities`

**说明**: 活动状态默认设置为 **审核中**，活动等级由主办方社团的 `levelTag` 决定。

**请求参数**:
```json
{
  "name": "活动名称",
  "description": "活动介绍",
  "activityType": "活动类型",
  "location": "活动地点",
  "clubId": 1,
  "notice": "参与须知",
  "registrationStartTime": "2025-12-20T09:00:00",
  "registrationEndTime": "2025-12-25T18:00:00",
  "startTime": "2025-12-26T09:00:00",
  "endTime": "2025-12-26T18:00:00",
  "maxParticipants": 100,
  "needAudit": true,
  "imageUrls": [
    "http://123.com/a.jpg",
    "http://123.com/b.jpg"
  ]
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "创建活动成功",
  "success": true,
  "data": {
    "activity": {}
  }
}
```

---

### 2. 获取待审核活动列表（由 isBoss = true 的用户审核）

**接口**: `GET /api/activities/pending`

**请求参数** (查询参数):
- `bossUserId`: 审核人用户ID（必填，需要 `isBoss = true`）
- `currentPage`: 当前页码（可选，默认 1）
- `pageSize`: 每页条数（可选，默认 10）

**请求示例**:
```
GET /api/activities/pending?bossUserId=1&currentPage=1&pageSize=10
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

### 3. 审核活动

**接口**: `POST /api/activities/review`

**说明**: 由 `user.isBoss = true` 的用户对活动进行通过/拒绝审核。

**请求参数**:
```json
{
  "activityId": 1,
  "auditUserId": 1,
  "pass": true,
  "remark": "审核通过"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "审核成功",
  "success": true,
  "data": {}
}
```

---

### 4. 获取待审核人员列表（由主办方管理者审核）

**接口**: `GET /api/activities/{activityId}/registrations/pending`

**路径参数**:
- `activityId`: 活动ID（必填）

**请求参数** (查询参数):
- `managerUserId`: 管理员用户ID（必填，需要是该活动主办社团的管理员）

**请求示例**:
```
GET /api/activities/1/registrations/pending?managerUserId=2
```

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "activityId": 1,
        "userId": 3,
        "status": "待审核",
        "registrationTime": "2025-12-20T10:00:00"
      }
    ]
  }
}
```

---

### 5. 审核报名人员

**接口**: `POST /api/activities/registrations/review`

**说明**: 由活动主办方社团的管理员对报名人员进行通过/拒绝审核。

**请求参数**:
```json
{
  "registrationId": 1,
  "activityId": 1,
  "managerUserId": 2,
  "pass": true,
  "remark": "通过审核"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "审核成功",
  "success": true,
  "data": {}
}
```

---

### 6. 模糊查询活动列表

**接口**: `POST /api/activities/search`

**说明**: 所有参数均为可选，如果都为空则返回所有活动列表。

**请求参数**:
```json
{
  "keyword": "关键字",
  "status": "审核中",
  "category": "活动分类",
  "level": "活动级别",
  "currentPage": 1,
  "pageSize": 10
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "success": true,
  "data": {
    "page": {
      "total": 10,
      "currentPage": 1,
      "pageSize": 10,
      "totalPage": 1,
      "records": []
    }
  }
}
```

---

### 7. 根据活动ID查看活动详情

**接口**: `GET /api/activities/{id}`

**路径参数**:
- `id`: 活动ID

**说明**: 返回活动实体信息，并额外返回解析好的图片URL数组。

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "success": true,
  "data": {
    "activity": {},
    "imageUrls": [
      "http://123.com/a.jpg",
      "http://123.com/b.jpg"
    ]
  }
}
```

---

### 8. 人员活动报名

**接口**: `POST /api/activities/{activityId}/register`

**路径参数**:
- `activityId`: 活动ID（必填）

**请求参数**:
```json
{
  "userId": 3
}
```

**说明**:
- 活动必须已通过审核才能报名；
- 报名时间必须在设置的报名时间范围内；
- 如果活动设置需要审核（`needAudit = true`），报名状态为 `"待审核"`，否则为 `"已通过"`。

**响应示例**:
```json
{
  "code": 200,
  "message": "报名成功",
  "success": true,
  "data": {
    "registration": {}
  }
}
```

---

### 9. 人员评价活动

**接口**: `POST /api/activities/comment`

**说明**: 当前仅支持评分（0-100），如需文字评价需在数据库中新增字段。

**请求参数**:
```json
{
  "activityId": 1,
  "userId": 3,
  "score": 95
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "评价成功",
  "success": true,
  "data": {}
}
```

---

### 10. 查看人员报名详情（是否通过审核）

**接口**: `GET /api/activities/{activityId}/registrations/status`

**路径参数**:
- `activityId`: 活动ID

**请求参数** (查询参数):
- `userId`: 用户ID

**请求示例**:
```
GET /api/activities/1/registrations/status?userId=3
```

**响应示例**:
```json
{
  "code": 200,
  "message": "查询成功",
  "success": true,
  "data": {
    "status": "已通过",
    "registration": {}
  }
}
```

---

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求失败（参数错误、业务错误等） |

