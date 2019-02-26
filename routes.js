const nextRoutes = require('next-routes')
const routes=nextRoutes()

// routes.add('home', '/')
routes.add('detail', '/detail/:postId')
// routes.add('categoryeadd', '/admin/categoryadd')
routes.add('admin/categoryedit', '/admin/categoryedit/:catId')
routes.add('admin/postedit', '/admin/postedit/:postId')
//routes.add('detail', '/detail/:postId')                   // post  page       /detail/abc12313
//routes.add('about')                                       // about  about     /about
//routes.add('blog', '/blog/:slug')                         // blog   blog      /blog/:slug
//routes.add('user', '/user/:id', 'profile')                // user   profile   /user/:id
//routes.add('/:noname/:lang(en|es)/:wow+', 'complex')      // (none) complex   /:noname/:lang(en|es)/:wow+
//routes.add({name: 'beta', pattern: '/v3', page: 'v3'})    // beta   v3        /v3

module.exports = routes
