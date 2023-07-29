import { Router } from "express";

import TaskCtrl from '../controllers/task.controller.js';

export default class TaskRoute {

  constructor() {
    this.router = Router();

    this.router.route("/")
      .get(TaskCtrl.getTasks)
      .post(TaskCtrl.addTask);

    this.router.route("/:id")
      .get(TaskCtrl.getTask)
      .put(TaskCtrl.updateTask)
      .delete(TaskCtrl.deleteTask);
  }
}
