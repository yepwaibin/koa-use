const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 获取数据
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 将数据插入到数据库中
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  async detail(ctx, next) {
    const momentId = ctx.params.momentId;
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;

    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    const {momentId} = ctx.params;

    const result = await momentService.remove(momentId);
    ctx.body = result;
  }
}

module.exports = new MomentController();
