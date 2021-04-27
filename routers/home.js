const router = require('koa-router')();

router.get('/', async ctx => {
    let html = `
    <form method="post">
    <label>Name:
      <input name="submitted-name" autocomplete="name">
    </label>
    <button>Save</button>
  </form>
    `;
    ctx.body = html;
});

module.exports = router;