import os
import psycopg2
import time
from flask import Flask, jsonify, request

# Function to connect to the PostgreSQL database with retry mechanism
def get_db_connection():
    conn = None
    while conn is None:
        try:
            conn = psycopg2.connect(
                host=os.environ.get("DB_HOST", "localhost"),  # Ensure 'db' is used for Docker containers
                database=os.environ.get("DB_NAME", "task_db"),
                user=os.environ.get("DB_USER", "username"),
                password=os.environ.get("DB_PASSWORD", "password")
            )
        except psycopg2.OperationalError as e:
            print("Database connection failed, retrying in 5 seconds...")
            time.sleep(5)  # Retry after 5 seconds if connection fails
    return conn

# Initialize Flask
app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Hello from Flask!"})

# Endpoint to create a new user
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    username = data['username']
    password = data['password']  # In a real application, don't store plain passwords, hash them!

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id;",
                (username, password))
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"id": new_id, "username": username, "password": password}), 201

# Endpoint to get all tasks
@app.route('/api/tasks', methods=['GET'])
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
@app.route('/api/tasks', methods=['POST'])
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
@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
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

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
