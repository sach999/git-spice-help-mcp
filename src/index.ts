import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import fetch from 'node-fetch';

// Function to fetch and parse git-spice documentation
async function fetchGitSpiceDocs(): Promise<string> {
    try {
        const response = await fetch('https://abhinav.github.io/git-spice/cli/reference/');
        const html = await response.text();
        
        // Basic HTML parsing to extract text content
        // Remove HTML tags and decode HTML entities
        const textContent = html
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&[^;]+;/g, '') // Remove HTML entities
            .replace(/\s+/g, ' ')    // Normalize whitespace
            .trim();
        
        return textContent;
    } catch (error) {
        console.error('Failed to fetch git-spice documentation:', error);
        return 'Error: Failed to fetch documentation. Please try again later.';
    }
}

async function startServer() {
    try {
        // Create an MCP server with explicit capabilities
        const server = new McpServer({
            name: "Cursor MCP Server",
            version: "1.0.0",
            capabilities: {
                tools: {},  // Enable tools capability
                resources: {},  // Enable resources capability
                prompts: {}  // Enable prompts capability
            }
        });

        // Add a git-spice documentation search tool
        server.tool("git_spice_help", 
            { query: z.string() },
            async ({ query }) => {
                console.log('Git Spice help search called with query:', query);
                
                // Fetch and search documentation
                const docs = await fetchGitSpiceDocs();
                const lines = docs.split('\n');
                
                // Search for matches (case-insensitive)
                const matches = lines
                    .filter((line: string) => line.toLowerCase().includes(query.toLowerCase()))
                    .join('\n');
                
                const result = matches.length > 0 
                    ? matches 
                    : `No matches found for "${query}" in git-spice documentation.`;
                
                return {
                    content: [{ type: "text", text: result }]
                };
            }
        );

        // Create and connect the transport
        const transport = new StdioServerTransport();
        console.log('Starting MCP Server...');
        await server.connect(transport);
        console.log('MCP Server connected and ready');

    } catch (error) {
        console.error('Failed to start MCP server:', error);
        process.exit(1);
    }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
});

// Start the server
startServer(); 