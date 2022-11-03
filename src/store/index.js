import { createStore } from 'vuex'

export default createStore({
  state: {
    authenticated:false,
    usersRegistered:[],
    pagesLoaded:[],
    ships: [],
    stopGettingShips: false,
    pagesPeopleLoaded:[],
    people: [],
    stopGettingPeople: false,
  },
  getters: {
    countShips (state){
         return state.ships.length
     },
     countPeople (state){
      return state.people.length
  },
    countUsers (state){
       return state.usersRegistered.length
    },
    stopGettingShips (state){
       return state.stopGettingShips
    },
    stopGettingPeople (state){
       return state.stopGettingPeople
    },
    authenticated (state){
       return state.authenticated
    }
  },
  mutations: {
    setAuthentication(state, status){
      state.authenticated = status
    },
    loadUser (state, userData){
      state.usersRegistered.push(userData)
    },
    loadShip (state, apiResponse){
      state.ships = [...state.ships, ...apiResponse]
    },
    pagesLoaded (state, page){
      state.pagesLoaded.push(page)
    },
    stopGettingShips (state){
      state.stopGettingShips = true
    },
    loadPeople (state, apiResponse){
      state.people = [...state.people, ...apiResponse]
    },
    pagesPeopleLoaded (state, page){
      state.pagesPeopleLoaded.push(page)
    },
    stopGettingPeople (state){
      state.stopGettingPeople = true
    },
  },
  actions: {
    doSetAuthentication(context,status){
      context.commit("setAuthentication",status)
    },
    loadUserToDb(context,user){
      context.commit("loadUser",user)
    },
    getShipList(context,page){
      if (!context.state.stopGettingShips && !context.state.pagesLoaded.includes(page)){ 
      const request = fetch(`https://swapi.dev/api/starships/?page=${page}`);
      request.then( response => {
              if (!response.ok) {
                throw response.status
                
              } else{
                return response.json()
              }
              })
            .then(json => {
              if (json.count>context.getters.countShips){
              context.commit("loadShip",json.results)
              context.commit("pagesLoaded",page)
              }
              if (context.getters.countShips>=json.count){
                context.commit("stopGettingShips")
              }
            })
            .catch((error) => {
              console.log('Ocurrió un error: ', error)
              if (error=="TypeError: Failed to fetch"){
                const request = fetch(`https://swapi.py4e.com/api/starships/?page=${page}`);
                request.then( response => {
                   if (!response.ok) { 
                     throw response.status
                   } else{
                     console.log("Fetch alternativo")
                     return response.json()
                   }
                   })
                 .then(json => {
                    if (json.count>context.getters.countShips){
                    context.commit("loadShip",json.results)
                    context.commit("pagesLoaded",page)
                    }
                    if (context.getters.countShips>=json.count){
                      context.commit("stopGettingShips")
                    }
                               })
                 .catch((error) => {
                   console.log('Ocurrió un error: ', error)
                   if (error=="TypeError: Failed to fetch"){
                     console.log("Falló el fetch nuevamente")
                   }
                 });
               }
            });
          }
          },
    getPeopleList(context,page){
            if (!context.state.stopGettingPeople && !context.state.pagesPeopleLoaded.includes(page)){ 
            const request = fetch(`https:///swapi.dev/api/people/?page=${page}`);
            request.then( response => {
                    if (!response.ok) {
                      throw response.status
                      
                    } else{
                      return response.json()
                    }
                    })
                  .then(json => {
                    if (json.count>context.getters.countPeople){
                    context.commit("loadPeople",json.results)
                    context.commit("pagesPeopleLoaded",page)
                    }
                    if (context.getters.countPeople>=json.count){
                      context.commit("stopGettingPeople")
                    }
                  })
                  .catch((error) => {
                    console.log('Ocurrió un error: ', error)
                    if (error=="TypeError: Failed to fetch"){
                      const request = fetch(`https://swapi.py4e.com/api/people/?page=${page}`);
                      request.then( response => {
                         if (!response.ok) { 
                           throw response.status
                         } else{
                           console.log("Fetch alternativo")
                           return response.json()
                         }
                         })
                       .then(json => {
                          if (json.count>context.getters.countPeople){
                          context.commit("loadPeople",json.results)
                          context.commit("pagesPeopleLoaded",page)
                          }
                          if (context.getters.countPeople>=json.count){
                            context.commit("stopGettingPeople")
                          }
                                     })
                       .catch((error) => {
                         console.log('Ocurrió un error: ', error)
                         if (error=="TypeError: Failed to fetch"){
                           console.log("Falló el fetch nuevamente")
                         }
                       });
                     }
                  });
                }
                },
  },
  modules: {
  }
})
