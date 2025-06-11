# Use Node.js version compatible with Next.js
FROM node:18.18.2

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Build the Next.js app
RUN npm run build

# Set environment variable
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
