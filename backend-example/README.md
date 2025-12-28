# Dubai AI Dashboard - Backend API Server

Simple Express.js backend server for the Dubai AI Dashboard.

## Quick Start

1. **Install dependencies:**
   ```bash
   cd backend-example
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **The API will be available at:**
   - Base URL: `http://localhost:3001/api`
   - Health check: `http://localhost:3001/health`

## API Endpoints

- `GET /api/dashboard` - Fetch dashboard data
- `PUT /api/dashboard` - Save dashboard data
- `GET /api/preferences` - Fetch user preferences
- `PUT /api/preferences` - Save user preferences

## Data Storage

Data is stored in JSON files:
- `data.json` - Dashboard data
- `preferences.json` - User preferences

**Note:** This is for development/testing only. For production, use a proper database (PostgreSQL, MongoDB, etc.).

## Environment Variables

- `PORT` - Server port (default: 3001)

## Production Considerations

Before deploying to production, consider:

1. **Database Integration**: Replace file storage with a database
2. **Authentication**: Add user authentication/authorization
3. **Validation**: Add input validation and sanitization
4. **Error Handling**: Improve error handling and logging
5. **Rate Limiting**: Add rate limiting to prevent abuse
6. **HTTPS**: Use HTTPS in production
7. **Environment Variables**: Use environment variables for sensitive data

