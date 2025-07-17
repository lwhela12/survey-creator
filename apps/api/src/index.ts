
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Placeholder for user authentication
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // In a real application, you would implement proper authentication logic here
  console.log('User authenticated');
  next();
};

// POST /api/surveys - Create a new survey
app.post('/api/surveys', authenticate, (req, res) => {
  const { name } = req.body;
  console.log('Creating new survey:', name);
  // Mock response
  res.status(201).json({
    id: 'mock-survey-id',
    name,
    ownerId: 'mock-user-id',
    createdAt: new Date(),
    nodes: {},
    styleConfig: {},
  });
});

// PUT /api/surveys/:surveyId - Update a survey
app.put('/api/surveys/:surveyId', authenticate, (req, res) => {
  const { surveyId } = req.params;
  console.log(`Updating survey ${surveyId}:`, req.body);
  res.status(200).send('OK');
});

// GET /api/surveys - Get all surveys for the logged-in user
app.get('/api/surveys', authenticate, (req, res) => {
  console.log('Fetching all surveys for user');
  // Mock response
  res.status(200).json([
    {
      id: 'mock-survey-1',
      name: 'Donor Feedback 2025',
      ownerId: 'mock-user-id',
      createdAt: new Date(),
    },
    {
      id: 'mock-survey-2',
      name: 'Volunteer Satisfaction Survey',
      ownerId: 'mock-user-id',
      createdAt: new Date(),
    },
  ]);
});

// GET /api/surveys/:surveyId - Get a single survey's full configuration
app.get('/api/surveys/:surveyId', authenticate, (req, res) => {
  const { surveyId } = req.params;
  console.log(`Fetching survey configuration for ${surveyId}`);
  // Mock response
  res.status(200).json({
    id: surveyId,
    name: 'Donor Feedback 2025',
    ownerId: 'mock-user-id',
    createdAt: new Date(),
    nodes: {
      "1": { "messageText": "Welcome!", "questionType": "statement", "nextId": "2" },
      "2": { "messageText": "What is your name?", "questionType": "text", "nextId": "3" },
    },
    styleConfig: {
      "botMessageBg": "#ECEFF1",
      "userMessageBg": "#007AFF",
    },
  });
});

// GET /api/surveys/:surveyId/public - Get public-facing config
app.get('/api/surveys/:surveyId/public', (req, res) => {
  const { surveyId } = req.params;
  console.log(`Fetching public survey config for ${surveyId}`);
  // Mock response
  res.status(200).json({
    nodes: {
      "1": { "messageText": "Welcome!", "questionType": "statement", "nextId": "2" },
      "2": { "messageText": "What is your name?", "questionType": "text", "nextId": "3" },
    },
    styleConfig: {
      "botMessageBg": "#ECEFF1",
      "userMessageBg": "#007AFF",
    },
  });
});

// POST /api/responses - Submit a new survey response
app.post('/api/responses', (req, res) => {
  const { surveyId, answers } = req.body;
  console.log(`Submitting response for survey ${surveyId}:`, answers);
  res.status(201).send('CREATED');
});

// GET /api/surveys/:surveyId/responses - Get all responses for a survey
app.get('/api/surveys/:surveyId/responses', authenticate, (req, res) => {
  const { surveyId } = req.params;
  console.log(`Fetching responses for survey ${surveyId}`);
  // Mock response
  res.status(200).json([
    {
      id: 'response-1',
      surveyId,
      completedAt: new Date(),
      answers: { "2": "Lucas" },
    },
    {
      id: 'response-2',
      surveyId,
      completedAt: new Date(),
      answers: { "2": "Maria" },
    },
  ]);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
