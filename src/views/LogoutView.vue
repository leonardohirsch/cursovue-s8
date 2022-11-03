<script setup>
import {onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

onBeforeMount(()=>{
  if (store.getters.authenticated){
  sessionStorage.clear();
  store.dispatch("doSetAuthentication", false)
}
})

router.push({name:'home'});
</script>
