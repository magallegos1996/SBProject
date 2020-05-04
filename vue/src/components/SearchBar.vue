<template>
    <div class="row pt-4">
        <div class="col-lg-8 offset-2">
            <input id="searchBar" class="form-control" type="text" placeholder="Buscar" aria-label="Search">
        </div>
        <div class="col-lg-1">
            <v-btn tile color="indigo" dark>
                <font-awesome-icon icon="search"/>
            </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchBar"
    }
</script>

<style scoped>
</style>