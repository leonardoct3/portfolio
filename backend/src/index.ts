import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import apiRoutes from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(cors({
	origin: process.env.FRONTEND_URL || 'http://localhost:5173',
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (_req, res) => {
	res.json({
		message: 'Portfolio API is running!',
		version: '1.0.0',
		timestamp: new Date().toISOString()
	});
});

// API Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
	console.error(err.stack);
	res.status(500).json({
		message: 'Something went wrong!',
		error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
	});
});

// 404 handler
app.use('*', (_req, res) => {
	res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`);
	console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
});
