<template>
    <div class="container pt-5">
        <div class="row">
            <div class="col-lg-12">
                <img class="img-fluid mx-auto d-block" src="../assets/login.svg" alt="Login Ill">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 offset-lg-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title text-center text-muted">Ingresa tus credenciales</h5>
                        <div class="row pb-3">
                            <div class="col">
                                <label for="nombreIngreso">Tu nombre</label>
                                <input type="text" class="form-control" id="nombreIngreso">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <button class="btn btn-primary btn-block">Ingresar</button>
                                <small class="text-danger text-center"><b></b></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data () {
            return {

            }
        },
        components: {
        }
    }
</script>

<style scoped>
    img {
        width: 300px;
        height: 300px;
    }
    b {
        color: #00BFA6;
    }
    .btn {
        background-color: #00BFA6;
        color: white;
        font-weight: bold;
        opacity: 0.7;
        transition: 0.3s;
        border: none;
    }
    .btn:hover {
        opacity: 1;
    }
</style>