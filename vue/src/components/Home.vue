<template>
    <div>
        <div v-if="!buscando">
            <div v-if="publicaciones.length !== 0">
                <SearchBar
                        @buscar="buscarPublicaciones"
                />
                <Feed
                        :publicaciones="publicaciones"
                        :has-next-page="hasNextPage"
                        @cargar-mas="cargarMas"
                />
            </div>
            <div v-else>
                <EmptyState/>
            </div>
        </div>
        <div v-else>
            <SearchingState/>
        </div>
    </div>
</template>

<script>
    import Feed from "./Feed";
    import SearchBar from "./SearchBar";
    import SearchingState from "./SearchingState";
    import EmptyState from "./EmptyState";
    import PublicacionesService from '../service/Publicaciones.service'

    export default {
        name: "Home",
        data(){
            return {
                publicacionesEncontradas : [],
                publicaciones: [],
                buscando: false,
                nextPage: 0,
                hasNextPage: false
            }
        },
        components: {
            Feed,
            SearchBar,
            SearchingState,
            EmptyState
        },
        async created() {
            try{
                const respuesta = await PublicacionesService.obtenerPublicaciones();
                this.publicaciones = respuesta.data.docs; //usando mongoose pagination
                this.hasNextPage = respuesta.data.hasNextPage
                this.nextPage = respuesta.data.nextPage
            }catch (e) { console.log('Error al obtener publicaciones: ' + e); }
        },
        methods: {
            async buscarPublicaciones(terminoBusqueda) {
                this.buscando = true;
                try{
                    const resultados = await PublicacionesService.obtenerBusqueda(terminoBusqueda.trim());
                    this.publicaciones = resultados.data.docs;
                    console.log(this.publicacionesEncontradas);
                    this.buscando = false;
                }catch (e) { console.log('Error al buscar publicaciones: ' + e); }
            },
            async cargarMas () {
                if(this.hasNextPage) {
                    try{
                        const respuesta = await PublicacionesService.obtenerSiguientesPublicaciones(this.nextPage);
                        this.publicaciones.push.apply(this.publicaciones, respuesta.data.docs);
                        this.hasNextPage = respuesta.data.hasNextPage
                        this.nextPage = respuesta.data.nextPage
                    }catch (e) { console.log('Error al cargar publicaciones' + e); }
                }
            },
        }
    }
</script>

<style scoped>

</style>