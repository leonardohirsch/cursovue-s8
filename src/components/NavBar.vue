<script setup>
import { useStore } from 'vuex'
const store = useStore()

</script>

<template>
  <nav>
    <div>
      <img alt="Vue logo" src="../assets/logo.jpg">
    </div>
    <div class="menu">
      <router-link :to="{name:'home'}">Home</router-link>
      <router-link :to="{name:'naves'}">Naves</router-link>
      <router-link :to="{name:'people'}">Personajes</router-link>
      <router-link v-if="!store.getters.authenticated" :to="{name:'register'}">Registrarse</router-link>
      <router-link v-if="!store.getters.authenticated" :to="{name:'login'}">Login</router-link>
      <router-link v-if="store.getters.authenticated" :to="{name:'logout'}">Salir</router-link>
    </div>
  </nav>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  padding: 0;
  margin-bottom: 2rem;
}
nav a {
  font-weight: bold;
  color: #a8a3a3;
  border: solid 1px;
  text-decoration: none;
  padding: 1rem 1.5rem;
}
nav a:hover {
  color: #FFFFFF;
  box-shadow:0px 2px 0px 0px #FFFFFF;
}
nav a.router-link-exact-active {
  color: #f9d81cda;
}
.menu{
  padding: 1rem;
  border: solid 0.5px #808080;
  border-left:none;
  border-right:none;
}
@media only screen and (max-width: 600px) {
  nav{
    display: flex;
    flex-direction: column; 
  }
  .menu{
    display: flex;
    flex-direction: column;
    border: none
  }
  nav a {
  width: 55%;
  margin: 0 auto;
  }
}
</style>
