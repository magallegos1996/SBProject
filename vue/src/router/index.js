import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from "../components/Inicio";
import Feed from "../components/Feed";
import { AuthService } from '../service/auth.service';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio,
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed
    },
    {
      path: '*',
      redirect: '/'
    },
    /* {
       path: '/about',
       name: 'About',
       // route level code-splitting
       // this generates a separate chunk (about.[hash].js) for this route
       // which is lazy-loaded when the route is visited.
       component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
     }*/

  ],
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/feed'){
    if(!AuthService.isAuth()){
      next('/');
    }
  }
  //Si requiere ir  / estando en cualquier pagina verifica si está autenticado. Si lo esta eliminar la autenticacion. De esta manera debera insertar de nuevo Stefania Burneo
  /*if (to.fullPath === '/') {
    if (AuthService.isAuth()) {
      localStorage.removeItem('LoggedUser');
      next('/');
    }
  }*/
  next();
});

/*router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  if (to.fullPath === '/users') {
    if (!store.state.accessToken) {
      next('/login');
    }
  }
  if (to.fullPath === '/login') {
    if (store.state.accessToken) {
      next('/users');
    }
  }
  next();
});*/

export default router;
