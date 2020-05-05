const AuthService = {
    isAuth(){
        let estaAutenticado= false;
        estaAutenticado = !!localStorage.getItem('LogUser');

        return estaAutenticado;
    },
};

export { AuthService }


