<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <!-- Tiêu đề -->
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Đăng ký</h2>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Họ tên -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Họ và tên</label
          >
          <input
            v-model="fullname"
            type="text"
            required
            placeholder="Nhập họ và tên"
            class="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Nhập email"
            class="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <!-- Mật khẩu -->
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

        <!-- Xác nhận mật khẩu -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Xác nhận mật khẩu</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            required
            placeholder="Nhập lại mật khẩu"
            class="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <!-- Nút đăng ký -->
        <button
          type="submit"
          class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition"
        >
          Đăng ký
        </button>
      </form>

      <!-- Chuyển qua login -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Đã có tài khoản?
        <router-link :to="'login'" class="text-blue-500 hover:underline"
          >Đăng nhập</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const fullname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert("Mật khẩu không khớp!");
    return;
  }
  console.log("Fullname:", fullname.value);
  console.log("Email:", email.value);
  console.log("Password:", password.value);
  // TODO: Gọi API register ở đây
}
</script>
