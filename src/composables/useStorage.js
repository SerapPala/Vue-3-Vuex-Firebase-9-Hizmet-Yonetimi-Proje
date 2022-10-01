import {ref} from 'vue'
import {storage} from '../firebase/config'
import {ref as sRef,uploadBytes ,getDownloadURL} from 'firebase/storage';



const useStorage=()=>{

    const hata=ref(null)
    const url=ref(null)
    const fileYol=ref(null)

    const dosyaYukle=async (file)=>{

        
        fileYol.value=`hizmetler/${file.name}`
        const storageRef=sRef(storage,fileYol.value)

        
        try {
            const uploadTask=await uploadBytes(storageRef,file);
            url.value=await getDownloadURL(uploadTask.ref)
            
            
        } catch (error) {
            hata.value=error;
        }

    }

    

    return {dosyaYukle,url,fileYol,hata}
}

export default useStorage