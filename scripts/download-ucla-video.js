/**
 * UCLA Video Download Script for Just In
 * 
 * This script helps download the UCLA campus video from Google Drive to your local project.
 * Google Drive links can be unreliable for direct streaming, so this is a good fallback.
 * 
 * Usage:
 * 1. Install dependencies: npm install node-fetch fs-extra
 * 2. Run: node scripts/download-ucla-video.js
 */

import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

// Get current file's directory name (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// UCLA Video URL (Google Drive direct download link)
const UCLA_VIDEO_URL = 'https://drive.google.com/uc?export=download&id=1MUQzDlDhxgqYStKXPcMcCSVVwWd2dGj0';
const outputDir = path.join(__dirname, '../public/videos');
const outputPath = path.join(outputDir, 'ucla-campus.mp4');

async function downloadUCLAVideo() {
  try {
    console.log('Starting UCLA video download...');
    console.log(`Video will be saved to: ${outputPath}`);
    
    // Create the output directory if it doesn't exist
    await fs.ensureDir(outputDir);
    
    // Download the video
    console.log('Connecting to Google Drive...');
    const response = await fetch(UCLA_VIDEO_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`);
    }
    
    console.log('Connected! Downloading video file...');
    
    // Save to file
    await pipeline(response.body, fs.createWriteStream(outputPath));
    
    console.log('\n✅ UCLA video downloaded successfully!');
    console.log('\nTo use the local video:');
    console.log('1. Open src/pages/Index.tsx');
    console.log('2. Uncomment the "Option 1: Local videos" section');
    console.log('3. Comment out the "Option 2: External videos" section');
    
  } catch (error) {
    console.error(`\n❌ Error downloading UCLA video: ${error.message}`);
    console.log('\nAlternative manual download method:');
    console.log('1. Go to: https://drive.google.com/file/d/1MUQzDlDhxgqYStKXPcMcCSVVwWd2dGj0/view');
    console.log('2. Click the download button in Google Drive');
    console.log('3. Save the file as "ucla-campus.mp4" in your public/videos folder');
  }
}

downloadUCLAVideo().catch(console.error); 