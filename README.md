# United Funds

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Be Aware

Using the same version of node and npm will prevent errors or discrepancies on the project.

- Node 18.20.6
- npm 10.8.2

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Folder Structure

The project is organized as follows:

```
├── public/                     # Static files like images, fonts, etc.
│   ├── images/
│   └── ...
├── src/
│   ├── app/                    # CSR pages and API
│   │   ├── api/                # API routes
│   │   │   └── signup/         # API route for signup
│   │   │       └── route.ts
│   │   │   └── logout/         # API route for logout
│   │   │       └── route.ts
│   │   ├── signup/             # Signup page
│   │   │   └── page.tsx
│   │   ├── welcome/            # Welcome page
│   │   │   └── page.tsx
│   │   ├── layout.tsx          # Root layout component
│   │   └── ...
│   ├── components/             # Reusable components
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   └── ...
│   ├── hooks/                  # Custom hooks
│   │   ├── useAuth.ts
│   │   └── ...
│   ├── interfaces/             # TypeScript interfaces and types
│   │   ├── User.ts
│   │   └── ...
│   ├── pages/                  # SSR pages and API routes
│   │   ├── api/
│   │   │   └── login.ts        # API route for login
│   │   ├── login.tsx           # Login page
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx
│   │   └── ...
│   ├── utils/                  # Utility functions
│   │   ├── fetcher.ts
│   │   └── ...
│   ├── context/                # Context providers
│   │   ├── AuthContext.tsx
│   │   └── ...
│   ├── middleware/             # Middleware functions
│   │   ├── authMiddleware.ts
│   │   └── ...
│   ├── services/               # Service classes or functions
│   │   ├── userService.ts
│   │   └── ...
│   ├── config/                 # Configuration files
│   │   ├── development.ts
│   │   ├── production.ts
│   │   └── ...
│   ├── tests/                  # Unit tests, integration tests, and end-to-end tests
│   │   ├── signup.test.ts
│   │   └── ...
│   ├── lib/                    # Libraries or helper functions
│   │   ├── dateUtils.ts
│   │   └── ...
│   └── ...
├── next.config.ts              # Next.js configuration
├── package.json
└── ...
```

## Creating a New Page or Component

### Creating a New Page

1. **Add a New Page**: Create a new directory under `src/app` for the page.
2. **Create a `page.tsx` File**: Add a `page.tsx` file in the new directory.
3. **Add Content**: Add the content for the new page in the `page.tsx` file.

Example:

```tsx
// filepath: united-funds/src/app/newpage/page.tsx
'use client';

import React from 'react';

const NewPage: React.FC = () => {
    return (
        <div>
            <h1>New Page</h1>
            <p>This is a new page.</p>
        </div>
    );
};

export default NewPage;
```

### Creating a New Component

1. **Add a New Component**: Create a new file under `src/components` for the component.
2. **Add Content**: Add the content for the new component in the new file.

Example:

```tsx
// filepath: united-funds/src/components/NewComponent.tsx
import React from 'react';

const NewComponent: React.FC = () => {
    return (
        <div>
            <h1>New Component</h1>
            <p>This is a new component.</p>
        </div>
    );
};

export default NewComponent;
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.