# **Full Design Document: Conversational Survey Builder**

Project: Conversational Survey Builder  
Version: 1.1  
Date: July 17, 2025  
Author: Gemini (Architect/PM)

### **1\. Project Overview & Vision**

#### **1.1. Vision Statement**

To create an intuitive, no-code platform that empowers users to transform spreadsheet-based scripts into engaging, human-like conversational chat surveys. The platform will manage the entire lifecycle from creation and visual editing to branding, deployment, and data analysis, making sophisticated conversational data collection accessible to everyone.

#### **1.2. Core Problem**

Standard web forms and surveys are often impersonal and suffer from low completion rates. While conversational interfaces are more engaging, building them requires technical expertise. This project bridges that gap.

#### **1.3. Key Goals**

* **Simplicity:** Allow a non-technical user to build a functional chat survey in under 15 minutes.  
* **Engagement:** Increase survey completion rates by providing a more interactive and personal experience.  
* **Flexibility:** Give users deep control over the visual styling and conversational flow of their surveys.  
* **Actionable Data:** Ensure response data is easy to collect, view, and export.

### **2\. User Personas & Stories**

#### **2.1. Persona: "Maria," the Non-Profit Program Manager**

* **Bio:** Manages donor relations for a mid-sized arts organization. Is tech-savvy but not a coder.  
* **Goal:** Wants to collect feedback from donors in a way that feels personal and reflects the organization's brand, without having to hire a developer.  
* **User Stories:**  
  * "As Maria, I want to upload my existing survey script from Excel so I don't have to re-type everything."  
  * "As Maria, I want to see a visual map of my survey questions so I can easily check the branching logic."  
  * "As Maria, I want to change the chat colors to match our organization's branding."  
  * "As Maria, I want to get a simple link that I can email to our donors."  
  * "As Maria, I need to export all donor responses to a CSV file to create a report for my director."

### **3\. Functional Requirements & Feature Breakdown**

This section details the features outlined in the technical specification.

#### **3.1. Phase 1: Build**

* **Spreadsheet Upload:**  
  * Supports .csv and .xlsx.  
  * The UI will provide a downloadable template file.  
  * **Parser Logic:** The system will validate the uploaded file for required columns: ID, Message\_Text, Question\_Type, Options, Next\_ID. It will provide clear error messages for malformed data.  
  * **Supported Question\_Types:**  
    * statement: Displays text and proceeds. No input required.  
    * text: Freeform text input.  
    * number: Numerical input.  
    * single\_choice: User must select **one** option from a list (rendered as buttons). Required for branching.  
    * multi\_choice: User can select **multiple** options from a list (rendered as checkboxes).  
* **Visual Tree Editor (React Flow):**  
  * Each row from the spreadsheet becomes a draggable "Node."  
  * The Next\_ID logic automatically generates "Edges" connecting the nodes.  
  * **Node Editor:** Clicking a node opens a sidebar panel to edit its properties (Message\_Text, etc.). Changes are auto-saved.  
  * Users can manually add new nodes and draw edges between them.

#### **3.2. Phase 2: Style**

* **Live Preview:** A chat window component will be present alongside the style controls, instantly reflecting changes.  
* **Customization Panel:**  
  * **Colors:** Use color pickers for Bot/User messages (background/text) and the main chat background.  
  * **Avatar:** An upload field for the bot's avatar image.  
  * **Favicon:** An upload field for the survey's favicon.  
  * **Conversational Pacing:** A slider or input field to set message delay in milliseconds (e.g., 500 to 3000).

#### **3.3. Phase 3: Share**

* **Publishing:** A "Publish" button saves the current state of the survey's content and style settings, making it "live."  
* **URL Generation:** Generates a unique, permanent link (e.g., yourdomain.com/s/aK8sXb2P).  
* **Embedding:** Provides a pre-formatted \<iframe\> snippet for embedding.

#### **3.4. Phase 4: Analyze**

* **Results Dashboard:**  
  * Displays key metrics: Views, Starts, Completions, Average time to complete.  
  * Shows a table of individual responses. Each row is a unique session, and columns correspond to question IDs.  
* **Export:** A "Download as CSV" button that exports the response data.

### **4\. Data Models & Firestore Schema**

All data will be stored in Firestore.

#### **users collection**

* Document ID: auth.uid  
* Fields:  
  * email: string  
  * createdAt: timestamp

#### **surveys collection**

* Document ID: auto-generated  
* Fields:  
  * name: string (e.g., "Donor Feedback 2025")  
  * ownerId: string (links to users collection)  
  * createdAt: timestamp  
  * publishedAt: timestamp (optional)  
  * **nodes**: map (An object where keys are node IDs)  
    "nodes": {  
      "1": { "messageText": "Welcome\!", "questionType": "statement", "nextId": "2" },  
      "2": { "messageText": "What is your name?", "questionType": "text", "nextId": "3" },  
      "3": { "messageText": "Which genres do you enjoy?", "questionType": "multi\_choice", "options": \["Sci-Fi", "Fantasy", "History"\], "nextId": "4" },  
      "4": { "messageText": "What is your favorite color?", "questionType": "single\_choice", "options": \["Red", "Blue"\], "nextLogic": { "Red": "5a", "Blue": "5b" } }  
    }

  * **styleConfig**: map  
    "styleConfig": {  
      "botMessageBg": "\#ECEFF1",  
      "userMessageBg": "\#007AFF",  
      "avatarUrl": "...",  
      "messageDelay": 1200  
    }

#### **responses collection**

* Document ID: auto-generated  
* Fields:  
  * surveyId: string (links to surveys collection)  
  * completedAt: timestamp  
  * **answers**: map  
    "answers": {  
      "2": "Lucas",  
      "3": \["Sci-Fi", "History"\],  
      "4": "Blue"  
    }

### **5\. API Endpoints (apps/api)**

All endpoints will be authenticated.

* **POST /api/surveys**: Create a new survey.  
  * **Body:** { name: string }  
  * **Response:** The full Survey object.  
* **PUT /api/surveys/:surveyId**: Update a survey (nodes, style, etc.).  
  * **Body:** The partial Survey object to be updated.  
  * **Response:** 200 OK.  
* **GET /api/surveys**: Get all surveys for the logged-in user.  
  * **Response:** Array\<Survey\>.  
* **GET /api/surveys/:surveyId**: Get a single survey's full configuration.  
  * **Response:** Survey object.  
* **GET /api/surveys/:surveyId/public**: **(Unauthenticated)** Get the public-facing config needed to run the chat.  
  * **Response:** { nodes: ..., styleConfig: ... }.  
* **POST /api/responses**: Submit a new survey response.  
  * **Body:** { surveyId: string, answers: map }.  
  * **Response:** 201 CREATED.  
* **GET /api/surveys/:surveyId/responses**: Get all responses for a survey.  
  * **Response:** Array\<Response\>.

### **6\. Architectural Blueprint**

* **Monorepo Manager:** **Turborepo**  
* **Structure:**  
  * apps/web: **Next.js** (React) frontend.  
  * apps/api: **Express.js** (Node.js) backend.  
  * packages/core: Shared TypeScript types and logic.  
  * packages/ui: Shared React components.  
  * packages/db: Firestore client and schemas.  
* **Deployment:**  
  * web \-\> Vercel  
  * api \-\> Google Cloud Run / Heroku

### **7\. V1 Milestone Plan**

The initial release will focus on delivering the core end-to-end experience.

* **Milestone 1: Core Backend & Data Models (1 week)**  
  * Set up monorepo with Turborepo.  
  * Define all data schemas in packages/db.  
  * Implement all API endpoints in apps/api with mock data.  
  * Set up user authentication.  
* **Milestone 2: The Builder Experience (2 weeks)**  
  * Implement spreadsheet upload and parsing in apps/web.  
  * Build the visual tree editor using React Flow.  
  * Connect the editor to the backend API to load and save surveys.  
* **Milestone 3: The Live Chat & Styling (1 week)**  
  * Build the live chat client component.  
  * Build the style editor panel.  
  * Implement the public-facing survey page.  
* **Milestone 4: Data & Deployment (1 week)**  
  * Build the "Analyze" dashboard to view responses.  
  * Implement CSV export functionality.  
  * Set up production deployment pipelines for web and api.