import express from 'express';
import cors from 'cors';
import routes from './routes/combinedRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001   // import value from .env file

// Middleware
// enables our endpoint to interpret JSON data send with CRUD requests
app.use(express.json());
app.use(cors());

// API routes
app.use('/api', routes);

// set up server to listen for CRUD requests :3
app.listen(PORT, () => {
    console.log(`backend server running on port: ${PORT}`);
});
