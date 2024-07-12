<script setup>
import Cart from './Cart.vue';

defineProps({
    items:Array,
})

const emit = defineEmits(['addToFavorite'])
</script>

<template>
    <div class="grid grid-cols-4 gap-5 mt-5">
        <Cart 
            v-for="item in items" 
            :key="item.id"
            :id="item.id"
            :title="item.title" 
            :imageUrl="item.imageUrl" 
            :price="item.price" 
            :isAdded="true" 
            :onClickFavorite="()=>emit('addToFavorite',item)"
            :isFavorite="item.isFavorite"
        />
    </div>
</template>