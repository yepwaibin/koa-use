const connection = require("../app/database");

class CommentService {
  async create(momentId, content, id) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      id,
    ]);
    return result;
  }

  async reply(momentId, content, id, commentId) {
    console.log(momentId, content, id, commentId);
    const statement = `INSERT INTO comment (moment_id, content, user_id, comment_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      momentId,
      content,
      id,
      commentId,
    ]);
    console.log(result);
    return result;
  }

  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [commentId, content]);
    return result;
  }
}

module.exports = new CommentService();
