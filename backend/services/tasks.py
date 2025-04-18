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
    cur.execute("SELECT id, name, description, due_date, priority, status, assignee_id FROM tasks;")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    tasks = [{"id": row[0], "name": row[1], "description": row[2], "due_date": row[3], "priority": row[4], "status": row[5], "assignee_id": row[6]} for row in rows]
    return jsonify(tasks)

# Endpoint to create a new task
@task_bp.route('/', methods=['POST'])
def create_task():
    data = request.json
    name = data['name']
    description = data['description']
    due_date = data['due_date']
    priority = data['priority']
    assignee_id = data['assignee_id']

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO tasks (name, description, due_date, priority, status, assignee_id) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id;",
                (name, description, due_date, priority, 'Pending', assignee_id))
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"id": new_id, "name": name, "description": description, "due_date": due_date, "priority": priority, "status": 'Pending', "assignee_id": assignee_id}), 201

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
