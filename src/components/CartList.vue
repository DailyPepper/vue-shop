<script setup>
import Cart from './Cart.vue';

defineProps({
    items:Array,
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
    <div class="grid grid-cols-4 gap-5 mt-5" v-auto-animate>
        <Cart 
            v-for="item in items" 
            :key="item.id"
            :id="item.id"
            :title="item.title" 
            :imageUrl="item.imageUrl" 
            :price="item.price" 
            :onClickFavorite="()=>emit('addToFavorite',item)"
            :onClickAdd="()=>emit('addToCart',item)"
            :isFavorite="item.isFavorite"
            :isAdded="item.isAdded"
        />
    </div>
</template>