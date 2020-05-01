import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        publicaciones: []
    },
    getters: {
        publicaciones: state => {
            return state.publicaciones;
        }
    },
    mutations: {
        cargarPublicaciones (state, publicaciones) {
            state.publicaciones = publicaciones;
        }
    },
    actions: {}
});