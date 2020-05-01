<template>
    <u-i-fab id="irNuevaFoto" class="float-right mr-5 mb-5" color="primary" size="normal" v-on:click="irNuevaFoto"><font-awesome-icon icon="plus"/></u-i-fab>
</template>

<script>

    import UIFab from 'keen-ui/lib/UiFab'

    export default {
        name: "AddFotoBtn",
        components: {
            UIFab
        },
        methods: {
            irNuevaFoto(){
                this.$router.push('inicio');
            }
        }
    }
</script>

<style scoped>
    #irNuevaFoto{
        background-color: #F50057;
    }
</style>