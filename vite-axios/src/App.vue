<template>
  <button @click="getList">点击</button>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import {getListAPI} from '@/api/goods.js';
export default defineComponent({
  setup() { 
    function getList() {
      getListAPI().then(res => {
        console.log(res)
      })
    }

    return {
      getList
    }
  }
})
</script>
