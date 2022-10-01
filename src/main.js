import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {auth} from '../src/firebase/config'
import {onAuthStateChanged} from 'firebase/auth'



let app;

onAuthStateChanged(auth,(user) => {

    if(!app){
        app=createApp(App).use(store).use(router).mount('#app')
    }
})



