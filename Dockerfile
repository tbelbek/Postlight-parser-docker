# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
RUN npm init -y && \
    npm install @postlight/parser express @mozilla/readability jsdom node-fetch

# Copy the application code
COPY index.mjs .

# Expose the port the app runs on
EXPOSE 80

# Command to run the application
CMD ["node", "index.mjs"]