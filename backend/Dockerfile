# Use official Python 3.9 image as the base image
FROM python:3.9-slim

# Install system dependencies for packages like psycopg2, pycryptodome, etc.
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libpq-dev \
    iputils-ping \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy the entire content of your project into the working directory in the container
COPY . .

# Install Python dependencies from requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Expose the port that the application will run on
EXPOSE 8000

# Command to run the FastAPI app with Uvicorn (development mode enabled with --reload)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
