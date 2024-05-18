# preferred node version chosen here (LTS = 20.13.1)
FROM node:20.13-alpine

# Create the directory on the node image
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json ./

# Install dependencies in /app
RUN npm install

# Copy the rest of our Next.js folder into /app
COPY . .

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run dev, as we would via the command line
CMD npm run dev