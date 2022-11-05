<script setup>
import {ref, watch} from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const userEmail=ref("");
const userEmailInput=ref(null);
const userPass=ref("");
const loginWarnSpan=ref("");
const btnSubmitActive=ref(false);


const loginUser=()=>{
  if (localStorage.getItem("starwarsDbUsers") === null) {
    localStorage.setItem("starwarsDbUsers", JSON.stringify([]));
  }
  let dataBaseUsers= JSON.parse(localStorage.getItem("starwarsDbUsers"))
  let foundUser=dataBaseUsers.find(user=> user.email==userEmail.value.toLowerCase());
  if (foundUser!=undefined && foundUser.password==userPass.value){
    store.dispatch("doSetAuthentication", true)
    sessionStorage.setItem("userId",foundUser.id);
    sessionStorage.setItem("userName",foundUser.name);
    alert("Login con éxito!")
    router.push({name:'naves'});
  } else{
    userEmailInput.value.focus();
    loginWarnSpan.value="No se ha encontrado ningún usuario con esos datos";
  }
  
}

watch([userEmail,userPass], ([newUserEmail, newUserPass]) => {
  if (newUserPass.length>0 || newUserEmail.length>0){
    loginWarnSpan.value="";
  }
  if (newUserPass.length>=4 && newUserEmail.length>4 && newUserEmail.includes('@')){
    btnSubmitActive.value=true;
  } else btnSubmitActive.value=false;
});

</script>
<template>
  <div >
    <h2>Login //</h2>
    <form @submit.prevent="loginUser()">
      <div class="form-container">
        <div class="form-row">
          <input type="email" ref="userEmailInput" v-model.trim="userEmail" placeholder="Email" required>
        </div>
        <div class="form-row">
          <input type="password" v-model.trim="userPass" placeholder="Password" required>
        </div>
        <div v-if="loginWarnSpan!=''">
          <span>{{loginWarnSpan}}</span>
        </div>
        <div class="form-row">
          <button type="submit" :disabled="btnSubmitActive===false">Entrar!</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
h2{
  color: #f9d81cda;
}
.form-container{
  background-color: #1c1b1b;
  width: 50%;
  padding: 1.5rem;
  margin: 1rem auto;
}
input{
  width: 100%;
  margin: 1rem 0;
  color: #1c1b1b;
  font-weight: bold; 
}
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #1c1b1b;
  font-weight: bold;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #1c1b1b;
  font-weight: bold;
}
button{
  margin-top: 1rem;
  background-color: transparent;
  border-color:  #a8a3a3;
  color: #a8a3a3;
  padding: 1rem;
  font-weight: bold;
}
button:hover{
  border-color: #f9d81cda;
  color: #f9d81cda;
}
</style>
