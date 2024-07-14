<script setup>
import DrawerHead from './DrawerHead.vue';
import CartItemList from './CartItemList.vue';
import { computed } from 'vue';
import InfoBlock from './infoBlock.vue';

const emit = defineEmits(['createOrder'])

defineProps({
    totalPrice:Number,
    varPrice:Number,
    isCreatingOrder: Boolean,
})

// const buttonDisabled = computed(()=> props.isCreatingOrder ? true : props.totalPrice ? false : true) 
</script>

<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
    <div class="bg-white w-96 h-full fixed  right-0 top-0 z-20 p-8">
        <DrawerHead/>

        <div v-if="!totalPrice" class="flex h-full items-center">
            <InfoBlock 
                title="Корзина пустая" 
                description="Добавьте хотябы одну пару кроссовок, чтобы сделать заказ." 
                image-url="/package-icon.png"
            />
        </div>

        <div v-else>
            <CartItemList v-if="totalPrice"/>

            <div v-if="totalPrice" class="flex flex-col gap-4 mt-7 ">
                <div class="flex gap-2 ">
                    <span>
                        Итого:
                    </span>
                    <div class="flex-1 border-b border-dashed mb-1"></div>
                    <b>
                        {{ totalPrice }} руб.
                    </b>
                </div>

                <div class="flex gap-2 ">
                    <span>
                        Налог 5%:
                    </span>
                    <div class="flex-1 border-b border-dashed mb-1"></div>
                    <b>
                        {{ varPrice }} руб.
                    </b>
                </div>

            </div>

            <button
                :disabled="totalPrice ? false : true"
                @click="()=>emit('createOrder')"
                class="bg-lime-500 w-full mt-4 cursor-pointer rounded-xl py-3 text-white disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-700"
            >
                Оформить заказ
            </button>
            
        </div>
    </div>
</template>