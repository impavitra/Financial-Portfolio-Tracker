# Financial Portfolio Tracker - Frontend

A modern React.js single-page application for managing investment portfolios with real-time data visualization and AI-powered insights.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Portfolio Management**: Create, view, and manage multiple investment portfolios
- **Asset Management**: Add/remove stocks and ETFs by ticker symbol
- **Real-time Data**: Live stock prices and portfolio valuations
- **Data Visualization**: Interactive charts for portfolio allocation and performance
- **AI Insights**: AI-powered portfolio analysis and recommendations
- **Responsive Design**: Mobile-first, fully responsive interface
- **Modern UX**: Clean, intuitive design with loading states and error handling

## 🛠️ Technology Stack

- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Axios** for API communication
- **Chart.js** with React Chart.js 2 for data visualization
- **Lucide React** for modern icons
- **React Hot Toast** for notifications
- **CSS3** with custom properties and modern layout

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- Backend API running on port 8081

## 🔧 Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#0ea5e9)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Gray Scale**: 50-900 range

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components

- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, danger)
- **Forms**: Consistent styling with validation states
- **Modals**: Overlay dialogs with backdrop blur

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔐 Authentication Flow

1. **Login/Register**: Users authenticate with username/password
2. **JWT Storage**: Tokens stored in localStorage
3. **Auto-redirect**: Authenticated users redirected to dashboard
4. **Token Validation**: Automatic token verification on app load

## 📊 Data Visualization

### Portfolio Allocation Chart

- **Type**: Doughnut chart
- **Data**: Asset values and percentages
- **Colors**: 10-color palette for easy distinction
- **Interactive**: Hover tooltips with detailed information

### Performance Metrics

- **Total Value**: Real-time portfolio valuation
- **Day Change**: Simulated daily performance
- **Asset Count**: Number of holdings
- **Average Value**: Mean asset value

## 🤖 AI Insights Features

### Diversification Score

- **Range**: 0-100
- **Calculation**: Based on asset count and sector distribution
- **Visual**: Progress bar with color coding

### Risk Assessment

- **Levels**: Low, Medium, High
- **Factors**: Asset count, total value, diversification
- **Visual**: Colored badges with descriptions

### Recommendations

- **AI-Generated**: Based on portfolio analysis
- **Categories**: Diversification, asset allocation, risk management
- **Actionable**: Specific suggestions for improvement

## 🎯 User Experience

### Loading States

- **Skeleton Loaders**: For data-heavy components
- **Spinners**: For actions and API calls
- **Progressive Loading**: Staged content loading

### Error Handling

- **Toast Notifications**: User-friendly error messages
- **Form Validation**: Real-time input validation
- **Fallback UI**: Graceful degradation for errors

### Empty States

- **Illustrations**: Custom SVG icons
- **Helpful Text**: Guidance for next steps
- **Call-to-Actions**: Direct paths to functionality

## 🔄 API Integration

### Endpoints Used

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/portfolios` - Fetch user portfolios
- `POST /api/portfolios` - Create new portfolio
- `GET /api/portfolios/:id` - Get portfolio details
- `POST /api/portfolios/:id/assets` - Add asset to portfolio
- `DELETE /api/portfolios/:id/assets/:ticker` - Remove asset
- `GET /api/portfolios/:id/insights` - Get AI insights
- `GET /api/stocks/:ticker/info` - Get stock information

### Error Handling

- **Network Errors**: Automatic retry with exponential backoff
- **Authentication**: Automatic logout on token expiry
- **Validation**: Client-side and server-side validation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── PortfolioCard.jsx # Portfolio summary card
│   ├── AssetTable.jsx  # Assets data table
│   ├── AddAssetModal.jsx # Add asset dialog
│   ├── PortfolioChart.jsx # Data visualization
│   └── InsightsPanel.jsx # AI insights display
├── contexts/           # React contexts
│   ├── AuthContext.jsx # Authentication state
│   └── PortfolioContext.jsx # Portfolio state
├── hooks/              # Custom React hooks
│   └── useAuth.js      # Authentication hook
├── pages/              # Page components
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Dashboard.jsx   # Main dashboard
│   └── Portfolio.jsx   # Individual portfolio view
├── services/           # API services
│   └── api.js          # Axios configuration
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of routes
- **Memoization**: React.memo for expensive components
- **Bundle Size**: Tree shaking and minimal dependencies
- **Caching**: API response caching where appropriate

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- **ESLint**: Configured for React best practices
- **Prettier**: Code formatting (if configured)
- **Conventions**: Functional components, hooks, modern JavaScript

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for localhost:3000
2. **API Connection**: Verify backend is running on port 8081
3. **Build Errors**: Clear node_modules and reinstall dependencies

### Debug Mode

- **React DevTools**: Browser extension for debugging
- **Network Tab**: Monitor API calls and responses
- **Console**: Check for JavaScript errors

## 📄 License

This project is part of a portfolio management system assignment.
