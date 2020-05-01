import Vue from 'vue'
import VueRouter from 'vue-router'
import SubirFoto from "../components/SubirFoto";
import Feed from "../components/Feed";
import Login from "../components/Login";
import { AuthService } from '../service/auth.service';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/subir-foto',
      name: 'SubirFoto',
      component: SubirFoto,
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '*',
      redirect: '/login'
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/feed'){
    if(!AuthService.isAuth()){
      next('/login');
    }
  }
  if (to.fullPath === '/subir-foto'){
    if(!AuthService.isAuth()){
      next('/login');
    }
  }
  if (to.fullPath === '/login'){
    if(AuthService.isAuth()){
      next('/feed');
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

export default router;
