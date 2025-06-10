import psycopg2
import os
from flask import Blueprint, request, jsonify
from .utils import get_db_connection

user_bp = Blueprint('users', __name__)

# Endpoint to create a new user
@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.json
    username = data['username']
    password = data['password']  # In a real application, don't store plain passwords, hash them!

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id;", (username, password))
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "User created successfully", "id": new_id, "username": username, "password": password}), 201
