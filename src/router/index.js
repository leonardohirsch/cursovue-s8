import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title: "Home",
    }
  },
  {
    path: '/naves',
    name: 'naves',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "naves" */ '../views/NavesView.vue'),
    meta:{
      title: "Naves",
    },
    beforeEnter: (to, from, next)=>{
      if (!store.getters.authenticated){
        next("/login");
      } else{
        next();
      }
    }
  },
  {
    path: '/naves/:name', 
    name: 'nave',
    component: () => import(/* webpackChunkName: "nave" */ '../views/NaveView.vue'),
    meta:{
      title: "Naves",
    },
    beforeEnter: (to, from, next)=>{
      if (!store.state.authenticated){
        next("/login");
      } else{
        next();
      }
    }
  },
  {
    path: '/people',
    name: 'people',
    component: () => import(/* webpackChunkName: "people" */ '../views/PeopleView.vue'),
    meta:{
      title: "Personajes",
    },
    beforeEnter: (to, from, next)=>{
      if (!store.getters.authenticated){
        next("/login");
      } else{
        next();
      }
    }
  },
  {
    path: '/people/:name', 
    name: 'person',
    component: () => import(/* webpackChunkName: "person" */ '../views/PersonView.vue'),
    meta:{
      title: "Personajes",
    },
    beforeEnter: (to, from, next)=>{
      if (!store.getters.authenticated){
        next("/login");
      } else{
        next();
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue'),
    meta:{
      title: "Registración",
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta:{
      title: "Login",
    },
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/LogoutView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  if (to.name=="nave"){
    document.title="Starwars: Naves: "+to.path.replaceAll("%20", " ").replace("/naves/", "");
  } else if(to.name=="person"){
    document.title="Starwars: Personajes: "+to.path.replaceAll("%20", " ").replace("/people/", "");
  } else{
    document.title=`Starwars: ${to.meta.title}`;
  }
  next();
})

export default router
