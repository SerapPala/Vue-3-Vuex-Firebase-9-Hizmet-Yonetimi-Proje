<template>

    <div>
        <div class="row">
            <div class="col s12 m12">
                <div class="card blue-grey darken-1">
                    <div class="card-content black-text">
                        <span class="card-title white-text">Hizmet Listesi</span>


                        <ul class="collapsible">

                            <li v-for="hizmet in hizmetler" :key="hizmet.id">
                                <div class="collapsible-header"><i class="material-icons orange-text">article</i>
                                    Alanadı: {{hizmet.alanadi}}- Hizmet No: {{hizmet.sertifikaNo}}</div>
                                <div class="collapsible-body white-text">
                                    <span>Eklenme Tarihi : {{hizmet.eklenmeTarih}}</span>
                                    <button class="right btn orange" @click="hizmetIncele(hizmet.id)">İNCELE</button>
                                </div>
                            </li>




                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>


<script>
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
import { computed, onMounted } from 'vue'

export default {

    setup() {
        onMounted(() => {

            M.AutoInit()

        })
        const store = useStore();
        const router = useRouter();

        store.dispatch('hizmetlerGetir');

        const hizmetler = computed(() => store.state.hizmetler)

        const hizmetIncele = (id) => {
            //console.log(id);
            router.push({ name: 'HizmetinceleView', params: { id } });
        }

        return {
            hizmetler,
            hizmetIncele
        }





    }
}
</script>