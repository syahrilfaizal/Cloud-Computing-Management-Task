import os
import psycopg2
from urllib.parse import urlparse

def run_migration():
    DATABASE_URL = os.environ.get('DATABASE_URL')
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable not set")
    
    # Parse the DATABASE_URL
    url = urlparse(DATABASE_URL)
    try:
        conn = psycopg2.connect(
            host=url.hostname,
            database=url.path[1:],  # Remove the leading '/'
            user=url.username,
            password=url.password,
            port=url.port
        )
        cur = conn.cursor()

        # Read and execute schema.sql from the updated path
        with open('/app/db/schema.sql', 'r') as f:  # Ensure this path matches the Docker container structure
            schema = f.read()
            cur.execute(schema)
        
        conn.commit()
        print("Database migration completed!")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if conn:
            cur.close()
            conn.close()

if __name__ == '__main__':
    run_migration()
