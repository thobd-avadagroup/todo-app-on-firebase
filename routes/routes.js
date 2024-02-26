const Router = require("koa-router");
const todoHandler = require("../handlers/todoHandler");

const router = new Router({
  prefix: "/api",
});

router.get("/todos", todoHandler.getTodos);

router.post("/todos", todoHandler.create);

router.get("/todos/:id", todoHandler.getTodo);

router.put("/todos/:id", todoHandler.update);

router.delete("/todos/:id", todoHandler.remove);

module.exports = router;
