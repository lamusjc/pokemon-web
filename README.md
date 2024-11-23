# 🎮 Pokemon Frontend Application

A Next.js-based Pokemon application that interacts with a Django backend to display and manage Pokemon data. Built with modern web technologies and real-time features.

## ✨ Features

- Pokemon listing with detailed information
- Real-time Pokemon import progress tracking via WebSocket
- Responsive design
- Detailed view for individual Pokemon with abilities

## 🚀 Tech Stack

- [Next.js 14](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- WebSocket for real-time updates
- TypeScript for type safety

## 📦 Installation

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/lamusjc/pokemon-web
cd pokemon-web
npm install
```

## 🔧 Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

## 💻 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📱 Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions and helpers
- `/public` - Static assets

## 🔍 Key Components

- `PokemonCard` - Displays grid of Pokemon cards
- `PokemonImporter` - Handles Pokemon data import with real-time progress

## 🌐 API Integration

The frontend connects to a Django backend API for:
- Fetching Pokemon data
- Real-time import progress via WebSocket
- Type and ability information

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.