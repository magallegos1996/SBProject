import Vue from 'vue'
import VueRouter from 'vue-router'
import SubirFoto from "../components/SubirFoto";
import Home from "../components/Home"
import Login from "../components/Login";
import DetallePublicacion from "../components/DetallePublicacion";
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
      path: '/home',
      name: 'Home',
      component: Home
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
      path: '/publicacion/:id',
      name: 'DetallePublicacion',
      component: DetallePublicacion
    },
    {
      path: '*',
      redirect: '/home'
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/home'){
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
      next('/home');
    }
  }
  if (to.fullPath === '/publicacion'){
    if(AuthService.isAuth()){
      next('/home');
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
