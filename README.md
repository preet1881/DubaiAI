# Dubai AI Dashboard

A comprehensive resource tracking dashboard for Dubai AI projects. This dashboard provides an interactive interface to track project journeys, stages, dependencies, and progress timelines.

## Features

- 📊 **Category Management**: Organize projects by categories (City Service, Search, Events, Booking)
- 🗺️ **Journey Tracking**: Track multiple journeys within each category
- 📈 **Progress Timeline**: Visual Gantt-style timeline showing stage progress
- ✅ **Status Management**: Track stages with statuses (done, active, critical, pending)
- 🔗 **Dependencies**: Manage and track project dependencies
- ✏️ **Edit Mode**: Full editing capabilities for categories, journeys, stages, and dependencies
- 📝 **Notes**: Add and edit notes for each journey
- ☁️ **Cloud Storage**: All edits are automatically saved to cloud storage via API
- 💾 **Auto-Save**: Debounced auto-save prevents excessive API calls
- 🎨 **Modern UI**: Beautiful dark theme with gradient backgrounds

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/DubaiAI.git
cd DubaiAI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Usage

### Viewing Projects

- Select a category from the sidebar to view its journeys
- Click on a journey to view its details and progress timeline
- View overall progress statistics for each category

### Editing

1. Click the **"Edit Mode"** button in the top right
2. In Edit Mode, you can:
   - Add/Delete categories
   - Add/Delete journeys
   - Edit journey names (double-click or use edit icon)
   - Add/Edit/Delete stages
   - Update stage status, progress, ETA, and actual dates
   - Manage dependencies
   - Edit notes

### Adding Journeys

- Click the **"+"** button next to "Journeys" in the sidebar, or
- Click the **"Add Journey"** button at the bottom of the journey list
- Enter the journey name and press Enter or click Add

### Cloud Storage API Setup

The dashboard uses a cloud storage API to persist all data. You need to set up a backend API server.

#### 1. Configure API URL

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

Or set it to your production API URL:
```bash
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

#### 2. Backend API Requirements

Your backend needs to implement these endpoints:

- **GET** `/api/dashboard` - Fetch dashboard data
- **PUT** `/api/dashboard` - Save dashboard data
- **GET** `/api/preferences` - Fetch user preferences
- **PUT** `/api/preferences` - Save user preferences

See `API_DOCUMENTATION.md` for detailed API specifications and example implementations.

#### 3. Data Persistence

- ✅ All edits are **automatically saved** to cloud storage via API
- ✅ Data persists across page refreshes and devices
- ✅ Debounced saves (500ms) prevent excessive API calls
- ✅ Loading states show when fetching/saving data
- ✅ Error handling with fallback to default data

If the API is unavailable, the dashboard will use default data and show an error message.

## Project Structure

```
DubaiAI/
├── src/
│   ├── DubaiAIDashboard.jsx  # Main dashboard component
│   ├── App.jsx                # App wrapper
│   ├── index.jsx              # Entry point
│   └── api.js                 # API service for cloud storage
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json
├── vite.config.js
├── .env.example              # Environment variables example
├── API_DOCUMENTATION.md      # API endpoint documentation
└── README.md
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **lucide-react** - Icon library

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

