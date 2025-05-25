import os
import psycopg2
from urllib.parse import urlparse

def run_migration():
    DATABASE_URL = os.environ.get('DATABASE_URL')
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    url = urlparse(DATABASE_URL)
    conn = psycopg2.connect(
        host=url.hostname,
        database=url.path[1:],
        user=url.username,
        password=url.password,
        port=url.port
    )
    
    cur = conn.cursor()
    
    # Read and execute schema.sql
    with open('db/schema.sql', 'r') as f:
        schema = f.read()
        cur.execute(schema)
    
    conn.commit()
    cur.close()
    conn.close()
    print("Database migration completed!")

if __name__ == '__main__':
    run_migration()