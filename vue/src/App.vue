<template>
  <div class="container-fluid" id="app">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--<NavBar/>-->
    <Inicio/>
  </div>
</template>

<script>
//import NavBar from "./components/NavBar";
import Inicio from "./components/Inicio";

export default {
  name: 'App',
  components: {
  //  NavBar,
    Inicio
  }
}
</script>

<style>

  #app {
    background-color: #1abc9c;
  }

</style>
