import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: ()=> import('../components/Login.vue')
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: ()=> import('../views/Calculator.vue')
  },
  {
    path: '/meals',
    name: 'Meals',
    component: ()=> import('../views/Meals.vue')
  },
  {
    path: '/progress',
    name: 'Progress',
    component: ()=> import('../views/Progress.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: ()=> import('../views/Favorites.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
