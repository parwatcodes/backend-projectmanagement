import UserRoute from './user.route.js';
import TaskRoute from './task.route.js';
import ProjectRoute from './project.route.js';

export default class Routes {
  userRoute = new UserRoute();
  taskRoute = new TaskRoute();
  projectRoute = new ProjectRoute();

  constructor(app) {
    this.configBaseRoute(app);
  }

  homeRouteHandler(req, res, next) {
    res.json({
      message: "Welcome to project management API"
    });
  }

  noRouteHandler(req, res, next) {
    res.json({
      message: "No route found"
    });
  }

  configBaseRoute(app) {
    app.get("/", this.homeRouteHandler);
    app.post("/login", )
    app.use("/users", this.userRoute.router);
    app.use("/tasks", this.taskRoute.router);
    app.use("/projects", this.projectRoute.router);
    app.use(this.noRouteHandler);
  }
}
