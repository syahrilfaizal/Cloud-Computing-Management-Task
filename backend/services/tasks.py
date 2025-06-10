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
        tasks = [{"id": row[0], "task_name": row[1], "description": row[2], "created_at": row[3], "due_date": row[4], "priority": row[5], "status": row[6], "assignee_name": row[7]} for row in rows]
        return jsonify(tasks)
    except Exception as e:
        print(f"Error fetching tasks: {e}")
        return jsonify({"error": "Error fetching tasks"}), 500
    finally:
        cur.close()
        conn.close()

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
def update_task_status(task_id):
    data = request.json
    status = data['status']

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE tasks SET status = %s WHERE id = %s RETURNING id;", (status, task_id))
    updated_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"msg": "Task status updated", "id": updated_id}), 200
