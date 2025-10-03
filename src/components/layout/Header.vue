<template>
  <header
    class="bg-primary text-white shadow fixed top-0 left-0 right-0 w-full z-50"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <HeaderItem name="MyShop" link="/" />

        <!-- Menu links (Desktop) -->
        <div class="hidden lg:flex space-x-6 items-center">
          <!-- Products with dropdown -->
          <div class="hidden lg:block relative group">
            <Button class="flex items-center gap-1 hover:text-indigo-400 group">
              Products
              <template #icon>
                <ChevronDownIcon
                  class="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
                />
              </template>
            </Button>
            <div
              class="absolute left-0 top-8 mt-2 w-44 bg-primary rounded-lg shadow-lg group-hover:block hidden animate-fade-down animate-duration-500 max-h-[400px] overflow-y-auto scrollbar-default"
            >
              <HeaderItem
                v-for="cat in categories"
                :key="cat"
                :name="cat.name"
                :link="`/products/category/${cat.slug}?page=1`"
              />
            </div>
          </div>

          <HeaderItem name="About" link="/about" />
          <HeaderItem name="Contact" link="/contact" />
          <HeaderItem name="FAQ" link="/faq" />
        </div>

        <div class="flex space-x-6 items-center">
          <!-- Cart -->
          <div class="relative">
            <HeaderItem link="/cart" :isIcon="true">
              <template #icon>
                <ShoppingCartIcon class="w-5 h-5" />
              </template>
            </HeaderItem>
            <div
              class="absolute top-0 right-0 w-4 h-4 bg-white text-black flex items-center justify-center rounded-full"
            >
              <span>{{ totalProducts || 0 }}</span>
            </div>
          </div>

          <!-- Profile -->
          <div v-if="isLogged" class="relative group">
            <Button class="flex items-center gap-1 hover:text-indigo-400 group">
              <template #icon>
                <UserIcon class="w-5 h-5" />
              </template>
            </Button>
            <div
              class="absolute left-0 top-6 mt-2 w-32 bg-primary rounded-lg shadow-lg group-hover:block hidden animate-fade-down animate-duration-500 max-h-[500px] overflow-y-auto scrollbar-default"
            >
              <HeaderItem name="Profile" link="/profile" />
              <Button class="hover:text-indigo-400" @click="logout">
                Logout
                <template #icon>
                  <ArrowRightOnRectangleIcon class="w-5 h-5" />
                </template>
              </Button>
            </div>
          </div>

          <HeaderItem
            v-else
            class="bg-white text-primary py-1 px-3 rounded-md flex justify-center items-center"
            link="/login"
            :isIcon="true"
            :name="'Login'"
          >
          </HeaderItem>
        </div>

        <!-- Mobile menu button -->
        <Button class="lg:hidden" @click="toggleMenu">
          <template #icon>
            <Bars3Icon class="w-6 h-6" />
          </template>
        </Button>
      </div>
    </nav>

    <!-- Mobile menu with animation -->
    <transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-500"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-to-class="opacity-0"
    >
      <div
        v-show="open"
        class="lg:hidden bg-gray-800 px-4 py-2 space-y-2 max-h-[80vh] overflow-y-auto"
      >
        <HeaderItem name="Home" link="/" />

        <!-- Products collapsible -->

        <div
          class="w-full flex justify-between items-center font-semibold hover:text-indigo-400 p-2"
          @click="toggleProducts"
        >
          <span>Products</span>
          <ChevronDownIcon
            class="w-4 h-4 transition-transform duration-300"
            :class="{ 'rotate-180': openProducts }"
          />
        </div>
        <transition
          enter-from-class="opacity-0"
          enter-active-class="transition-opacity duration-500"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-active-class="transition-opacity duration-300"
          leave-to-class="opacity-0"
        >
          <div v-show="openProducts" class="pl-4 mt-1 space-y-1">
            <HeaderItem
              v-for="cat in categories"
              :key="cat"
              :link="`/products/category/${cat.slug}?page=1`"
              :name="cat.name"
              @click="closeMenu"
            />
          </div>
        </transition>
        <HeaderItem name="About" link="/about" />
        <HeaderItem name="Contact" link="/contact" />
        <HeaderItem name="FAQ" link="/faq" />
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

// Heroicons
import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import HeaderItem from "../HeaderItem.vue";
import Button from "../Button.vue";
import { useAuthStore } from "../../stores/auth";
import { useCartStore } from "../../stores/cart";

const open = ref(false);
const openProducts = ref(false);
const categories = ref([]);
const { totalProducts } = useCartStore();
const { isLogged, logout } = useAuthStore();

const toggleMenu = () => (open.value = !open.value);
const closeMenu = () => {
  open.value = false;
  openProducts.value = false;
};
const toggleProducts = () => (openProducts.value = !openProducts.value);

onMounted(async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products/categories");
    categories.value = res.data;
  } catch (err) {
    console.error("Lỗi load categories:", err);
  }
});
</script>
