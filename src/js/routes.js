import HomePage from "../pages/home.jsx";
import CategoryPage from "../pages/about.jsx";
import ProductPage from "../pages/form.jsx";
import LoginPage from "../pages/login.jsx";

import DynamicRoutePage from "../pages/dynamic-route.jsx";
import RequestAndLoad from "../pages/request-and-load.jsx";
import NotFoundPage from "../pages/404.jsx";

var routes = [
  {
    path: "/",
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;
      // Show Preloader
      app.preloader.show();
      setTimeout(function () {
        app.preloader.hide();
        // Resolve route to load page
        resolve({
          component: LoginPage,
        });
      }, 1000);
    },
  },
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/category",
    component: CategoryPage,
  },

  {
    path: "/product",
    component: ProductPage,
  },

  {
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    component: DynamicRoutePage,
  },
  {
    path: "/request-and-load/user/:userId/",
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();
      console.log(app);
      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: "Trương Văn",
          lastName: "Sỹ",
          about: "Hello, i am creator of Framework7! Hope you like it!",
          links: [
            {
              title: "Link to facebook",
              url: "https://www.facebook.com/bao.truongthien.35/",
            },
            {
              title: "Framework7 Forum",
              url: "http://forum.framework7.io",
            },
          ],
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            },
          }
        );
      }, 1000);
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
