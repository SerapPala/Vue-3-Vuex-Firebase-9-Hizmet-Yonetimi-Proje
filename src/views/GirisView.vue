<template>
    <div class="row ">
        <div class="col s12 m8 offset-m2 center-align">
            <div class="card grey lighten-4">
                <span class="card-title">Sistem Girişi</span>


                <div class="card-content">
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">email</i>
                            <input id="email" type="text" class="validate" v-model="email">
                            <label for="email">E-Posta:</label>
                        </div>
                        <div class="input-field col s6">
                            <i class="material-icons prefix">lock</i>
                            <input id="parola" type="password" class="validate" v-model="parola">
                            <label for="parola">Parola:</label>
                        </div>
                    </div>
                </div>
                <div class="card-action">
                    <a class="waves-effect waves-light btn orange accent-4" @click.prevent="handleSubmit">GİRİŞ <i
                            class="material-icons right">done</i></a>
                </div>
                <div v-if="hata">{{hata}}</div>
            </div>
        </div>
    </div>
</template>


<script>
import { async } from '@firebase/util';
import { ref } from 'vue'
import { useStore } from 'vuex';

import {useRouter} from 'vue-router'
export default {
    name: 'Giris',
    components: {
    },
    setup() {

        const email = ref('')
        const parola = ref('')
        const hata = ref(null);

        const store = useStore();

        const router=useRouter();


        const handleSubmit = async () => {
            //console.log(email.value,parola.value);

            const payload = {
                email: email.value,
                parola: parola.value
            }

            try {
                await store.dispatch('login', payload)
                router.push('/profil')

            } catch (error) {
                hata.value = error.message;
            }
        }


        return {
            email,
            parola,
            handleSubmit,
            hata
        }
    }
}
</script>
    
    
<style>
/* label focus color */
.input-field input[type=password]:focus+label {
    color: #000 !important;
}

/* label underline focus color */
.input-field input[type=password]:focus {
    border-bottom: 1px solid #000 !important;
    box-shadow: 0 1px 0 0 #000 !important;
}

.input-field .active {
    color: #ff6d00 !important;
}
</style>