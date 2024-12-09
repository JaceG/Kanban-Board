import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
	username: string;
}

export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// TODO: verify the token exists and add the user data to the request object

	// Retrieve the authorization header from the request
	const authHeader = req.get('authorization');

	// If the authorization header is not present, respond with a 401 status and a message
	if (!authHeader) {
		res.status(401).json({ message: 'No token provided' });
		return;
	}

	// Extract the token from the authorization header (assuming the format is "Bearer <token>")
	const token = authHeader.split(' ')[1];
	let decodedToken: JwtPayload;

	try {
		// Verify the token using the secret key and decode it to get the payload
		decodedToken = jwt.verify(
			token,
			process.env.JWT_SECRET_KEY ?? ''
		) as JwtPayload;
	} catch (err) {
		// If token verification fails, respond with a 401 status and a message
		res.status(401).json({ message: 'Invalid token' });
		return;
	}

	// If the decoded token is not valid, respond with a 401 status and a message
	if (!decodedToken) {
		res.status(401).json({ message: 'Invalid token' });
		return;
	}

	// Add the username from the decoded token to the request body
	req.body.username = decodedToken.username;

	// Call the next middleware function in the stack
	next();
};
