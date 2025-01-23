# Use an official Python image as a parent image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any required dependencies (if applicable)
# RUN pip install -r requirements.txt

# Expose the port the app will run on
EXPOSE 8080

# Command to run your app
CMD ["python", "-m", "http.server", "8080"]