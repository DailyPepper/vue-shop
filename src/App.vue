<script setup>
import { computed, provide, ref, watch } from 'vue';
import axios from 'axios';
import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';
import Home from './pages/Home.vue';
// корзина
const cart = ref([])
const drawerOpen = ref(false)
const isCreatingOrder = ref(false)


const totalPrice = computed(
  ()=>cart.value.reduce((acc,item)=> acc+item.price,0)
)

const varPrice = computed(()=> Math.round((totalPrice.value * 5)/100))

const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

const createOrder = async () => {
  try{
    isCreatingOrder.value = true
    const {data} = await axios.post('https://f7715800e56706b7.mokky.dev/orders',{
      items: cart.value,
      totalPrice: totalPrice.value,
    })
    cart.value = []

    return data;
  }catch(e){
    console.log(e)
  }finally{
    isCreatingOrder.value = false
  }
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCart = (item) =>{
  cart.value.splice(cart.value.indexOf(item),1)
  item.isAdded = false
}

watch(cart,()=>{
  localStorage.setItem('cart', JSON.stringify(cart.value))
}, {
  deep:true
})

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <Drawer v-if="drawerOpen" :totalPrice="totalPrice" :varPrice="varPrice" @create-order="createOrder" :is-creating-order="isCreatingOrder.value"/>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10 mb-10">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
