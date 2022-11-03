<script setup>
import { useStore } from 'vuex'
import {onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import NavesList from '@/components/NavesList.vue'

const store = useStore()

const showList=(page)=>{
  if (!store.getters.stopGettingShips){
    store.dispatch("getShipList", page)
  }
}
const numPage=ref(1);
const stopGettingShips=ref(false);
const pagesLoaded=ref([]);

onBeforeMount(()=>{
    showList(1);
    pagesLoaded.value.push(1)
})

const divListado=ref(null)
const getMore= (e)=> {
  if (divListado.value.getBoundingClientRect().bottom < window.innerHeight && !stopGettingShips.value) {
        let paginasordenadas = pagesLoaded.value.sort((a, b) => a - b);
        if(!pagesLoaded.value.includes(numPage.value+1) && (numPage.value+1-paginasordenadas[paginasordenadas.length-1]==1)){
          pagesLoaded.value.push(numPage.value+1)
          stopGettingShips.value=true;
          showList(numPage.value+1);

          numPage.value++;
          setTimeout(()=>{
            stopGettingShips.value=false;
          }, 1000)
        } 
      } else if(stopGettingShips.value){
        let pageMasAlta=Math.max(...pagesLoaded.value);
        numPage.value=pageMasAlta;
      }
}

onMounted(() => {
  window.addEventListener("scroll", getMore)
 })
 onUnmounted(() => {
  window.removeEventListener("scroll", getMore)
 })
</script>
<template>
  <div>
    <div ref="divListado">
    <NavesList v-for="(item, index) in store.state.ships" :key="index" :name="item.name" :model="item.model"/>
    <div v-if="!store.getters.stopGettingShips" class="status-message">Aguarde un momento, cargando más naves...</div>
    <div v-else class="status-message">Carga de naves finalizada!</div>
    </div>
  </div>
</template>
<style scoped>
.status-message{
  color: #f9d81cda;
}
</style>


