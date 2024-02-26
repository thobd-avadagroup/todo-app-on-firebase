const Koa = require("koa");
const routes = require("./routes/routes");

const app = new Koa();
app.use(routes.routes());
app.use(routes.allowedMethods());

app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = "404 Not Found!";
});

module.exports = app;
