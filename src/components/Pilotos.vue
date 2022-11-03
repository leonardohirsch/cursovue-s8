<script setup>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const props=defineProps({
  url:{
        type: String
    }
})

let isPersonLoaded=ref(false);

const objFile=ref({
  name: null,
  height: null, 
  mass: null, 
  hair_color: null, 
  skin_color: null, 
  eye_color: null, 
  birth_year: null, 
  gender: null,
  films: [],
  starships:[],
});
const films=ref([])

const getFilm=(url)=>{
      const request = fetch(url);
      request.then( response => {
              if (!response.ok) {
                throw response.status
                
              } else{
                return response.json()
              }
              })
            .then(json => {
              films.value.push(json.title);
            })
            .catch((error) => {
              console.log('Ocurrió un error: ', error)
               });
}

const getFile=(url)=>{
      const request = fetch(url);
      request.then( response => {
              if (!response.ok) {
                throw response.status
                
              } else{
                return response.json()
              }
              })
            .then(json => {
              objFile.value={...json};
              json.films.forEach(url => {
                getFilm(url);
              });
              if (store.getters.countPeople>0){
                if (store.state.people.some(item=>item.name==json.name)){
                  isPersonLoaded.value=true;
                }
              }
            })
            .catch((error) => {
              console.log('Ocurrió un error: ', error)
               });
}


onBeforeMount(()=>{
  getFile(props.url);
})

</script>
<template>
  <div v-if="objFile.name!=null">
    <span v-if="isPersonLoaded">
      <router-link :to="{name:'person', params: {name:objFile.name}}">{{objFile.name}}</router-link>
    </span>
    <span class="item-name" v-else>
      {{objFile.name}}
    </span>
  <div v-if="films.length>0"><ul class="films-list"><span class="films-subtitle">Films:</span>
      <li v-for="title in films" class="films-item">{{title}}</li>
    </ul>
  </div>
</div>
  
</template>
<style scoped>
a {
  color: #a8a3a3;
  font-weight: bold;
  margin-top: 1rem;
} 
a:hover{
  color: #f9d81cda;
  text-decoration: none;
}
.item-name{
  font-weight: bold;
}
.films-list{
  list-style: none;
  font-style: italic;
  margin: 0.7rem 0;
}
.films-subtitle{
  font-weight: 600;
}
</style>
