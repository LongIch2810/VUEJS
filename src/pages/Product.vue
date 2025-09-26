<template>
  <div class="max-w-2xl mx-auto mt-6 flex gap-2">
    <input
      v-model="search"
      type="text"
      placeholder="Tìm sản phẩm..."
      class="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary border-gray-300"
    />
    <button
      @click="onSearchApi"
      class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 cursor-pointer"
    >
      <MagnifyingGlassIcon class="w-5 h-5" />
    </button>
  </div>
  <!--Hiển thị sản phẩm-->
  <div v-if="products?.length > 0 && !loading">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-10">
      <ProductCard
        v-for="p in products"
        :key="p.id"
        :product="p"
        @add-to-cart="addToCart"
      />
    </div>
    <!--Phân trang-->
    <Paginate
      v-model="page"
      :page-count="totalPages"
      :click-handler="clickHandler"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'flex gap-2 justify-center items-center mt-6'"
      :page-class="'px-3 py-1 border border-gray-500 rounded cursor-pointer'"
      :active-class="'bg-indigo-600 text-white'"
      :prev-class="`px-3 py-1 border rounded ${
        page === 1
          ? 'opacity-50 cursor-not-allowed border-gray-300'
          : 'cursor-pointer border-gray-500'
      }`"
      :next-class="`px-3 py-1 border rounded  ${
        page === totalPages
          ? 'opacity-50 cursor-not-allowed border-gray-300'
          : 'cursor-pointer border-gray-500'
      }`"
    />
  </div>

  <!--Hiển thị sản phẩm khi loading-->
  <div v-if="loading" class="text-center my-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
      <ProductCardSkeleton v-for="i in 9" :key="i" />
    </div>
  </div>

  <!--Hiển thị thông báo lỗi-->
  <div v-if="error" class="text-center text-red-600 my-6">
    Lỗi: {{ error.message }}
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProductCard from "../components/ProductCard.vue";
import useFetch from "../components/hooks/useFetch";
import Paginate from "vuejs-paginate-next";
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton.vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
const route = useRoute();
const router = useRouter();

//Khởi tạo trang
const page = ref(Number(route.query.page) || 1);
const limit = ref(9);

//Khởi tạo tìm kiếm
const search = ref("");
const isSearch = ref(false);

//Tạo url để query
const url = computed(() => {
  if (!route.params.categorySlug) {
    router.push("/");
    return;
  }
  const skip = (page.value - 1) * limit.value;
  return `https://dummyjson.com/products/category/${route.params.categorySlug}?limit=${limit.value}&skip=${skip}`;
});

//Lấy dữ liệu
const { data: dataFetch, loading, error } = useFetch(url);
const dataSearch = ref([]);

//Lấy danh sách sản phẩm
const products = computed(() => {
  if (isSearch.value) {
    const start = (page.value - 1) * limit.value;
    return dataSearch?.value?.products?.slice(start, start + limit.value);
  }
  return dataFetch?.value?.products;
});

//Tính tổng số trang
const totalPages = computed(() => {
  const total = isSearch.value
    ? dataSearch?.value?.total
    : dataFetch?.value?.total;
  return Math.ceil(total / limit.value);
});

//Thêm sản phẩm vào giỏ hàng
const addToCart = (product) => {
  console.log("Thêm vào giỏ:", product);
};

//Xử lý khi click tìm kiếm
const onSearchApi = async () => {
  if (!search.value) {
    return;
  }
  try {
    loading.value = true;
    isSearch.value = true;
    page.value = 1;

    const res = await fetch(
      `https://dummyjson.com/products/search?q=${search.value}`
    );
    const dataRes = await res.json();

    const filtered = dataRes.products.filter(
      (p) => p.category === route.params.categorySlug
    );

    dataSearch.value = {
      products: filtered,
      total: filtered.length,
    };
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

//Xử lý khi click vào trang
const clickHandler = (newPage) => {
  // page.value = newPage;
  router.push({
    name: "products",
    params: { categorySlug: route.params.categorySlug },
    query: { page: newPage },
  });
};

watch(
  () => route.query.page,
  (newPage) => {
    page.value = Number(newPage) || 1;
  }
);

watch(search, (newSearch) => {
  if (!newSearch) {
    isSearch.value = false;
    page.value = 1;
    router.push({
      name: "products",
      params: { categorySlug: route.params.categorySlug },
      query: { page: 1 },
    });
  }
});
</script>
