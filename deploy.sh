#!/bin/bash
# Usage: ./deploy.sh

# Load the environment variables from the .env file
if [ -f .env ]; then
    export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Check if the environment variables are set
if [ -z "$MYSQL_USER" ] || [ -z "$MYSQL_USER" ] || [ -z "$API_URL" ] || [ -z "$MAIL_USERNAME" ] || [ -z "$MAIL_PASSWORD" ] || [ -z "$ADMIN_EMAIL" ] || [ -z "$ADMIN_PASSWORD" ] || [ -z "$JWT_SECRET_KEY" ]; then
    echo "Please set the environment variables in the .env file"
    exit 1
fi

# Create volumes if they do not exist
if [ "$(docker volume ls -q -f name=carex-mysql)" != "carex-mysql" ]; then
    docker volume create carex-mysql
fi
if [ "$(docker volume ls -q -f name=maven-repo)" != "maven-repo" ]; then
    docker volume create maven-repo
fi

# Validate the Docker Compose file
docker-compose -f docker-compose-prd.yml config
if [ $? -ne 0 ]; then
    echo "Invalid Docker Compose file"
    exit 1
fi

# Deploy the Docker Compose file with the environment variables
docker-compose -f docker-compose-prd.yml up -d --build

# # Install mvn if not installed
# if ! command -v mvn &> /dev/null; then
#     sudo apt update
#     sudo apt install maven -y
# fi

# # go to the project directory
# cd server

# # Build the JAR file
# mvn clean package -DskipTests

# # Start the jar file with the environment variables
# java -jar target/carex-0.0.1-SNAPSHOT.jar 