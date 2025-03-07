// Import the 'fs' module with promises for asynchronous file operations
const fs = require('fs').promises;

// Import the 'path' module to handle and transform file paths
const path = require('path');

// Function to read and parse a JSON file asynchronously

const readJsonFile = async (filename) => {

    try {
    
        // Read the file asynchronously from the 'data' directory
        const data = await fs.readFile(
    
            // Construct the file path using '__dirname' (current directory) and 'filename'
            path.join(__dirname, '..', 'data', filename) 
    
        );
    
        // Parse the file content (JSON string) into a JavaScript object and return it
        return JSON.parse(data);
    
    } 
    catch (error) {
    
        // If an error occurs (e.g., file not found), return an empty array as a fallback
        return [];
    
    }

};

// Function to write data to a JSON file asynchronously

const writeJsonFile = async (filename, data) => {

    // Write the data to the file asynchronously in the 'data' directory

    await fs.writeFile(

        // Construct the file path using '__dirname' (current directory) and 'filename'
    
        path.join(__dirname, '..', 'data', filename),

        // Convert the data to a JSON string with indentation (2 spaces) for readability
    
        JSON.stringify(data, null, 2)
    
    );

};

// Export the functions to make them available for use in other modules

module.exports = {

    readJsonFile,

    writeJsonFile

}; 