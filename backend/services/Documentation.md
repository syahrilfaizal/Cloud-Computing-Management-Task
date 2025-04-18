# API Documentation

## 1. **Users API**

### 1.1. `POST /api/users/`
- **Fungsi**: Membuat pengguna baru.
- **Metode**: `POST`
- **Deskripsi**: Menerima data pengguna baru, seperti `username` dan `password`, kemudian menyimpannya dalam database. Password disimpan dalam bentuk teks biasa (disarankan untuk melakukan hashing pada password di aplikasi nyata).
- **Request Body**:
    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "username": "testuser",
      "password": "testpassword"
    }
    ```
- **Status Code**: `201 Created`

---

## 2. **Tasks API**

### 2.1. `GET /api/tasks/`
- **Fungsi**: Mengambil semua task dari database.
- **Metode**: `GET`
- **Deskripsi**: Menampilkan semua task yang ada, termasuk nama, deskripsi, tanggal jatuh tempo, prioritas, status, dan ID assignee.
- **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Test Task",
        "description": "This is a test task",
        "due_date": "2025-12-31",
        "priority": "High",
        "status": "Pending",
        "assignee_id": 1
      }
    ]
    ```
- **Status Code**: `200 OK`

### 2.2. `POST /api/tasks/`
- **Fungsi**: Membuat task baru.
- **Metode**: `POST`
- **Deskripsi**: Menerima data task baru seperti nama, deskripsi, tanggal jatuh tempo, prioritas, dan assignee_id, kemudian menyimpannya dalam database dengan status "Pending".
- **Request Body**:
    ```json
    {
      "name": "Test Task",
      "description": "This is a test task",
      "due_date": "2025-12-31",
      "priority": "High",
      "assignee_id": 1
    }
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "name": "Test Task",
      "description": "This is a test task",
      "due_date": "2025-12-31",
      "priority": "High",
      "status": "Pending",
      "assignee_id": 1
    }
    ```
- **Status Code**: `201 Created`

### 2.3. `PUT /api/tasks/<int:task_id>`
- **Fungsi**: Memperbarui status task.
- **Metode**: `PUT`
- **Deskripsi**: Memperbarui status task berdasarkan `task_id` yang diberikan, seperti mengubah status menjadi "Completed" atau "In Progress".
- **Request Body**:
    ```json
    {
      "status": "Completed"
    }
    ```
- **Response**:
    ```json
    {
      "msg": "Task status updated",
      "id": 1
    }
    ```
- **Status Code**: `200 OK`

---

## Ringkasan Endpoint

| Endpoint | Metode | Deskripsi |
|----------|--------|-----------|
| `/api/users/` | `POST` | Membuat pengguna baru |
| `/api/tasks/` | `GET` | Mengambil semua task |
| `/api/tasks/` | `POST` | Membuat task baru |
| `/api/tasks/<task_id>` | `PUT` | Memperbarui status task |

---
