# ChatGPT Clone with Spring Boot and React

This project is a full-stack chat application that emulates the functionality of OpenAI's ChatGPT. It includes a backend API built with Spring Boot and a frontend user interface created with React. The application uses OpenAI's API for generating AI responses and stores chat messages on the server for persistence.

---

## Features
- **Frontend**: Interactive chat interface using React.
- **Backend**: Spring Boot REST API for handling chat requests and responses.
- **AI Integration**: Leverages OpenAI API for generating intelligent responses.
- **Modern UI**: Clean and intuitive design for a seamless user experience.

---

## Technology Stack
- **Frontend**: React with TypeScript.
- **Backend**: Spring Boot.
- **API**: OpenAI API integration.
- **CSS Framework**: Tailwind CSS.

---

## Setup Instructions

### Prerequisites
1. **Node.js** (>=14.x) and npm installed.
2. **Java** (>=11) and Maven installed.
3. OpenAI API Key.

---

### Backend Setup

1. Navigate to the backend directory.
2. Create the `application.properties` file in `src/main/resources/`:
   ```properties
   spring.application.name=gptserver
   openai.api.key=YOUR_API_KEY
   openai.api.url=https://api.openai.com/v1/chat/completions
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.datasource.url=jdbc:h2:mem:example
   spring.datasource.driver-class-name=org.h2.Driver
3. Replace the YOUR_API_KEY with your actual key.
4. Build and run the backend:
   ```properties
   mvn clean install
   mvn spring-boot:run

### Frontend Setup
1. Navigate to the frontend directory.
2. Install dependencies:
   ```properties
   npm install
4. Start the React development server:
   ```properties
   npm start
or
   ```properties
   npm run dev 
