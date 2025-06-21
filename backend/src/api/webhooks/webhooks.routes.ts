import { Router } from 'express';
import { prisma } from '../../config/prisma.js';
import { verifySupabaseWebhook } from '../../middleware/webhookAuth.js';
import { AppError } from '../../middleware/errorHandler.js';

const router = Router();

// Supabase user creation webhook
router.post('/supabase/user-created', verifySupabaseWebhook, async (req, res, next) => {
  try {
    const { record, type } = req.body;

    // Only handle user creation events
    if (type !== 'INSERT') {
      return res.status(200).json({ 
        status: 'success', 
        message: 'Ignored non-INSERT event' 
      });
    }

    const { id, email, user_metadata } = record;

    // Check if user already exists in our database
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (existingUser) {
      return res.status(200).json({
        status: 'success',
        message: 'User already exists in database',
        user: existingUser
      });
    }

    // Create user profile in our database
    const user = await prisma.user.create({
      data: {
        id,
        email,
        username: user_metadata?.username || email.split('@')[0], // Use email prefix as default
        avatar: user_metadata?.avatar || null,
        bio: user_metadata?.bio || null,
        location: user_metadata?.location || null
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

    console.log(`✅ Created user profile for: ${email} (${id})`);

    res.status(201).json({
      status: 'success',
      message: 'User profile created successfully',
      user
    });

  } catch (error) {
    console.error('Webhook user creation error:', error);
    next(new AppError(500, 'Error creating user profile from webhook'));
  }
});

export default router; 