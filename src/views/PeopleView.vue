<script setup>
import { useStore } from 'vuex'
import {onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import PeopleList from '@/components/PeopleList.vue'

const store = useStore()

const showList=(page)=>{
  if (!store.getters.stopGettingPeople){
    store.dispatch("getPeopleList", page)
  }
}
const numPage=ref(1);
const stopGettingPeople=ref(false);
const pagesLoaded=ref([]);

onBeforeMount(()=>{
    showList(1);
    pagesLoaded.value.push(1)
})

const divListado=ref(null)
const getMore= (e)=> {
  if (divListado.value.getBoundingClientRect().bottom < window.innerHeight && !stopGettingPeople.value) {
        let paginasordenadas = pagesLoaded.value.sort((a, b) => a - b);
        if(!pagesLoaded.value.includes(numPage.value+1) && (numPage.value+1-paginasordenadas[paginasordenadas.length-1]==1)){
          pagesLoaded.value.push(numPage.value+1)
          stopGettingPeople.value=true;
          showList(numPage.value+1);

          numPage.value++;
          setTimeout(()=>{
            stopGettingPeople.value=false;
          }, 1000)
        } 
      } else if(stopGettingPeople.value){
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
    <PeopleList v-for="(item, index) in store.state.people" :key="index" :name="item.name" :gender="item.gender"/>
    <div v-if="!store.getters.stopGettingPeople" class="status-message">Aguarde un momento, cargando más personas...</div>
    <div v-else class="status-message">Carga de personas finalizada!</div>
    </div>
  </div>
</template>
<style scoped>
.status-message{
  color: #f9d81cda;
}
</style>


