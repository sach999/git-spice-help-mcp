# Cursor MCP Server

This repository contains a Model Context Protocol (MCP) server implementation that provides a tool for searching git-spice documentation within Cursor IDE.

## Features

- Integration with Cursor IDE through MCP protocol
- Real-time git-spice documentation search
- Simple and efficient documentation parsing

## Prerequisites

- Node.js (v16 or higher)
- Cursor IDE
- npm or yarn package manager

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Build the project:
```bash
npm run build
# or
yarn build
```

## Configuration

### Server Configuration
The server is pre-configured with the following capabilities:
- Tools capability
- Resources capability
- Prompts capability

### Cursor IDE Configuration

1. Open Cursor IDE settings:
   - On macOS: `Cmd + ,`
   - On Windows/Linux: `Ctrl + ,`

2. Navigate to the "Extensions" section

3. Find the MCP Server settings and add a new server configuration:
```json
{
  "name": "Git Spice MCP Server",
  "command": "node",
  "args": ["dist/index.js"],
  "cwd": "/path/to/your/project"
}
```

4. Save the settings and refresh the MCP

## Usage

When using Cursor in agent mode, the MCP server will be automatically detected and the git-spice documentation search tool will be available. The agent will prompt you to use the tool when relevant to your queries.

## Project Structure
- `src/index.ts`: Main server implementation
- `src/`: Source code directory
- `dist/`: Compiled output directory

## Acknowledgments

- [Model Context Protocol](https://github.com/modelcontextprotocol)
- [git-spice](https://github.com/abhinav/git-spice)
- [Cursor IDE](https://cursor.sh) 