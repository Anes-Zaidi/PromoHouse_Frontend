# PromoHouse Frontend

A modern Next.js application for PromoHouse, built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd promo_house_front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
promo_house_front/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── Navbar.tsx        # Navigation component
├── lib/                   # Utility functions
├── public/               # Static assets
├── sections/             # Page sections
└── types/                # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Styling

This project uses Tailwind CSS with custom design tokens defined in `globals.css`. The color scheme includes:

- Brand colors: Green theme (#27ae60)
- Light/Dark mode support
- Consistent spacing and typography

## Components

UI components are built using shadcn/ui, which provides:

- Accessible components
- Customizable styling
- TypeScript support
- Consistent design system

## Contributing

1. Follow the existing code style
2. Use TypeScript for type safety
3. Test components thoroughly
4. Update documentation as needed

## License

MIT