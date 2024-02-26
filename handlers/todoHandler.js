const todoRepository = require("../database/todoRepository");


async function getTodos(ctx) {
  const items = await todoRepository.getAll();

  ctx.body = {
    data: items,
  };
}

async function getTodo(ctx) {
  const {id} = ctx.params;

  try {
    const item = await todoRepository.getOne(id.toString());
    ctx.body = {
      data: item,
    };
  } catch (e) {
    ctx.status = 404;
    return ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

async function create(ctx) {
  try {
    const postData = ctx.request.body || ctx.req.body;
    await todoRepository.save(postData);

    ctx.status = 200;
    ctx.body = {
      success: true,
    };
  } catch (e) {
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

async function update(ctx) {
  try {
    const {id} = ctx.params;
    const postData = ctx.request.body || ctx.req.body;
    await todoRepository.update(id.toString(), postData);

    ctx.status = 200;
    return ctx.body = {
      success: true,
    };
  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

async function remove(ctx) {
  try {
    const {id} = ctx.params;
    await todoRepository.remove(id.toString());
    return ctx.body = {
      success: true,
    };
  } catch (e) {
    ctx.status = 404;
    return ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

module.exports = {
  getTodos,
  getTodo,
  create,
  update,
  remove,
};
