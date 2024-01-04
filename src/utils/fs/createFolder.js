const fs = require('fs').promises;

// Async function to create a folder
export async function createFolder(folderPath) {
  try {
    await fs.mkdir(folderPath);
    console.log(`Folder "${folderPath}" created successfully.`);
  } catch (error) {
    console.error(`Error creating folder "${folderPath}":`, error.message);
  }
}

// Example: Create a folder named 'myFolder' in the current directory
const folderPath = './myFolder';

