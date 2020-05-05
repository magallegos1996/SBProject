<template>
    <div class="row pt-4">
        <div class="col-lg-8 offset-2">
            <input v-model="terminoBusqueda" id="searchBar" class="form-control" type="text" placeholder="Buscar" aria-label="Search">
        </div>
        <div class="col-lg-1" v-if="terminoBusqueda !== ''">
            <v-btn tile color="indigo" dark @click="buscarPublicaciones">
                <font-awesome-icon icon="search"/>
            </v-btn>
        </div>
        <div class="col-lg-1" v-else>
            <v-btn tile color="indigo" dark disabled @click="buscarPublicaciones">
                <font-awesome-icon icon="search"/>
            </v-btn>
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
        methods: {
            async buscarPublicaciones (){
                this.$emit('buscar', this.terminoBusqueda.trim());
            }
        }
    }
</script>

<style scoped>
</style>