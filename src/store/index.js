import { createStore } from 'vuex'
import {auth, db} from '../firebase/config';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import {collection, getDocs, query, orderBy} from 'firebase/firestore'
const store=  createStore({

  state: {
    kullanici:null,
    authDurum: false,
    hizmetler:null
  },
  mutations: {
    kullaniciDegistir(state,payload){
      state.kullanici=payload;
      console.log(state.kullanici);
    },
    authDurumDegistir(state, payload) {
      state.authDurum = payload
    },
    hizmetlerDoldur(state,payload){
      state.hizmetler=payload;
    }
  },
  actions: {
    async login(context,payload){
  
      const res=await signInWithEmailAndPassword(auth,payload.email,payload.parola);
  
      if(res){
      context.commit('kullaniciDegistir',res.user)
      }else{
      throw new Error("Giriş işlemi gerçekleştirilemedi")
      }
      
    },

    async logout(context){
      await signOut(auth)
      context.commit('kullaniciDegistir',null)
    },


    async hizmetlerGetir(context){
  
      let hizmetler = [];
      const colRef = collection(db, 'hizmetler')

      const q = query(colRef,  orderBy('eklenmeTarih',"desc"))
  
      await getDocs(q)
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          hizmetler.push({ ...doc.data(), id: doc.id })
        })
        
      })
      .catch(err => {
        console.log(err.message)
      })
  
      context.commit('hizmetlerDoldur',hizmetler)
  
    }
  },
  modules: {
  },
  getters:{
    hizmetGetir: (state) => (id) => {
      return state.hizmetler.find(hizmet => hizmet.id === id)
    },
    hizmetNoGetir: (state) => (no) => {
      return state.hizmetler.find(hizmet => hizmet.sertifikaNo === no)
    }
  }
})


const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('authDurumDegistir', true)
  store.commit('kullaniciDegistir', user)
  unsub()
})


export default store;

