<template>
  <!--Hiển thị khi loading-->
  <div v-if="loading" class="text-center py-10">
    <ProductDetailSkeleton />
  </div>
  <div v-else-if="error" class="text-center text-red-500 py-10">
    Lỗi: {{ error.message }}
  </div>

  <div
    v-else
    class="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
  >
    <!-- Hình ảnh sản phẩm -->
    <div>
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-[400px] object-contain rounded-lg shadow-md"
      />
      <div class="flex gap-2 mt-4 overflow-x-auto">
        <img
          v-for="(img, i) in product.images"
          :key="i"
          :src="img"
          :alt="`Ảnh ${i}`"
          class="w-24 h-24 object-cover rounded-lg border hover:border-indigo-500 cursor-pointer"
        />
      </div>
    </div>

    <!-- Thông tin sản phẩm -->
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold text-gray-800">{{ product.title }}</h1>

      <!-- Rating -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">{{ product.rating }}</span>
        <StarSolid class="w-5 h-5 text-yellow-500" />
      </div>

      <!-- Giá -->
      <div class="flex items-baseline gap-3">
        <p class="text-3xl font-bold text-amber-600">${{ product.price }}</p>
        <span
          class="text-sm line-through text-gray-400"
          v-if="product.discountPercentage"
        >
          ${{
            (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
          }}
        </span>
        <p
          v-if="product.discountPercentage"
          class="text-sm text-red-500 font-medium"
        >
          -{{ product.discountPercentage }}%
        </p>
      </div>

      <!-- Mô tả -->
      <p class="text-gray-600 leading-relaxed">
        {{ product.description }}
      </p>

      <!-- Brand + Tồn kho -->
      <p class="text-sm text-gray-500">
        <span class="font-medium">Thương hiệu:</span> {{ product.brand }} ·
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

      <!-- Nút hành động -->
      <div class="flex gap-4 mt-4">
        <button
          @click="addToCart(product)"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-medium transition"
        >
          🛒 Thêm vào giỏ
        </button>
        <button
          class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-medium transition"
        >
          Mua ngay
        </button>
      </div>
    </div>
  </div>

  <!-- Đánh giá sản phẩm -->
  <div
    v-if="product.reviews"
    class="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow"
  >
    <h2 class="text-xl font-semibold mb-4">Đánh giá sản phẩm</h2>
    <div
      v-for="(review, index) in product.reviews"
      :key="index"
      class="border-b py-4"
    >
      <div class="flex justify-between items-center">
        <p class="font-medium">{{ review.reviewerName }}</p>
        <div class="flex items-center">
          <span class="text-sm text-gray-600 ml-1">{{ review.rating }}</span>
          <StarSolid class="w-4 h-4 text-yellow-500" />
        </div>
      </div>
      <p class="text-gray-600 text-sm mt-1">{{ review.comment }}</p>
      <p class="text-xs text-gray-400 mt-1">
        {{ new Date(review.date).toLocaleDateString("vi-VN") }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import useFetch from "../components/hooks/useFetch";

// heroicons
import { StarIcon as StarSolid } from "@heroicons/vue/24/solid";
import ProductDetailSkeleton from "../components/skeleton/ProductDetailSkeleton.vue";

const route = useRoute();
const router = useRouter();

//Tạo url để query
const url = computed(() => {
  if (!route.params.id) {
    router.push("/");
    return null;
  }
  return `https://dummyjson.com/products/${route.params.id}`;
});

//Lấy dữ liệu
const { data, loading, error } = useFetch(url);
const product = computed(() => data.value || {});

const addToCart = (product) => {
  console.log("Đã thêm vào giỏ:", product);
};
</script>
