<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <nav class="navbar">
                    <span class="navbar-brand mb-0 h1">SB PROJECT</span>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>

    .navbar {
        min-height: 80px;
        width: 100% !important;
        box-shadow: 0 4px 5px -2px black;
        background-color: #EE6352;
    }
    .navbar-brand {
        padding: 0 15px 0 80px;
        height: 80px;
        line-height: 80px;
        font-weight: bold;
        font-size: 30px;
        color: white;
    }
    .col-lg-12 {
        width: 100%;
    }
</style>