# Mobile Commerce App

A React-based mobile commerce application with multi-language support, dark mode, and WhatsApp-style chat functionality. This modern, responsive application is built using React, Tailwind CSS, and various utility libraries to provide a seamless mobile commerce experience. It was created striving for the simplicity: the way most older people manage their phones, buttons on the lower side of the screen, big and clear titles, simplicity for pragmatism, few, but strong button options. 

## Features

- 📱 Responsive mobile-first design
- 🌙 Dark mode support
- 🌐 Multi-language support (English, Spanish, French, German)
- 💬 WhatsApp-style chat interface
- 📊 Sales analytics with charts
- 💰 Financial tracking
- 🔄 Smooth page transitions
- 👤 User account management

## Tech Stack

- React
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- Recharts (charts)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mobile-commerce-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure Tailwind CSS for dark mode by updating your `tailwind.config.js`:
```javascript
module.exports = {
  darkMode: 'class',
  // ... rest of your config
}
```

4. Start the development server:
```bash
npm start
```

## Usage

The application consists of four main sections:

### Home
- Overview of monthly earnings
- Unread messages display
- Quick access to important information

### Money
- Sales overview with statistics
- Visual charts for sales trends
- Comparison with previous periods

### Chat
- WhatsApp-style chat interface
- Real-time message display
- Unread message indicators
- Chat history

### Account
- Personal information management
- Application settings
- Language selection
- Dark mode toggle
- Privacy and notification settings

## Language Support

The application supports four languages:
- English (default)
- Spanish
- French
- German

To switch languages, use the language selector in the Account settings.

## Dark Mode

Dark mode can be toggled in the Account settings. The application uses Tailwind's dark mode classes for consistent styling across all components.

## Page Transitions

Smooth page transitions are implemented using Framer Motion, providing a native app-like feel:
- Slide animations between pages
- Fade effects for modal windows
- Smooth state transitions

## Components

### Main Components
- `MobileCommerceApp`: Root component managing global state
- `HomePage`: Dashboard with key metrics
- `MoneyPage`: Financial analytics
- `ChatPage`: Messaging interface
- `AccountPage`: Settings and user preferences

### Utility Components
- `ChatWindow`: WhatsApp-style chat interface
- `AccountSettingItem`: Reusable settings item component

## State Management

The application uses React's built-in state management with hooks:
- `useState` for component-level state
- `useEffect` for side effects
- Props for component communication

## Styling

Styling is handled through Tailwind CSS classes with:
- Responsive design utilities
- Dark mode variants
- Custom color schemes
- Flexible layout systems

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev)
- Charts powered by [Recharts](https://recharts.org)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
