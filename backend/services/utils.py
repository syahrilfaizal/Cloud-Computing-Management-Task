import psycopg2
import os
import time

def get_db_connection():
    conn = None
    while conn is None:
        try:
            conn = psycopg2.connect(
                host=os.environ.get("DB_HOST", "localhost"),
                database=os.environ.get("DB_NAME", "task_db"),
                user=os.environ.get("DB_USER", "username"),
                password=os.environ.get("DB_PASSWORD", "password")
            )
        except psycopg2.OperationalError as e:
            print("Database connection failed, retrying in 5 seconds...")
            time.sleep(5)  # Retry after 5 seconds if connection fails
    return conn
