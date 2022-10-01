<template>
    <div class="row ">
        <div class="col s12 m9 offset-m2 center-align">
            <div class="card grey lighten-4">
                <span class="card-title">Web Yayın Hizmeti Bilgileri</span>
                <div class="card-content">
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix active">badge</i>
                            <input id="sertifikaNo" type="text" class="validate" v-model="sertifikaNo">
                            <label class="active" for="sertifikaNo">Hizmet No:</label>
                        </div>

                        <div class="input-field col s6">
                            <i class="material-icons prefix active">money</i>
                            <input id="alanadi" v-model="alanadi" type="text" class="validate">
                            <label class="active" for="alanadi">Alanadı:</label>
                        </div>

                    </div>
                    <div class="row">

                        <!--      <div class="input-field col s6">
                            <i class="material-icons prefix">face</i>


                            <label for="selectedEkhesap">Ek Hesap Adı</label>
                            <select v-model="selectedEkhesap" id="selectedEkhesap" class="form-control"
                                name="selectedEkhesap">
                                <option :selected="ekhesap == 'Alt Kullanıcı'" v-for="ekhesap in ekhesaplar">
                                    {{
                                    ekhesap }}</option>
                            </select>



                        </div>
                        -->
                    </div>

                </div>
                <div class="row">
                    <div class="file-field input-field">
                        <div class="btn orange">
                            <span>Dosya Seç</span>
                            <input type="file" @change="handleChange">
                        </div>

                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text">
                        </div>
                    </div>
                </div>
                <div class="card-action">
                    <p v-if="hata" class="red-text">{{hata}}</p>
                    <a class="waves-effect waves-light btn orange accent-4 left" @click.prevent="handleBack">
                        Geri <i class="material-icons right">arrow_back</i>
                    </a>
                    <a class="waves-effect waves-light btn green accent-4 right" @click.prevent="handleUpdate">
                        Güncelle <i class="material-icons right">update</i>
                    </a>
                    <a class="waves-effect waves-light btn red accent-4 center" @click.prevent="handleDelete">
                        Sil <i class="material-icons right">delete</i>
                    </a>

                </div>
            </div>
        </div>
    </div>
</template>



<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { db } from '../firebase/config';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import useStorage from '../composables/useStorage';


export default {

    setup() {

        const route = useRoute();
        const store = useStore();
        const router = useRouter();

        const id = route.params.id


        /*  console.log("İncelenecek Hizmet ID: "+id); */

        const hizmet = store.getters.hizmetGetir(id);
        console.log(hizmet);



        const sertifikaNo = ref(hizmet.sertifikaNo);
        const alanadi = ref(hizmet.alanadi);

        const dosya = ref(null)
        const gecerliTip = ['application/pdf'];
        const handleChange = (e) => {

            let secilen = e.target.files[0];

            if (secilen && gecerliTip.includes(secilen.type)) {
                dosya.value = secilen;
                hata.value = null;
            } else {
                dosya.value = null;
                hata.value = "Lütfen pdf uzantılı bir dosya seçiniz"
            }
        }


        const handleBack = () => {
            router.go(-1);
        }

        const hata = ref(null);

        const handleDelete = () => {
            try {
                const docRef = doc(db, 'hizmetler', id);
                deleteDoc(docRef)
                    .then(() => {
                        router.push('/hizmet-listesi');
                    })
                    .catch(err => {
                        hata.value = "Bir hata oluştu. Hizmet Silinemedi"
                    })
            }
            catch (err) {
                hata.value = "Bir hata oluştu. Hizmet Silinemedi"
            }
        }


        const { dosyaYukle, url } = useStorage();

      
const handleUpdate=async ()=>{

const docRef=doc(db,'hizmetler',id);


if(dosya.value){
  
  await dosyaYukle(dosya.value)
  //dosya seçilmişse
  updateDoc(docRef,{
    sertifikaNo:sertifikaNo.value,
    alanadi:alanadi.value,
   

  }).then(()=>{
    router.push('/hizmet-listesi');
  }).catch(err=>{
                  hata.value="Bir hata oluştu. Hizmet Güncellenemedi"
              })
}else{
  //dosya seçilmemişse
  updateDoc(docRef,{
    sertifikaNo:sertifikaNo.value,
    alanadi:alanadi.value,
    

  }).then(()=>{
    router.push('/hizmet-listesi');
  }).catch(err=>{
                  hata.value="Bir hata oluştu. Hizmet Güncellenemedi"
              })
}
}



        return {
            sertifikaNo,
            alanadi,
            handleBack,
            handleDelete,
            handleChange,
            handleUpdate

        }
    }
}
</script>