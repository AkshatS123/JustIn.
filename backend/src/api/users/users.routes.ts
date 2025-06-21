import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../../config/prisma.js';
import { protect } from '../../middleware/auth.js';
import { AppError } from '../../middleware/errorHandler.js';

const router = Router();

// Create user profile (called by Supabase webhook)
router.post('/', [
  body('id').isString().notEmpty().withMessage('User ID is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('username').optional().isString().withMessage('Username must be a string'),
  body('avatar').optional().isString().withMessage('Avatar must be a string'),
  body('bio').optional().isString().withMessage('Bio must be a string'),
  body('location').optional().isString().withMessage('Location must be a string')
], async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'error',
        errors: errors.array() 
      });
    }

    const { id, email, username, avatar, bio, location } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (existingUser) {
      return res.status(200).json({
        status: 'success',
        message: 'User already exists',
        user: existingUser
      });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        id,
        email,
        username: username || email.split('@')[0], // Use email prefix as default username
        avatar,
        bio,
        location
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        location: true,
        createdAt: true
      }
    });

    res.status(201).json({
      status: 'success',
      message: 'User profile created successfully',
      user
    });

  } catch (error) {
    console.error('Create user error:', error);
    next(new AppError(500, 'Error creating user profile'));
  }
});

// Get current user profile (protected route)
router.get('/me', protect, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        location: true,
        createdAt: true,
        _count: {
          select: {
            products: true,
            sentMessages: true,
            receivedMessages: true,
            favorites: true
          }
        }
      }
    });

    if (!user) {
      return next(new AppError(404, 'User not found'));
    }

    res.json({
      status: 'success',
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    next(new AppError(500, 'Error fetching user profile'));
  }
});

// Update current user profile (protected route)
router.put('/me', protect, [
  body('username').optional().isString().isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
  body('bio').optional().isString().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  body('location').optional().isString().isLength({ max: 100 }).withMessage('Location must be less than 100 characters'),
  body('avatar').optional().isString().withMessage('Avatar must be a string')
], async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'error',
        errors: errors.array() 
      });
    }

    const { username, bio, location, avatar } = req.body;

    // Check if username is being changed and if it's already taken
    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username,
          id: { not: req.user!.id }
        }
      });

      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Username is already taken'
        });
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        username,
        bio,
        location,
        avatar
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        location: true,
        createdAt: true
      }
    });

    res.json({
      status: 'success',
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update user error:', error);
    next(new AppError(500, 'Error updating user profile'));
  }
});

// Get user by ID (public route)
router.get('/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        location: true,
        createdAt: true,
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    if (!user) {
      return next(new AppError(404, 'User not found'));
    }

    res.json({
      status: 'success',
      user
    });

  } catch (error) {
    console.error('Get user by ID error:', error);
    next(new AppError(500, 'Error fetching user'));
  }
});

export default router; 