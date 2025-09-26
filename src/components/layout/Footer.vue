<template>
  <footer class="bg-gray-900 text-gray-300 py-10 mt-10 w-full">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      <!-- Cột 1: Logo + mô tả -->
      <div>
        <h2 class="text-2xl font-bold text-white">MyShop</h2>
        <p class="mt-3 text-sm text-gray-400">
          MyShop là nơi bạn có thể tìm thấy mọi sản phẩm từ công nghệ, thời
          trang đến đồ gia dụng.
        </p>
      </div>

      <!-- Cột 2: Liên kết nhanh -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">Liên kết</h3>
        <ul class="space-y-2">
          <li>
            <router-link to="/" class="hover:text-indigo-400">Home</router-link>
          </li>
          <li>
            <router-link to="/products" class="hover:text-indigo-400"
              >About</router-link
            >
          </li>
          <li>
            <router-link to="/cart" class="hover:text-indigo-400"
              >Contact</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Cột 3: Liên hệ -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">Liên hệ</h3>
        <ul class="space-y-2 text-sm">
          <li>Email: support@myshop.com</li>
          <li>Điện thoại: 0123 456 789</li>
          <li>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</li>
        </ul>
      </div>
    </div>

    <!-- Dòng dưới cùng -->
    <div
      class="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500"
    >
      © 2025 MyShop. All rights reserved.
    </div>
  </footer>
</template>
