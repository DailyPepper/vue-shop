<script setup>
import axios from 'axios';
import {ref, onMounted } from 'vue';
import CartList from '../components/CartList.vue';

    const favorite = ref([])
    onMounted(async()=>{
        try{
            const {data} = await axios.get('https://f7715800e56706b7.mokky.dev/favorites?_relations=items')
            favorite.value = data.map(obj=>obj.item)
        }catch(e){
            console.log(e)
        }
    })
</script>

<template>
    <h1>
        Мои Закладки
    </h1>
    <CartList :items="favorite"/>
</template>