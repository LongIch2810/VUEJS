import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Product from "../pages/Product.vue";
import ProductDetail from "../pages/ProductDetail.vue";
import Cart from "../pages/Cart.vue";
import NotFound from "../pages/NotFound.vue";
import Profile from "../pages/Profile.vue";
import Contact from "../pages/Contact.vue";
import About from "../pages/About.vue";
import Faq from "../pages/Faq.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import MainLayout from "../components/layout/MainLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
      },
      {
        path: "/products/category/:categorySlug",
        name: "products",
        component: Product,
      },
      {
        path: "/products/:id",
        name: "productDetail",
        component: ProductDetail,
      },
      {
        path: "/cart",
        name: "cart",
        component: Cart,
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "/faq",
        name: "faq",
        component: Faq,
      },
      {
        path: "/about",
        name: "about",
        component: About,
      },
      {
        path: "/contact",
        name: "contact",
        component: Contact,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
