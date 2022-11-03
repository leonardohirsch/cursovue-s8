<script setup>
import { ref, onBeforeMount } from 'vue'
const props=defineProps({
  url:{
        type: String
    }
})
const objFile=ref({
  title: null,
  episode_id: null, 
  director: null, 
  producer: null, 
  release_date: null, 
});

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
  <div v-if="objFile.title!=null">
      <div class="film-title">{{objFile.title}}:</div>
      <ul>
        <li><span class="item-property">Episodio:</span> {{objFile.episode_id}}</li>
        <li><span class="item-property">Director:</span> {{objFile.director}}</li>
        <li><span class="item-property">Productor:</span> {{objFile.producer}}</li>
        <li><span class="item-property">Fecha:</span> {{objFile.release_date}}</li>
      </ul>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.film-title{
 font-style: italic;
}
ul{
  list-style: none;
}
li{
  padding: 0.2rem 0;
}
.item-property{
  font-weight: bold;
}
</style>
