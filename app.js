const Koa = require('koa'),
    bodyParser = require('koa-bodyparser');

const HomeRouter = require('./routes/home.router');
const PostRouter = require('./routes/post.routes');

// Creating Koa Application
const app = new Koa();

// Registering the body parser
// BodyParser gets the data stream in the body in the request, converts into an applicable
// format and makes it available to the user.
// In our case, we are dealing with JSON in the body, so body-parser will understand that
// the body contains JSON by looking at the Content-Type in the header
// Content-Type = application/json

// Middleware --> making use of the 'use' function and adding a function inside it is called
// a middleware. Middleware can be executed at anytime, before registering the routes, or after.
//In the middleware, you will get requests, responses and other objects, u may do some changes to
// them and even return things.
app.use(bodyParser());


// Registered Routes
// Routes are registered with allowed methods such as 'GET' and 'POST'.
// So we are registering the routes as well as their routing methods.
app.use(HomeRouter.routes())
    .use(HomeRouter.allowedMethods());

app.use(PostRouter.routes())
    .use(PostRouter.allowedMethods());

app.use(ctx => {
    ctx.body = "Hello";
});


// application is made to run on port 3000, and if any error occurs, it is handled as
// mentioned below.
app.listen(3000, err=> {
    if(err) {
        console.error(err);
        return;
    }
    console.log("App is running on port 3000");
});
