# backend/Dockerfile
FROM python:3.8-slim

# Install dependencies for psycopg2 and netcat (netcat-openbsd instead of netcat)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Salin semua file dari backend ke dalam container
COPY ../backend/ /app/

# Salin requirements.txt dan install dependencies
COPY backend/requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

# Copy wait-for-it.sh and make it executable
COPY backend/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Set the FLASK_APP environment variable for Flask to recognize app.py
ENV FLASK_APP=/app/app.py

# Run the migration script and start the Flask app
CMD /wait-for-it.sh caboose.proxy.rlwy.net:5432 --timeout=60 -- python /app/migrate_db.py && flask run --host=0.0.0.0 --port=5000