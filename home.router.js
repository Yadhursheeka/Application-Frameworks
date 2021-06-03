const Router = require('@koa/router');

const router = new Router({
    prefix: '/home'
});

router.get('/', ctx=> {
    ctx.body = 'Hello World GET';
});

router.post('/', ctx=> {
    ctx.body = 'Hello World POST';
});

module.exports = router;
