<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Films from '@/components/Films.vue'

const route = useRoute()
const router=useRouter()
const store = useStore()

// document.title="Starwars: Personajes: "+route.path.replaceAll("%20", " ").replace("/people/", "");

if (store.getters.countPeople==0){
  router.push({name:'people'});//si accede directo o reload, redirect a listado (porque no tenemos propiedad id para hacer fetch a url específica de nave)
}

let isShipLoaded=ref(false);

const name=ref(route.params.name);
const dataObj=store.state.people.find(item=>item.name==name.value)
const objEntries=ref([]);

Object.entries(dataObj).forEach((item)=>{
  if (item[0]!='name' && item[0]!='species' && item[0]!='starships' && item[0]!='films' && item[0]!='homeworld' && item[0]!='vehicles' && item[0]!='created' && item[0]!='edited' && item[0]!='url'){
  let name=item[0].charAt(0).toUpperCase() + item[0].slice(1).replaceAll("_", " ");
  let value=item[1].charAt(0).toUpperCase() + item[1].slice(1);
  objEntries.value.push([name, value]);
  }
})

const films=dataObj.films;

const navesUrls=dataObj.starships;
const navesData=ref([]);



onBeforeMount(()=>{
  if (navesUrls.length>0){
navesUrls.forEach (url=> {
  if (store.getters.countShips>0 && store.state.ships.some(item=>item.url==url)){
    let naveFound=store.state.ships.find(item=>item.url==url);
    navesData.value.push({name: naveFound.name, model:naveFound.model});
    isShipLoaded.value=true;
  } else{
    const request = fetch(url);
    request.then( response => {
              if (!response.ok) {
                throw response.status
             
              } else{
                return response.json()
              }
              })
            .then(json => {
              navesData.value.push({name: json.name, model:json.model});
            })
            .catch((error) => {
              console.log('Ocurrió un error: ', error)
            });
  }
  
})
}
})

</script>
<template>
    <h3>Personajes: {{name}} //</h3>
    <div class="item-container">
      <h4>Detalle</h4>
      <ul>
        <li v-for="(entry, index) in objEntries" :key="index">
        <span class="item-property">{{entry[0]}}:</span> <span class="item-value">{{entry[1]}}</span>
      </li>
      </ul>
        <div v-if="films.length>0">
          <h4>Films</h4>
          <ul >
            <li v-for="(url, index) in films" :key="index" class="sublistado-item"><Films :url="url" /></li>
          </ul>
        </div>
        <div v-if="navesUrls.length>0">
          <h4>Naves</h4>
          <div v-if="isShipLoaded">
            <ul>
              <li v-for="(item, index) in navesData" :key="index" class="sublistado-item"><router-link :to="{name:'nave', params: {name:item.name}}"><span class="ship-name">{{item.name}}</span> ({{item.model}})</router-link></li>
            </ul>
          </div>
          <div v-else>
            <ul>
              <li v-for="(item, index) in navesData" :key="index" class="sublistado-item"><span class="ship-name">{{item.name}}</span> ({{item.model}})</li>
            </ul>
          </div>
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
.ship-name{
  font-weight: bold;
}
.sublistado-item{
  margin-bottom: 0.5rem;
}
a {
  color: #a8a3a3;
  margin-top: 1rem;
} 
a:hover{
  color: #f9d81cda;
  text-decoration: none;
}
</style>
