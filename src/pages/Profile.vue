<template>
  <div class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
    <!-- Avatar -->
    <div class="flex flex-col items-center">
      <img
        v-if="user?.image"
        :src="user?.image"
        alt="avatar"
        class="w-24 h-24 rounded-full shadow-md border"
      />
      <UserCircleIcon v-else class="w-24 h-24 text-gray-400" />

      <h2 class="mt-4 text-2xl font-bold">
        {{ user?.firstName }} {{ user?.lastName }}
      </h2>
      <p class="text-gray-500">@{{ user?.username }}</p>
    </div>

    <!-- Info -->
    <div class="mt-6 space-y-3">
      <div class="flex items-center gap-2 text-gray-700">
        <EnvelopeIcon class="w-5 h-5 text-gray-500" />
        <span>{{ user?.email }}</span>
      </div>
      <div class="flex items-center gap-2 text-gray-700 capitalize">
        <UserIcon class="w-5 h-5 text-gray-500" />
        <span>{{ user?.username }}</span>
      </div>
      <div class="flex items-center gap-2 text-gray-700 capitalize">
        <UserCircleIcon class="w-5 h-5 text-gray-500" />
        <span>{{ user?.gender }}</span>
      </div>
      <div class="flex items-center gap-2 text-gray-700">
        <IdentificationIcon class="w-5 h-5 text-gray-500" />
        <span>ID: {{ user?.id }}</span>
      </div>
    </div>

    <!-- Action -->
    <div class="mt-6 flex justify-between">
      <RouterLink
        to="/settings"
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <UserIcon class="w-5 h-5" />
        Edit Profile
      </RouterLink>

      <button
        @click="logout"
        class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        <ArrowRightOnRectangleIcon class="w-5 h-5" />
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  EnvelopeIcon,
  UserIcon,
  IdentificationIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const user = authStore.user;

const logout = () => {
  authStore.logout();
};
</script>
