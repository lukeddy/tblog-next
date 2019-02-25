const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())

routes.add('detail', '/detail/:postId')
// routes.add('about', '/about-us/:foo(bar|baz)')
