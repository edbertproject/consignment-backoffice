import authRoutes from './auth';
import appRoutes from "./app";
import errorRoutes from "./error";

const routes = [
  ...appRoutes,
  ...authRoutes,
  ...errorRoutes
];

export default routes;
