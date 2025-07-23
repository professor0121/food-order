# Use the official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose port (adjust if your app uses a different port)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
