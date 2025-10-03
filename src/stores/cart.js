// stores/cart.js
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axiosInstance from "../axios/axiosInstance";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cart = ref([]);
    const loading = ref(false);
    const err = ref(null);
    const total = computed(() =>
      cart.value.reduce((total, item) => total + item.total * item.quantity, 0)
    );
    const discountedTotal = computed(() =>
      cart.value.reduce(
        (total, item) => total + item.discountedPrice * item.quantity,
        0
      )
    );

    const totalProducts = computed(() => cart.value.length);

    const totalQuantity = computed(() =>
      cart.value.reduce((total, item) => total + item.quantity, 0)
    );

    const addToCart = async ({ userId, products }) => {
      const findIndex = cart.value.findIndex(
        (item) => item.id === products[0].id
      );
      console.log(">>>index : ", findIndex);
      if (findIndex !== -1) {
        cart.value[findIndex].quantity += products[0].quantity;
        return;
      }
      loading.value = true;
      try {
        const res = await axiosInstance.post("/carts/add", {
          userId,
          products,
        });
        cart.value = [...res.data.products, ...cart.value];
      } catch (error) {
        err.value = error.message;
        console.log(error);
      } finally {
        loading.value = false;
      }
    };

    const updateToCart = (product) => {
      if (product.quantity === 0) {
        deleteToCart(product.id);
        return;
      }
      const findIndex = cart.value.findIndex((item) => item.id === product.id);
      if (findIndex !== -1) {
        const updated = {
          ...cart.value[findIndex],
          quantity: product.quantity,
        };
        cart.value.splice(findIndex, 1, updated);
      }
    };

    const deleteToCart = (productId) => {
      const findIndex = cart.value.findIndex((item) => item.id === productId);
      if (findIndex !== -1) {
        cart.value.splice(findIndex, 1);
      }
    };

    return {
      cart,
      loading,
      err,
      total,
      discountedTotal,
      totalProducts,
      totalQuantity,
      addToCart,
      updateToCart,
      deleteToCart,
    };
  },
  {
    persist: true,
  }
);
