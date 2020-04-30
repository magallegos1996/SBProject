<template>
    <div class="container pt-5">
        <div class="row">
            <div class="col-lg-12">
                <img class="img-fluid mx-auto d-block" src="../assets/empty-state-1.svg" alt="Kiwi standing on oval">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 offset-lg-4 text-center">
                <h4><b>Aún no has publicado nada</b></h4>
                <p class="text-muted">No se ha podido encontrar ninguna publicación. Haz clic en '+' para crear una nueva</p>
            </div>
            <div class="col-lg-12 pr-5">
                <AñadirFotoBtn/>
            </div>
        </div>
    </div>

</template>

<script>

    import AñadirFotoBtn from "./AñadirFotoBtn";

    export default {
        name: "EmptyFeed",
        data() {
            return {
                iconName: 'box',
                width: 18,
                height: 18,
                iconColor: 'currentColor'
            }
        },
        components: {
            AñadirFotoBtn
        },
        methods: {
        },
    }
</script>

<style scoped>
    img {
        width: 380px;
        height: 380px;
    }
    b {
        color: #00BFA6;
    }
</style>