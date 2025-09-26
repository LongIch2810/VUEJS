<script setup>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header cố định -->
    <Header />

    <!-- Nội dung từng page (Home, Products, Cart, ...) -->
    <main class="flex-1 container mx-auto pt-16">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>
