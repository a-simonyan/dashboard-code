import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const page = (path) => require(`@/pages/${path}.vue`).default;

const routes = [
  {
    path: "/",
    name: "IndexPage",
    component: page("Home"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
