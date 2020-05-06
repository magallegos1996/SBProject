<template>
    <div class="ma-4">
        <v-card outlined v-if="this.comentarios.length!==0" style="height: 250px">
            <v-list dense two-line style="max-height: 250px" class="overflow-y-auto">
                <v-list-item-group v-for="(comentario, index) in comentarios" v-bind:key="index">
                    <v-list-item inactive flat>
                        <v-list-item-avatar>
                            <v-img src="../assets/no-avatar-png-5.png"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="comentario.nombre"></v-list-item-title>
                            <v-list-item-subtitle v-text="comentario.comentario" ></v-list-item-subtitle>
                            <v-card-actions>
                                <v-list-item-subtitle id="verMas" @click="show = !show" v-text="'VER MÁS'" style="font-size: 9px; cursor: pointer"></v-list-item-subtitle>
                            </v-card-actions>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
        <v-card outlined v-else style="height: 250px">
            <div class="ma-4 mt-4">
                <small class="text-muted">No hay comentarios</small>
            </div>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Comentario",
        data(){
            return{
                comentarios: [
                    {
                        id: 1,
                        nombre: 'Stefania Burneo',
                        comentario: 'Esta foto me gusta mucho, intento conservar todo lo que me dices para recordarlo en un futuro'
                    },
                    {
                        id: 2,
                        nombre: 'Stefania Burneo',
                        comentario: 'Esta foto me gusta mucho, intento conservar todo lo que me dices para recordarlo en un futuro'
                    },
                    {
                        id: 3,
                        nombre: 'Marcelo Gallegos',
                        comentario: 'Esta foto me gusta mucho, intento conservar todo lo que me dices para recordarlo en un futuro'
                    },
                    {
                        id: 4,
                        nombre: 'Stefania Burneo',
                        comentario: 'Esta foto me gusta mucho, intento conservar todo lo que me dices para recordarlo en un futuro'
                    },
                    {
                        id: 5,
                        nombre: 'Marcelo Gallegos',
                        comentario: 'Esta foto me gusta mucho, intento conservar todo lo que me dices para recordarlo en un futuro'
                    },
                    {
                        id: 6,
                        nombre: 'Marcelo Gallegos',
                        comentario: 'Esta foto me gusta mucho, intento conservar todo lo que me dices para recordarlo en un futuro'
                    },
                    {
                        id: 7,
                        nombre: 'Marcelo Gallegos',
                        comentario: 'Esta foto me gusta mucho, intento conservar todo lo que me dices para recordarlo en un futuro'
                    },
                    {
                        id: 8,
                        nombre: 'Marcelo Gallegos',
                        comentario: 'Esta foto me gusta mucho, intento conservar todo lo que me dices para recordarlo en un futuro'
                    },
                    {
                        id: 9,
                        nombre: 'Marcelo Gallegos',
                        comentario: 'Esta foto me gusta mucho, intento conservar todo lo que me dices para recordarlo en un futuro'
                    },
                    {
                        id: 10,
                        nombre: 'Marcelo Gallegos',
                        comentario: 'Esta foto me gusta mucho, intento conservar todo lo que me dices para recordarlo en un futuro'
                    },
                ],
            }
        },
    }
</script>

<style scoped>
    #verMas:hover{
        color: #3581B8;
    }
</style>