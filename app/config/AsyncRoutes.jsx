import asyncRoute from '../utilities/asyncRoute';

/**
 * These async routes are defined in favor of code-splitting.
 */
export const Home = asyncRoute(() => System.import('../routes/Home'));
export const About = asyncRoute(() => System.import('../routes/About'));
export const Editor = asyncRoute(() => System.import('../routes/Editor'));
