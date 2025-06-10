-- backend/db/schema.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,  -- for 'Nama Tugas'
    description TEXT,  -- for 'Deskripsi'
    created_at DATE,  -- for 'Tanggal Dibuat'
    due_date DATE,  -- for 'Tanggal Jatuh Tempo'
    assignee_name VARCHAR(255),  -- for 'Ditugaskan Kepada'
    status VARCHAR(50) DEFAULT 'Tertunda',  -- for 'Status'
    priority VARCHAR(50),  -- for 'Prioritas'
    assignee_id INTEGER REFERENCES users(id)  -- Assuming 'users' table exists with 'id' field
);