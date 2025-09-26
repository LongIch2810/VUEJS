<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6"
  >
    <!-- Số 404 lớn -->
    <h1 class="text-9xl font-extrabold text-primary">404</h1>

    <!-- Tiêu đề -->
    <h2 class="mt-4 text-2xl md:text-3xl font-bold text-gray-800">
      Trang bạn tìm không tồn tại
    </h2>

    <!-- Mô tả -->
    <p class="mt-2 text-gray-500 text-center max-w-md">
      Có thể bạn đã nhập sai địa chỉ hoặc trang này đã bị xóa. Hãy quay lại
      trang chủ để tiếp tục mua sắm nhé!
    </p>

    <!-- Nút hành động -->
    <div class="mt-6 flex gap-4">
      <RouterLink
        to="/"
        class="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg shadow"
      >
        🏠 Về trang chủ
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
// dùng RouterLink
import { RouterLink } from "vue-router";
</script>
