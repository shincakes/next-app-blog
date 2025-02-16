# Use official Python image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# ✅ Expose Flask port
EXPOSE 5000

# ✅ Run Gunicorn with the correct app path
CMD ["sh", "-c", "flask db upgrade && gunicorn -b 0.0.0.0:5000 'app:create_app()'"]

