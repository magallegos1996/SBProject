const AuthService = {
    isAuth(){
        let estaAutenticado= false;
        estaAutenticado = !!localStorage.getItem('LoggedUser');

        return estaAutenticado;
    },
};

export { AuthService }


