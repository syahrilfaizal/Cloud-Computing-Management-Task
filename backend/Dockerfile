# backend/Dockerfile
FROM python:3.8-slim

# Install dependencies for psycopg2 and netcat (netcat-openbsd instead of netcat)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the requirements and install them
COPY services/requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the backend files (app.py, models.py, etc.)
COPY services /app

# Copy the db/schema.sql to the container
COPY db/schema.sql /app/db/schema.sql

# Add wait-for-it.sh to the image and make it executable
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Set the FLASK_APP environment variable for Flask to recognize app.py
ENV FLASK_APP=/app/app.py

# Run the migration script and start the Flask app
# Wait for PostgreSQL service to be ready
CMD /wait-for-it.sh ${DATABASE_URL} -- python migrate_db.py && flask run --host=0.0.0.0 --port=5000
