<template>
    <div class="row mt-lg-12 pt-lg-10">
        <div class="col-lg-12 my-auto">
            <div class="text-center w-25 mx-auto">
                <v-progress-circular :size="50" :width="7" :color="'#D62246'" indeterminate></v-progress-circular>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="text-center">
                <h4>Buscando...</h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchingState",
        data () {
            return {}
        },
        watch: {},
        methods: {}
    }
</script>

<style scoped>
</style>