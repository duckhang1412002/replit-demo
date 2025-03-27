# Content Creator Website Template

A clean, responsive website template for content creators and bloggers with customizable components and minimal setup requirements. This template provides everything you need to showcase your articles, podcasts, and maintain a professional online presence.

![Content Creator Website Template](https://i.imgur.com/iHZjxT1.png)

## Features

- ✅ Clean, modern design
- ✅ Fully responsive layout
- ✅ Customizable themes and colors
- ✅ Article publishing system
- ✅ Podcast episode showcase
- ✅ Category and tag management
- ✅ Featured article section
- ✅ Easy navigation

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js
- **State Management**: React Query
- **Routing**: Wouter
- **Form Handling**: React Hook Form with Zod validation
- **Development**: Vite

## Local Setup

### Prerequisites

- Node.js (v16.x or later recommended)
- npm (v8.x or later) or yarn

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/content-creator-template.git
cd content-creator-template
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

This will start both the frontend and backend servers. The application will be available at http://localhost:5000.

## Project Structure

```
content-creator-template/
├── client/               # Frontend code
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React context providers
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and constants
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main App component
│   │   └── main.tsx      # Application entry point
├── server/               # Backend code
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite server configuration
├── shared/               # Shared code between frontend and backend
│   └── schema.ts         # Data schemas and types
└── README.md             # Project documentation
```

## Customization

### Changing Theme Settings

The site comes with a built-in theme customizer accessible from the UI. You can also modify the default theme by editing `theme.json` in the root directory:

```json
{
  "primary": "#3b82f6",
  "variant": "professional",
  "appearance": "light",
  "radius": 0.5
}
```

### Adding New Pages

1. Create a new page component in `client/src/pages/`
2. Add the route to `client/src/App.tsx`:

```tsx
<Route path="/your-new-page" component={YourNewPage} />
```

## Content Management

The template uses an in-memory storage system by default. Your content is seeded with example data when the application starts.

To add new content:

- Create new articles through the API at `/api/articles`
- Add podcasts at `/api/podcasts`
- Manage categories at `/api/categories`
- Add tags at `/api/tags`

## Deployment

This template can be easily deployed to any platform that supports Node.js applications, including:

- Vercel
- Netlify
- Render
- Heroku
- AWS, Google Cloud, or Azure

## License

MIT

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

Happy content creating! 🚀