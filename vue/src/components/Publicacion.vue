<template>
    <v-hover v-slot:default="{ hover }" close-delay="200">
        <v-card class="mx-auto" :elevation="hover ? 16 : 2">
            <v-img :src="imagen" height="200px"></v-img>
            <v-card-title>{{titulo}}</v-card-title>
            <v-card-subtitle class="pb-0"><b>Subido por:</b> {{subidoPor}}</v-card-subtitle>
            <v-card-subtitle class="text-muted align-end">{{fechaSubida}}  {{horaSubida}}</v-card-subtitle>
            <v-card-actions>
                <v-btn primary text>Ver</v-btn>
                <v-btn :color="'#00BFA6'" text>Eliminar</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text class="text-muted" v-if="descripcion === ''">
                        No hay una descripción
                    </v-card-text>
                    <v-card-text v-else>
                        {{descripcion}}
                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>
    </v-hover>
</template>

<script>
    export default {
        name: "Publicacion",
        data() {
            return {
                show: false,
                publicPath: process.env.BASE_URL
            }
        },
        props: {
            imagen: String,
            titulo: String,
            descripcion: String,
            fechaSubida: String,
            horaSubida: String,
            subidoPor: String
        }
    }
</script>

<style scoped>

</style>