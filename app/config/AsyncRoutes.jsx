import asyncRoute from '../utilities/asyncRoute';

/**
 * These async routes are defined in favor of code-splitting.
 */
export const Home = asyncRoute(() => import('../routes/Home'));
export const About = asyncRoute(() => import('../routes/About'));
