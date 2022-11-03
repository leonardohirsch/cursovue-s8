<script setup>
import { ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Pilotos from '@/components/Pilotos.vue'

const route = useRoute()
const router=useRouter()
const store = useStore()

// document.title="Starwars: Naves: "+route.path.replaceAll("%20", " ").replace("/naves/", "");

if (store.getters.countShips==0){
  router.push({name:'naves'});//si accede directo o reload, redirect a listado (porque no tenemos propiedad id para hacer fetch a url específica de nave)
}

const name=ref(route.params.name);
const dataObj=store.state.ships.find(item=>item.name==name.value)
const objEntries=ref([]);

Object.entries(dataObj).forEach((item)=>{
  if (item[0]!='name' && item[0]!='pilots' && item[0]!='films' && item[0]!='created' && item[0]!='edited' && item[0]!='url'){
  let name=item[0].charAt(0).toUpperCase() + item[0].slice(1).replaceAll("_", " ");
  let value=item[1].charAt(0).toUpperCase() + item[1].slice(1);
  objEntries.value.push([name, value]);
  }
})

const pilotos=dataObj.pilots;
</script>
<template>
  <h3>Naves: {{name}} //</h3>
  <div class="item-container">
    <h4>Detalle</h4>
      <ul>
        <li v-for="(entry, index) in objEntries" :key="index">
        <span class="item-property">{{entry[0]}}:</span> <span class="item-value">{{entry[1]}}</span>
      </li>
      </ul>
    <div v-if="pilotos.length>0">
      <h4>Pilotos</h4>
      <ul>
        <li v-for="(url, index) in pilotos" :key="index"><Pilotos :url="url" /></li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
h3{
  color: #f9d81cda;
}
h4{
  margin-bottom: 0.4rem;
  font-style: italic;
  color: #f9d81cda;
  border-bottom: #f9d81cda;
}
.item-container{
  background-color: #1c1b1b;
  width: 50%;
  padding: 1.5rem;
  margin: 1rem auto;
  text-align: left;
}
ul{
  margin-top:0;
}
li::marker {
	color: #f9d81cda;
}
.item-property{
  font-weight: bold;
}
</style>
