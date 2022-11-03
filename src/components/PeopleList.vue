<script setup>
const props=defineProps({
  name:{
        type: String
    },
  gender:{
        type: String
    }
})
</script>
<template>
  <div class="list-item-container">
    <h4>{{name}}</h4>
    <span>{{gender}}</span>
    <router-link :to="{name:'person', params: {name:name}}">Ver detalle</router-link>
  </div>
</template>
<style scoped>
.list-item-container{
  background-color: #1c1b1b;
  width: 50%;
  padding: 1.5rem;
  margin: 1rem auto;
  text-align: left;
}
h4{
  margin-top: 0;
  margin-bottom: 0.2rem;
}
a {
  display: block;
  color: #f9d81cda;
  text-decoration: none;
  margin-top: 1rem;
}
</style>
