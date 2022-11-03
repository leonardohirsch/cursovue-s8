<script setup>
import {ref, watch} from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()

const router = useRouter()

const userName=ref("");
const userEmail=ref("");
const userEmailInput=ref(null);
const userPass=ref("");
const passWarnSpan=ref("");
const emailWarnSpan=ref("");
const btnSubmitActive=ref(false);


const registerUser=()=>{
  if (localStorage.getItem("starwarsDbUsers") === null) {
    localStorage.setItem("starwarsDbUsers", JSON.stringify([]));
  }
  let dataBaseUsers= JSON.parse(localStorage.getItem("starwarsDbUsers"))
  if (dataBaseUsers.map(user=> user.email).includes(userEmail.value.toLowerCase())){
    userEmailInput.value.focus();
    emailWarnSpan.value="Ya existe un usuario registrado con ese email";
  } else{
    let lastUserId;
    if (store.getters.countUsers>0){
      lastUserId =parseInt(dataBaseUsers.map(user=> user.id).sort((a, b) => b - a ).slice(0, 1));
    } else lastUserId=0;
    let newId=lastUserId+1;
    let newUser={
      id: newId,
      email: userEmail.value.toLowerCase(),
      password: userPass.value,
      name: userName.value,
    }
    store.dispatch("loadUserToDb", newUser)
    dataBaseUsers.push(newUser)
    localStorage.setItem("starwarsDbUsers", JSON.stringify(dataBaseUsers));

    store.dispatch("doSetAuthentication", true)
    sessionStorage.setItem("userId",newId);
    sessionStorage.setItem("userName",userName.value);
    userEmail.value="";
    userPass.value="";
    userName.value="";
    alert("Te has registrado con éxito!")
    router.push({name:'naves'});
  }
  
}

watch([userName, userEmail,userPass], ([newUserName, newUserEmail, newUserPass]) => {
  passWarnSpan.value= newUserPass.length>0 && newUserPass.length<4 ? "La contraseña debe contener mínimamente 4 caracteres" : "";
  emailWarnSpan.value= newUserEmail.length>0 && !newUserEmail.includes('@')  ? "El email debe ser una dirección válida" : "";
  
  if (newUserName.length>1 && newUserPass.length>=4 && newUserEmail.length>4 && newUserEmail.includes('@')){
    btnSubmitActive.value=true;
  } else btnSubmitActive.value=false;
});

</script>
<template>
  <div >
    <h2>Registrarse //</h2>
    <form @submit.prevent="registerUser()">
      <div class="form-container">
        <div class="form-row">
          <input type="text" v-model.trim="userName" placeholder="Nombre y Apellido" >
        </div>
        <div class="form-row">
          <input type="email" ref="userEmailInput" v-model.trim="userEmail" placeholder="Email" required>
          <span v-if="emailWarnSpan!=''">{{emailWarnSpan}}</span>
        </div>
        <div class="form-row">
          <input type="password" v-model.trim="userPass" placeholder="Password" required>
          <span v-if="passWarnSpan!=''">{{passWarnSpan}}</span>
        </div>
        <div v-if="btnSubmitActive" class="form-row">
          <button type="submit">Registrarse!</button>
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
