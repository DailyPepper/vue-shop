<script setup>
defineProps({
    totalPrice:Number,
})

const emit = defineEmits(['openDrawer']);

</script>

<template>
    <header class="flex justify-between border-b border-slate-100 px-8 py-8">
        <router-link to="/">
            <div class="flex items-center gap-4">
                <img src="/logo.png" alt="Logo" class="w-10">
                <div>
                    <h2 class="text-xl font-bold uppercase">
                        Vue sneakers
                    </h2>
                    <p class="text-slate-400">
                        Магазин кроссовок
                    </p>
                </div>
            </div>
        </router-link>

        <nav class="flex items-center">
        <ul class="flex items-center gap-10">
            <li @click="()=>emit('openDrawer')" class="flex items-center cursor-pointer gap-3 text-slate-500">
                <img src="/cart.svg" alt="Cart">
                <b>{{ totalPrice }} руб.</b>
            </li>

            <router-link to="/favorites">
                <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
                    <img src="/heart.svg" alt="heart">
                    <span>Закладки</span>
                </li>
            </router-link>

            <li class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black">
                <img src="/profile.svg" alt="profile">
                <span>Профиль</span>
            </li>
        </ul>
        </nav>
    </header>
</template>