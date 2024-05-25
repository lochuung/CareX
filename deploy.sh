#!/bin/bash
# Usage: ./deploy.sh

# Load the environment variables from the .env file
if [ -f .env ]; then
    export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Check if the environment variables are set
if [ -z "$SQL_USER" ] || [ -z "$SQL_PASSWORD" ] || [ -z "$API_URL" ] || [ -z "$MAIL_USERNAME" ] || [ -z "$MAIL_PASSWORD" ] || [ -z "$ADMIN_EMAIL" ] || [ -z "$ADMIN_PASSWORD" ] || [ -z "$JWT_SECRET_KEY" ]; then
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

# Deploy the Docker Compose file
docker-compose -f docker-compose-prd.yml up --build -d