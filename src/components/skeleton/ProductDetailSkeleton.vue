<template>
  <div
    class="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 animate-pulse"
  >
    <!-- Hình ảnh sản phẩm -->
    <div>
      <div class="w-full h-[400px] bg-gray-200 rounded-lg mb-4"></div>
      <div class="flex gap-2 mt-4">
        <div
          v-for="i in 4"
          :key="i"
          class="w-24 h-24 bg-gray-200 rounded-lg"
        ></div>
      </div>
    </div>

    <!-- Thông tin sản phẩm -->
    <div class="flex flex-col gap-4">
      <div class="h-8 bg-gray-200 rounded w-2/3"></div>

      <!-- Rating -->
      <div class="flex items-center gap-2">
        <div class="h-4 w-12 bg-gray-200 rounded"></div>
        <div class="h-5 w-5 bg-gray-200 rounded-full"></div>
      </div>

      <!-- Giá -->
      <div class="flex gap-3">
        <div class="h-7 w-24 bg-gray-200 rounded"></div>
        <div class="h-5 w-16 bg-gray-200 rounded"></div>
        <div class="h-5 w-12 bg-gray-200 rounded"></div>
      </div>

      <!-- Mô tả -->
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      <div class="h-4 bg-gray-200 rounded w-4/6"></div>

      <!-- Brand + trạng thái -->
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>

      <!-- Buttons -->
      <div class="flex gap-4 mt-4">
        <div class="flex-1 h-12 bg-gray-200 rounded-lg"></div>
        <div class="flex-1 h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>

  <!-- Reviews giả -->
  <div
    class="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow animate-pulse"
  >
    <div class="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div v-for="i in 3" :key="i" class="border-b py-4">
      <div class="flex justify-between items-center mb-2">
        <div class="h-4 w-24 bg-gray-200 rounded"></div>
        <div class="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
      <div class="h-4 w-full bg-gray-200 rounded mb-1"></div>
      <div class="h-3 w-1/3 bg-gray-200 rounded"></div>
    </div>
  </div>
</template>
