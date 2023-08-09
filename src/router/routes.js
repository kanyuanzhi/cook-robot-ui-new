const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue")
      }
    ]
  },
  {
    path: "/dishSelect",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/dishSelect/IndexPage.vue")
      },
    ],
  },
  {
    path: "/dishEdit",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/dishEdit/IndexPage.vue")
      },
    ],
  },
  {
    path: "/systemSettings",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/systemSettings/IndexPage.vue")
      },
    ],
  },
  {
    path: "/mobile",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "control",
        component: () => import("pages/mobilePages/control/IndexPage.vue")
      },
      {
        path: "scan",
        component: () => import("pages/mobilePages/scan/IndexPage.vue")
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
];

export default routes;
