<template>
  <div class="row ">
    <div class="col s12 m8 offset-m2 center-align">
      <div class="card grey lighten-4">
        <span class="card-title">Hizmet Arama </span>
        <a class="btn-floating halfway-fab waves-effect waves-light orange accent-4 pulse" @click.prevent="handleClick">
          <i class="material-icons">search</i>
        </a>

        <div class="card-content">
          <p>Aradığınız Hizmeti bulmak için lütfen hizmet numaranızı doğru bir şekilde giriniz.</p>
          <div class="row">
            <div class="input-field col s8">
              <input id="sertifika_no" type="text" v-model="sertifikaNo">
              <label for="sertifika_no">Hizmet No:</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Transition name="hata">
  <div v-if="hata" class="col s12 m8 offset-m2 center-align">
    <div class="card red lighten-4">
      <span class="card-title">Hizmet Arama Sonucu </span>

      <div class="card-content">
        <p>{{hata}} </p>
      </div>
    </div>
  </div>
</Transition>

<Transition name="hizmet">
  <div v-if="hizmetBilgisi!=''" class="col s12 m12">
    <div class="card grey lighten-4">
      <div class="card-content black-text">
        <span class="card-title">Hizmet Bilgisi</span>
        <div class="row">
          <div class="col s4 m4">
            <p><b class="">Hizmet No: :</b> {{hizmetBilgisi.sertifikaNo}}</p>
          </div>
          <div class="col s4 m4">
            <p><b>Alanadı :</b> {{hizmetBilgisi.alanadi}}</p>
          </div>
        <!--   <div class="col s4 m4">
            <a @click="hizmetIncele(hizmet.id)" target="_blank" class="btn btn-success">Hİzmet İncele</a>
          </div> -->
        </div>



      </div>

    </div>
  </div>
</Transition>

</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
export default {
  name: 'HomeView',
  components: {
  },
  setup() {
    console.log(M);

    const sertifikaNo = ref('')
    const store = useStore();
    store.dispatch('hizmetlerGetir');
    const hata = ref(null)
    const hizmetBilgisi = ref('')

    const hizmetler = computed(() => store.state.hizmetler)

    console.log(hizmetler.value);

    const handleClick = () => {
      hata.value = null
      hizmetBilgisi.value = ''
      const hizmet = store.getters.hizmetNoGetir(sertifikaNo.value);
      /* console.log(hizmet); */



      if (hizmet === undefined) {
        hata.value = sertifikaNo.value + " numaralı hizmet bulunamadı"
      } else {
        hizmetBilgisi.value = hizmet
      }

      console.log(hizmetBilgisi.value);

    }

    

    return {
      sertifikaNo,
      handleClick,
      hata,
      hizmetBilgisi
    }


  }
}
</script>
<style>
/* label color */
.input-field label {
  color: #000 !important;
}

/* label focus color */
.input-field input[type=text]:focus+label {
  color: #000 !important;
}

/* label underline focus color */
.input-field input[type=text]:focus {
  border-bottom: 1px solid #000 !important;
  box-shadow: 0 1px 0 0 #000 !important;
}


.row {
  margin-top: 25px;
}

.hata-enter-active,
.hata-leave-active {
  transition: opacity 2s ease;
}

.hata-enter-from,
.hata-leave-to {
  opacity: 0;
}


.hizmet-enter-active,
.hizmet-leave-active {
  transition: opacity 2s ease;
}

.hizmet-enter-from,
.hizmet-leave-to {
  opacity: 0;
}

</style>