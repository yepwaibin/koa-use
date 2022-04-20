const errorTypes = require("../constants/error-types");
const service = require("../service/user.service");
const md5password = require("../utils/password-handle");

// 验证数据库中是否存在此用户
// 如果有，则返回错误，不进行创建用户
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

// 对明文密码进行md5加密，再存进数据库
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = { verifyUser, handlePassword };
