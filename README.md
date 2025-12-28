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
- 💾 **Auto-Save**: All edits are automatically saved to browser's localStorage
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

### Data Persistence

All your edits are **automatically saved** to your browser's localStorage. This means:
- ✅ Your changes persist across page refreshes
- ✅ Your data is saved locally in your browser
- ✅ No need to manually save - everything is auto-saved
- ⚠️ Data is stored per browser/device (not synced across devices)
- ⚠️ Clearing browser data will remove saved changes

To reset to default data, you can clear your browser's localStorage for this site.

## Project Structure

```
DubaiAI/
├── src/
│   ├── DubaiAIDashboard.jsx  # Main dashboard component
│   ├── App.jsx                # App wrapper
│   └── index.js              # Entry point
├── public/
│   └── index.html            # HTML template
├── package.json
├── vite.config.js
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

