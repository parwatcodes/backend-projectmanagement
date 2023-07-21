import UserRoute from './user.route.js';

export default class Routes {
  userRoute = new UserRoute();

  constructor(app) {
    this.configBaseRoute(app);
  }

  homeRouteHandler(_, res, _n) {
    res.json({
      message: "Welcome to project management API"
    });
  }

  noRouteHandler(_, res, _n) {
    res.json({
      message: "No route found"
    });
  }

  configBaseRoute(app) {
    app.get("/", this.homeRouteHandler);
    app.use("/users", this.userRoute.router);
    app.use(this.noRouteHandler);
  }
}
