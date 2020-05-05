import Vue from "vue";
import Vuex from "vuex";
//import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        publicaciones: [],
        loading: false,
    },
    getters: {
        publicaciones: state => {
            return state.publicaciones;
        },
        loading: state => {
            return state.loading;
        }
    },
    mutations: {
        cargarPublicaciones (state, publicaciones) {
            state.publicaciones = publicaciones;
        },
        eliminarPublicaciones (state, publicaciones) {
          state.publicaciones = publicaciones;
        },
        cambiarLoading (state, loading) {
            state.loading = loading
        },
    },
    actions: {},
    /*plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],*/ //importante para que, cuando el usuario refresque la página, se mantengan las publicaciones en el Feed
});