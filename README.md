# Retail Customer Segmentation Frontend

A modern React application for analyzing and visualizing customer segmentation in retail operations.

## Project Overview

This frontend application supports the Retail Customer Segmentation project, enabling business data analysts to:
- Visualize customer segments based on purchase frequency, revenue, and preferences
- Identify high-value and potential-growth customer segments
- Access interactive dashboards and analytics
- Make data-driven marketing and sales decisions

## Tech Stack

- **React** 18.2.0 - UI library
- **Vite** 5.0 - Build tool and dev server
- **Recharts** 2.10 - Data visualization and charting
- **React Router** 6.20 - Client-side routing
- **React Table** 7.8 - Advanced table component
- **Axios** 1.6 - HTTP client for API calls
- **Lucide React** - Icon library

## Project Structure

```
src/
├── assets/          # Images and media files
├── components/
│   ├── charts/      # Charting components (pie, bar, line charts)
│   ├── filters/     # Filter and search components
│   ├── layout/      # Layout components (navbar, sidebar)
│   └── ...
├── pages/           # Page components
├── services/        # API services and data fetching
├── utils/           # Helper functions and utilities
├── App.jsx          # Main app component
├── main.jsx         # React entry point
└── styles.css       # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## Day 1 Setup Complete ✓

- [x] Folder structure created
- [x] Dependencies configured
- [x] Base app component placeholder
- [x] Vite configuration
- [x] Base styles and layout placeholders
- [x] Git initialization

## Next Steps

- Day 2: Create layout components (navbar, sidebar)
- Day 3: Build filter components
- Day 4: Create chart visualizations
- Day 5: Integrate API services
- Day 6: Build dashboard pages
- Day 7: Testing and optimization

## Notes

This is the foundation for the Retail Customer Segmentation analysis tool. The frontend will connect to a backend API that provides customer segmentation data.