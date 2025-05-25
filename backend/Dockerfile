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

# Add wait-for-it.sh to the image and make it executable
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Set the FLASK_APP environment variable for Flask to recognize app.py
ENV FLASK_APP=/services/app.py

# Wait for PostgreSQL to be ready, then start the Flask app
CMD ["sh", "-c", "cd services && gunicorn app:app --bind 0.0.0.0:$PORT"]
