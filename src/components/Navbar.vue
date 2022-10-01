
<template v-if="authDurum">

    <nav class="deep-orange lighten-2">
        <router-link to="/" class="brand-logo center">Hizmet Yönetimi</router-link>

        <ul class="right">

            <div v-if="!kullanici">
                <li>
                    <router-link to="/giris"><i class="material-icons">login</i></router-link>
                </li>
            </div>

            <div v-if="kullanici">
                <li>
                    <router-link to="/profil"><i class="material-icons">account_circle</i></router-link>
                </li>
                <li><a @click="handleClick"><i class="material-icons">logout</i></a></li>
            </div>

        </ul>

    </nav>

</template>
   
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { computed } from 'vue'
export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        const handleClick = () => {
            store.dispatch('logout');
            router.push('/')
        }

        return {
            handleClick,
            kullanici: computed(() => store.state.kullanici),
            authDurum: computed(() => store.state.authDurum)
        }
    }

}

</script>