import psycopg2
import os
import time
from urllib.parse import urlparse

def get_db_connection():
    conn = None
    while conn is None:
        try:
            # Ambil DATABASE_URL dari environment variable
            database_url = os.environ.get('DATABASE_URL')
            if not database_url:
                raise ValueError("DATABASE_URL is not set in the environment variables")
            
            # Parse the URL
            result = urlparse(database_url)
            
            # Connect using the parsed information
            conn = psycopg2.connect(
                host=result.hostname,
                port=result.port,
                user=result.username,
                password=result.password,
                database=result.path[1:]  # Remove leading slash from the path
            )
        except psycopg2.OperationalError as e:
            print(f"Database connection failed, retrying in 5 seconds... Error: {e}")
            time.sleep(5)
        except ValueError as e:
            print(f"Error: {e}")
            break  # Exit if DATABASE_URL is not set
    return conn
