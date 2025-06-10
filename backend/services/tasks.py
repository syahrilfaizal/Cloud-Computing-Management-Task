import psycopg2
import os
from flask import Blueprint, request, jsonify
from .utils import get_db_connection

task_bp = Blueprint('tasks', __name__)

# Endpoint to get all tasks
@task_bp.route('/', methods=['GET'])
def get_tasks():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT id, task_name, description, created_at, due_date, priority, status, assignee_name FROM tasks;")
        rows = cur.fetchall()
        if not rows:
            print("No tasks found.")
            return jsonify({"error": "No tasks found"}), 404
        
        tasks = [{"id": row[0], "task_name": row[1], "description": row[2], "created_at": row[3], "due_date": row[4], "priority": row[5], "status": row[6], "assignee_name": row[7]} for row in rows]
        return jsonify(tasks)
    except Exception as e:
        print(f"Error fetching tasks: {e}")
        return jsonify({"error": "Error fetching tasks"}), 500
    finally:
        cur.close()
        conn.close()

@task_bp.route('/<int:task_id>', methods=['GET'])
def get_task_by_id(task_id):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # Query untuk mengambil task berdasarkan ID
        cur.execute("SELECT id, task_name, description, created_at, due_date, priority, status, assignee_name FROM tasks WHERE id = %s;", (task_id,))
        row = cur.fetchone()  # Mengambil satu baris data berdasarkan ID
        
        if row is None:
            return jsonify({"error": "Task not found"}), 404  # Jika task tidak ditemukan
        
        # Jika task ditemukan, buat dictionary untuk response
        task = {
            "id": row[0],
            "task_name": row[1],
            "description": row[2],
            "created_at": row[3],
            "due_date": row[4],
            "priority": row[5],
            "status": row[6],
            "assignee_name": row[7]
        }
        return jsonify(task)  # Mengembalikan data task sebagai JSON
        
    except Exception as e:
        print(f"Error fetching task: {e}")
        return jsonify({"error": "Error fetching task"}), 500  # Menangani error pada server
    
    finally:
        cur.close()
        conn.close()  # Menutup koneksi dan cursor setelah query selesai


@task_bp.route('/', methods=['POST'])
def create_task():
    data = request.json
    print(f"Received data: {data}")  # Logging data yang diterima

    task_name = data['task_name']
    description = data['description']
    created_at = data['created_at']
    due_date = data['due_date']
    priority = data['priority']
    assignee_name = data['assignee_name']

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        print(f"Executing query: INSERT INTO tasks ...")  # Log query
        cur.execute("INSERT INTO tasks (task_name, description, created_at, due_date, priority, status, assignee_name) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id;",
                    (task_name, description, created_at, due_date, priority, 'Tertunda', assignee_name))
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        print(f"New task created with ID: {new_id}")  # Log success
        return jsonify({"id": new_id, "task_name": task_name, "description": description, "created_at": created_at, "due_date": due_date, "priority": priority, "status": 'Tertunda', "assignee_name": assignee_name}), 201
    except Exception as e:
        print(f"Error occurred: {e}")  # Log error
        return jsonify({"error": str(e)}), 500

# Endpoint to update task status
@task_bp.route('/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json

    # Mengambil data dari request untuk task yang akan diperbarui
    task_name = data.get('task_name')
    description = data.get('description')
    created_at = data.get('created_at')
    due_date = data.get('due_date')
    priority = data.get('priority')
    status = data.get('status')
    assignee_name = data.get('assignee_name')

    # Membuat koneksi ke database
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Update task dengan data yang baru
        query = """
        UPDATE tasks
        SET task_name = %s, description = %s, created_at = %s, due_date = %s,
            priority = %s, status = %s, assignee_name = %s
        WHERE id = %s
        RETURNING id;
        """
        cur.execute(query, (task_name, description, created_at, due_date, priority, status, assignee_name, task_id))

        # Mendapatkan ID task yang diperbarui
        updated_id = cur.fetchone()[0]
        conn.commit()

        return jsonify({"msg": "Task updated successfully", "id": updated_id}), 200
    except Exception as e:
        # Jika terjadi kesalahan, rollback dan kembalikan error
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        # Menutup cursor dan koneksi
        cur.close()
        conn.close()


@task_bp.route('/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # Query untuk menghapus task berdasarkan ID
        cur.execute("DELETE FROM tasks WHERE id = %s RETURNING id;", (task_id,))
        deleted_id = cur.fetchone()

        if deleted_id is None:
            return jsonify({"error": "Task not found"}), 404  # Jika task tidak ditemukan
        
        conn.commit()  # Commit perubahan
        return jsonify({"msg": f"Task with id {task_id} deleted successfully."}), 200
        
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500  # Menangani error pada server
    finally:
        cur.close()
        conn.close()  # Menutup koneksi dan cursor setelah query selesai
