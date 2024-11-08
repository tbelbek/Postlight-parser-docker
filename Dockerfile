# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Create package.json and install dependencies
RUN npm init -y && \
    npm install @postlight/parser express

# Copy the application code
COPY index.js .

# Expose the port the app runs on
EXPOSE 80

# Command to run the application
CMD ["node", "index.js"]