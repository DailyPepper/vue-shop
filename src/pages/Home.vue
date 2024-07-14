<script setup>
import { inject, reactive, watch,ref, onMounted } from 'vue';
import CartList from '../components/CartList.vue';
import axios from 'axios';

const {cart, addToCart, removeFromCart} = inject('cart')
const items = ref([])

const filter = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const onChangeEvent =(event)=>{
  filter.sortBy = event.target.value
}

const onChangeInput = (event) =>{
  filter.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
  item.isFavorite = !item.isFavorite
  console.log(item)
  try{
    if(!item.isFavorite){
      const obj = {
        item_id: item.id,
      }
      const data = await axios.post('https://f7715800e56706b7.mokky.dev/favorites', obj)
      isFavorite = true
      item.favoriteId = data.id
      console.log(data, 'ok')
    }else{
      await axios.delete(`https://f7715800e56706b7.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }
  }catch(e){
    console.log(e)
  }
}

const onClickAddPlus = (item) => {
  if(!item.isAdded){
    addToCart(item)

  }else{
    removeFromCart(item)
  }
  console.log(cart)
}

const fetchFavorite = async () => {
  try{
    const {data: favorites} = await axios.get('https://f7715800e56706b7.mokky.dev/favorites')
    items.value = items.value.map(item=>{
      const favorite = favorites.find(favorite => favorite.item_id === item.id)
      if(!favorite){
        return item
      }
      return{
        ...item, 
        isFavorite: true,
        favoriteId: favorite.id 
      }
    })
  }catch(e){
    console.log(e)
  }
}

const fetchItems = async () => {
  try{
    const params ={
      sortBy: filter.sortBy,
    }

    if(filter.searchQuery){
      params.title = `*${filter.searchQuery}*`  
    }

    const {data} = await axios.get(
      'https://f7715800e56706b7.mokky.dev/items',
      {
        params
      }
    )

    items.value = data.map((obj)=>({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null,
    }))
  } catch (e){
    console.log(e)
  }
} 

onMounted( async ()=>{
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ?  JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorite()
})

watch(cart, ()=>{
  items.value= items.value.map((item)=>({
    ...item,
    isAdded: false
  }))
})

watch(filter, fetchItems)

</script>

<template>
    <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold uppercase">
          Все кроссовки
        </h2> 
        <div class="flex gap-4">
          <select @change="onChangeEvent" name="" id="" class="py-2 px-3 border rounded-md outline-none">
            <option value="name">По названию</option>
            <option value="price">Дешевые</option>
            <option value="-price">Дорогие</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="Поиск">
            <input 
              @change="onChangeInput"
              type="text" 
              placeholder="Поиск..."
              class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400"
            >
          </div>
        </div>
    </div>

    <div class="mt-10">
        <CartList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus"/>
    </div>
</template>