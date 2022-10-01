<template>
    <div class="row ">
        <div class="col s12 m9 offset-m2 center-align">
            <div class="card grey lighten-4">
                <span class="card-title">Web Yayın Hizmeti Ekle</span>
                <div class="card-content">
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">badge</i>
                            <input id="sertifikaNo" type="text" class="validate" v-model="sertifikaNo">
                            <label for="sertifikaNo">Hizmet No:</label>
                        </div>

                        <div class="input-field col s6">
                            <i class="material-icons prefix">money</i>
                            <input id="alanadi" v-model="alanadi" type="text" class="validate">
                            <label for="alanadi">Alanadı:</label>
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
                </div>
                <div class="card-action">
                    <p v-if="dosyaHata" class="red-text">{{dosyaHata}}</p>
                    <a :disabled="dosyaHata" class="waves-effect waves-light btn orange accent-4"
                        @click.prevent="handleSubmit">Kaydet
                        <i class="material-icons right">save</i></a>
                    <p v-if="belgeHata" class="red-text">{{belgeHata}}</p>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import { async } from '@firebase/util';
import { ref } from 'vue'
import useStorage from '../composables/useStorage';

import useCollection from '@/composables/useCollection';

import { useRouter } from 'vue-router'
import { serverTimestamp } from 'firebase/firestore'
export default {

    setup() {

        const sertifikaNo = ref('')
        const alanadi = ref('')

        const router = useRouter();
        /*  const selectedEkhesap = ref('') */

        const { dosyaYukle, url, fileYol, hata } = useStorage();

        const { belgeEkle, belgeHata } = useCollection('hizmetler');


        const dosya = ref(null)
        const dosyaHata = ref(null)
        const gecerliTip = ['application/pdf'];




        const handleChange = (e) => {

            let secilen = e.target.files[0];

            if (secilen && gecerliTip.includes(secilen.type)) {
                dosya.value = secilen;
                dosyaHata.value = null;
            } else {
                dosya.value = null;
                dosyaHata.value = "Lütfen pdf uzantılı bir dosya seçiniz"
            }
        }

        const handleSubmit = async () => {
            //console.log(sertifikaNo.value,not.value,ogrAd.value,ogrSoyad.value);
            if (dosya.value) {
                await dosyaYukle(dosya.value)
                //console.log('dosya yüklendi',url.value);


                await belgeEkle({
                    sertifikaNo: sertifikaNo.value,
                    alanadi: alanadi.value,
                    eklenmeTarih: serverTimestamp()
                })

                if (!belgeHata.value) {
                    console.log('Hizmet Eklendi');
                    router.push('/hizmet-listesi')

                }

            }
        }



        return {
            sertifikaNo,
            alanadi,

            /*   selectedEkhesap,
              ekhesaplar: [
                  "Alt Kullanıcı",
                  "FİRMA ADI"
              ], */
            handleChange,
            handleSubmit,
            dosyaHata,
            belgeHata

        }


    },


}
</script>
