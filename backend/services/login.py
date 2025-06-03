import psycopg2
import os
from flask import Blueprint, request, jsonify
from .utils import get_db_connection

login_bp = Blueprint('login', __name__)

# Endpoint to log in
@login_bp.route('/', methods=['POST'])
def login_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Connect to the database
    conn = get_db_connection()
    cur = conn.cursor()

    # Query to check if the username and password match
    cur.execute("SELECT id, username, password FROM users WHERE username = %s;", (username,))
    user = cur.fetchone()

    # Close the connection
    cur.close()
    conn.close()

    if user and user[2] == password:  # Password verification
        return jsonify({"message": "Login successful", "id": user[0], "username": user[1]}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
