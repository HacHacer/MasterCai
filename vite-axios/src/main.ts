import { createApp, onMounted } from 'vue'
import App from './App.vue'

const app=createApp(App)
app.directive('lazy-image',{
    created(){},
    beforeMount(el,binding){
        el.$data_src=binding.value
    },
    mounted(){},
    beforeUpdate(){},
    updated(){},
    beforeUnmount(){},
    unmounted(){}
})
app.mount("#app");

