/**
 * Video Download Script for Just In
 * 
 * This script helps download campus videos from Vimeo to the local public/videos folder.
 * 
 * Usage:
 * 1. Install dependencies: npm install node-fetch fs-extra
 * 2. Run: node scripts/download-videos.js
 */

import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

// Get current file's directory name (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Video URLs from the collegeVideos object in the Index.tsx file
const videos = {
  'UCLA': 'https://drive.google.com/uc?export=download&id=1MUQzDlDhxgqYStKXPcMcCSVVwWd2dGj0',
  'USC': 'https://player.vimeo.com/progressive_redirect/playback/756423050/rendition/1080p/file.mp4?loc=external&signature=ecb31eb1a0e1f8f2ed18feebd2abf31ad0d511e4124079cd7e5e759a26e3ff89',
  'Harvard': 'https://player.vimeo.com/progressive_redirect/playback/770349790/rendition/1080p/file.mp4?loc=external&signature=3c7dedc2b91965a14d86602ca89d5edb22cca7b5df68fb4005b08e7b1f1fcd60',
  'Stanford': 'https://player.vimeo.com/progressive_redirect/playback/456716506/rendition/1080p/file.mp4?loc=external&signature=dd91fc1c1edc8278d17eba1757c8cd6b41b48acec0bd7b4d8a26c4eba29db507',
  'UC Berkeley': 'https://player.vimeo.com/progressive_redirect/playback/751347599/rendition/1080p/file.mp4?loc=external&signature=7eaa5c68e0729aecfc41fa13b2b0ad3374c39c566db8fe7e2c24ce739f917694',
  'MIT': 'https://player.vimeo.com/progressive_redirect/playback/513283858/rendition/1080p/file.mp4?loc=external&signature=d32b0b19d3001e3e9d8ac2ec9aabd2651e7b2a36c0bc3b65c64bbe547941f2d0',
  'Yale': 'https://player.vimeo.com/progressive_redirect/playback/514803587/rendition/1080p/file.mp4?loc=external&signature=defe2ddad3efcdaed3ac43b4e2d27ee83a5e7c7e94316434b4553129ecacc05e',
  'Princeton': 'https://player.vimeo.com/progressive_redirect/playback/760364060/rendition/1080p/file.mp4?loc=external&signature=67e66f00a09a4ab6c4cd3d9a58ffb0dd4e5f0c76d9bd0c2b05f65eb42250e246'
};

const outputDir = path.join(__dirname, '../public/videos');

async function downloadVideo(college, url) {
  try {
    console.log(`Downloading ${college} video...`);
    
    // Create a filename based on the college name
    const filename = `${college.toLowerCase().replace(/\s+/g, '-')}-campus.mp4`;
    const outputPath = path.join(outputDir, filename);
    
    // Ensure the videos directory exists
    await fs.ensureDir(outputDir);
    
    // Download the video
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download ${college} video: ${response.statusText}`);
    }
    
    // Save to file
    await pipeline(response.body, fs.createWriteStream(outputPath));
    
    console.log(`✅ ${college} video saved to ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error downloading ${college} video:`, error.message);
    return false;
  }
}

async function downloadAllVideos() {
  console.log('Starting video downloads...');
  console.log(`Videos will be saved to: ${outputDir}`);
  
  // Create the output directory if it doesn't exist
  await fs.ensureDir(outputDir);
  
  const results = [];
  
  // Download each video sequentially
  for (const [college, url] of Object.entries(videos)) {
    const success = await downloadVideo(college, url);
    results.push({ college, success });
  }
  
  // Print summary
  console.log('\nDownload Summary:');
  for (const { college, success } of results) {
    console.log(`${success ? '✅' : '❌'} ${college}`);
  }
  
  const successCount = results.filter(r => r.success).length;
  console.log(`\nDownloaded ${successCount} out of ${results.length} videos.`);
  
  if (successCount > 0) {
    console.log('\nTo use local videos:');
    console.log('1. Open src/pages/Index.tsx');
    console.log('2. Uncomment the "Option 1: Local videos" section');
    console.log('3. Comment out the "Option 2: External videos" section');
  }
}

downloadAllVideos().catch(console.error); 