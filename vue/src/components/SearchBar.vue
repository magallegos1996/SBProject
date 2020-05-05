<template>
    <div class="container mr-2">
        <div class="row pt-4 align-items-center">
            <div class="col-sm-1">
                <div class="my-2">
                    <v-btn v-if="show" text color="primary" small @click="verTodo">Ver todo</v-btn>
                </div>
            </div>
            <div class="col-lg-8">
                <input v-model="terminoBusqueda" id="searchBar" class="form-control" type="text" placeholder="Buscar" aria-label="Search">
            </div>
            <div class="col-lg-1" v-if="terminoBusqueda !== ''">
                <v-btn tile color="indigo" dark @click="buscarPublicaciones">
                    <font-awesome-icon icon="search"/>
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: "SearchBar",
        data(){
            return {
                terminoBusqueda: '',
                mensajeError: '',
                error: false,
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            buscarPublicaciones (){
                this.$emit('buscar', this.terminoBusqueda.trim());
            },
            verTodo(){
                this.$emit('ver-todo');
            }
        }
    }
</script>

<style scoped>
</style>