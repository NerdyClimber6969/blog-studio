# Blog-Studio

A blogging studio/workshop built with React, where users can manage their articles and comments.

This app has two related repositories:
- [**Blog API**](https://github.com/nickyuencm117/blog-api) - A RESTful API from which this app **fetches post and comment data from**.
- [**Blog App**](https://github.com/nickyuencm117/blog-app) - for users to **read posts and leave comments**.

# Table of Contents
- [Live Demo](#live-demo)
- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Authentication](#authentication)
- [Getting Started](#getting-started)
- [Acknowledgments](#acknowledgments)

# Live Demo
A live demo of this app can be found at [**Here**](https://blog-studio-staging.up.railway.app).

**Note:** Users are required to sign up and log in through [**Blog App**](https://blog-app-staging.up.railway.app/) before using [**Blog Studio**](https://blog-studio-staging.up.railway.app).

# Project Structure
```
src/
├── App/         # main App component
├── components/  # reusable React components (UI elements, widgets)
├── context/     # React context providers
├── hook/        # custom React hooks
├── icons/       # svg icons and icon components
├── pages/       # page-level React components (route targets)
├── services/    # API service layer
├── style/       # global css style and variables
├── utils/       # utility functions and helpers
├── main.jsx     # app entry point, renders the root component
└── routes.jsx   # route definitions for React Router
```

# Features
- Cross-site authentication
- Text search, pagination, sorting, and filtering functionality
- Loading state animation
- Pop-up messages
- Dark and light themes
- Client-side data validation
- Responsive UI design
- Rich text editor
- Post and comment management
- Overview statistics

# Tech Stack
- [Vite](https://v3.vitejs.dev/) - Build tool that aims to provide a faster and leaner development experience for modern web projects
- [React](https://react.dev/) - Library for building web and native user interfaces
- [React Router](https://reactrouter.com/home) - A router library for routering in React Project
- [CSS Modules](https://github.com/css-modules/css-modules) - CSS files where all class names and animation names are scoped locally by default
- [TipTap](https://tiptap.dev/) - Open source editor framework

# Authentication
This app uses JWT (JSON Web Tokens) for authentication. Upon successful login, a JWT is issued and sent to the client as a **cookie** named `accessToken`. This cookie is:

- **HTTP-only**: Not accessible via JavaScript, helping to prevent XSS attacks.
- **Secure**: Only sent over HTTPS connections.
- **SameSite=None**: Allows cross-site requests from your front-end applications.

To access protected endpoints, clients must include the `accessToken` cookie in their requests. The server will automatically verify the JWT from the cookie for authentication and authorization.

**Note:** 
- Make sure your client applications are served over HTTPS to ensure cookies are transmitted
- Make sure the cookie domain matches the client’s domain

# Getting Started
1. Clone this repository
```
git clone https://github.com/nickyuencm117/blog-studio.git
cd blog-studio
```

2. Install dependencies
```
npm install
```

3. Create a .env file and set up environment variables
```
VITE_BACKEND_URL=<URL for Backend>
VITE_BLOG_APP_URL=<URL for Blog App>
```

4. Start the dev server
```
npm run dev
```

# Acknowledgments
- React team
- TipTap team
- React community
- JavaScript community
- Node.js community