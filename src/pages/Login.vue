<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <!-- Tiêu đề -->
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        Đăng nhập
      </h2>

      <!-- Form -->
      <form @submit.prevent="login(username, password)" class="space-y-5">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            v-model="username"
            type="text"
            required
            placeholder="Nhập username"
            class="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Mật khẩu</label
          >
          <input
            v-model="password"
            type="password"
            required
            placeholder="Nhập mật khẩu"
            class="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <!-- Nút login -->
        <button
          type="submit"
          class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition"
        >
          Đăng nhập
        </button>
      </form>

      <!-- Đăng ký -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Chưa có tài khoản?
        <router-link :to="'register'" class="text-blue-500 hover:underline"
          >Đăng ký</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const username = ref("");
const password = ref("");

const { login } = useAuthStore();
</script>
