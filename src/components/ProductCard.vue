<template>
  <div
    class="group relative border border-gray-300 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition bg-white flex flex-col"
  >
    <!-- Badge giảm giá -->
    <span
      v-if="product.discountPercentage"
      class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow"
    >
      -{{ product.discountPercentage }}%
    </span>

    <!-- Ảnh sản phẩm -->
    <div class="relative overflow-hidden">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <!-- Nội dung -->
    <div class="p-4 flex flex-col gap-2 flex-1">
      <!-- Tên sản phẩm -->
      <h3
        class="font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition"
      >
        {{ product.title }}
      </h3>

      <!-- Brand + Tình trạng -->
      <p class="text-sm text-gray-500">
        {{ product.brand }} ·
        <span
          :class="
            product.availabilityStatus === 'In Stock'
              ? 'text-green-600 font-medium'
              : 'text-red-600 font-medium'
          "
        >
          {{ product.availabilityStatus }}
        </span>
      </p>

      <!-- Mô tả ngắn -->
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Giá -->
      <div class="flex items-baseline gap-2 mt-2">
        <span class="text-xl font-bold text-amber-600">
          ${{ product.price }}
        </span>
        <span
          class="text-sm line-through text-gray-400"
          v-if="product.discountPercentage"
        >
          ${{
            (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
          }}
        </span>
      </div>

      <!-- Rating -->
      <div class="flex items-center gap-1 text-yellow-400 mt-1">
        <span class="text-sm text-gray-600 ml-1">{{ product.rating }}</span>
        <StarIcon class="w-4 h-4" />
      </div>

      <!-- Action buttons -->
      <div class="mt-auto flex gap-2 pt-3">
        <RouterLink
          :to="{ name: 'productDetail', params: { id: product.id } }"
          class="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
        >
          Chi tiết
        </RouterLink>
        <button
          @click="$emit('add-to-cart', product)"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          Thêm giỏ hàng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";
defineProps({
  product: {
    type: Object,
    required: true,
    validator: (p) => "id" in p,
  },
});
defineEmits(["add-to-cart"]);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
