import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   views: HomeView,
    // },
    
    {
      path: "/inscription",
      name: "inscription",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/InscriptionView.vue"),
    },
  
    {
      path: "/thefoodbook",
      name: "foodbook",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/FoodBookView.vue"),
    },
    {
      path: "/ProfileEdit",
      name: "ProfileEdit",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ProfileEdit.vue"),
    },
    {
      path: "/",
      name: "HomePage",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/HomePage.vue"),
    },
  ],
});

export default router;
