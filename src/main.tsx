import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Nav } from './components/Nav';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/tailwind.css';
import 'highlight.js/styles/github-dark.css';

const Landing = lazy(() => import('./routes/Landing').then((m) => ({ default: m.Landing })));
const WritingIndex = lazy(() =>
  import('./routes/WritingIndex').then((m) => ({ default: m.WritingIndex })),
);
const Post = lazy(() => import('./routes/Post').then((m) => ({ default: m.Post })));
const About = lazy(() => import('./routes/About').then((m) => ({ default: m.About })));
const ProjectIndex = lazy(() =>
  import('./projects/ProjectIndex').then((m) => ({ default: m.ProjectIndex })),
);
const ProjectDetail = lazy(() =>
  import('./projects/ProjectDetail').then((m) => ({ default: m.ProjectDetail })),
);
const ProjectPost = lazy(() =>
  import('./projects/ProjectPost').then((m) => ({ default: m.ProjectPost })),
);
const Resume = lazy(() => import('./routes/Resume').then((m) => ({ default: m.Resume })));

function PageFallback() {
  return <div className="flex min-h-screen items-center justify-center text-glow-soft/40" />;
}

function Root() {
  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </AnimatePresence>
      <ScrollRestoration />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Landing />, errorElement: <ErrorBoundary /> },
      { path: 'writing', element: <WritingIndex />, errorElement: <ErrorBoundary /> },
      { path: 'writing/:slug', element: <Post />, errorElement: <ErrorBoundary /> },
      { path: 'about', element: <About />, errorElement: <ErrorBoundary /> },
      { path: 'projects', element: <ProjectIndex />, errorElement: <ErrorBoundary /> },
      {
        path: 'projects/:projectSlug',
        element: <ProjectDetail />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'projects/:projectSlug/:postSlug',
        element: <ProjectPost />,
        errorElement: <ErrorBoundary />,
      },
      { path: 'resume', element: <Resume />, errorElement: <ErrorBoundary /> },
      { path: '*', element: <ErrorBoundary /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
