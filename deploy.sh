#!/bin/bash

# Usage: ./deploy.sh --sql_user mysql_user --sql_password mysql_password --api_url api_url

# Set the environment variables
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    --sql_user)
    SQL_USER="$2"
    shift
    shift
    ;;
    --sql_password)
    SQL_PASSWORD="$2"
    shift
    shift
    ;;
    --api_url)
    API_URL="$2"
    shift
    shift
    ;;
    *)
    shift
    ;;
esac
done

# Check if the environment variables are set
if [ -z "$SQL_USER" ] || [ -z "$SQL_PASSWORD" ] || [ -z "$API_URL" ]; then
    echo "Usage: ./deploy.sh --sql_user mysql_user --sql_password mysql_password --api_url api_url"
    exit 1
fi

# Set the environment variables in the .env file
echo "SQL_USER=$MYSQL_USER" > .env
echo "SQL_PASSWORD=$MYSQL_PASSWORD" >> .env
echo "API_URL=$API_URL" >> .env

# Create volumes if it does not exist
docker volume create carex-mysql
docker volume create maven-repo

# Deploy the Docker Compose file
docker-compose -f docker-compose-prd.yml up --build -d