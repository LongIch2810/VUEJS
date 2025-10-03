<template>
  <div class="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
    <!-- Tiêu đề -->
    <h2 class="text-2xl font-bold text-gray-800 mb-6">🛒 Giỏ hàng của bạn</h2>

    <!-- Nếu giỏ hàng rỗng -->
    <div v-if="!cart.length" class="text-gray-500 italic text-center py-10">
      Giỏ hàng trống...
    </div>

    <!-- Danh sách sản phẩm -->
    <div v-else class="overflow-x-auto">
      <table
        class="w-full border-collapse rounded-lg overflow-hidden shadow-sm"
      >
        <thead>
          <tr class="bg-gray-100 text-gray-700 text-left text-sm uppercase">
            <th class="p-4">Sản phẩm</th>
            <th class="p-4 text-center">Giá gốc</th>
            <th class="p-4 text-center">Giảm</th>
            <th class="p-4 text-center">Số lượng</th>
            <th class="p-4 text-center">Thành tiền</th>
            <th class="p-4 text-center">Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in cart"
            :key="item.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <!-- Sản phẩm -->
            <td class="p-4 flex items-center gap-4">
              <img
                :src="item.thumbnail"
                :alt="item.title"
                class="w-20 h-20 object-cover rounded-lg shadow"
              />
              <span class="font-medium text-gray-800">{{ item.title }}</span>
            </td>

            <!-- Giá gốc -->
            <td class="p-4 text-center text-gray-500 line-through">
              ${{ item.price }}
            </td>

            <!-- Giảm -->
            <td class="p-4 text-center text-green-600 font-medium">
              {{ item.discountPercentage }}%
            </td>

            <!-- Số lượng -->
            <td class="p-4 text-center">
              <div class="flex items-center justify-center gap-2">
                <button
                  class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  @click="
                    updateToCart({
                      id: item.id,
                      quantity: --item.quantity,
                    })
                  "
                >
                  -
                </button>
                <span class="px-3 py-1 border rounded bg-gray-100">
                  {{ item.quantity }}
                </span>
                <button
                  class="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  @click="
                    updateToCart({
                      id: item.id,
                      quantity: ++item.quantity,
                    })
                  "
                >
                  +
                </button>
              </div>
            </td>

            <!-- Thành tiền -->
            <td class="p-4 text-center font-bold text-amber-600">
              ${{ item.discountedPrice }}
            </td>

            <!-- Xóa -->
            <td class="p-4 text-center">
              <button
                class="text-red-500 hover:text-red-700 font-semibold"
                @click="deleteToCart(item.id)"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tổng kết giỏ hàng -->
    <div
      v-if="cart.length"
      class="mt-8 bg-gray-50 p-6 rounded-xl border shadow-inner"
    >
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Tóm tắt đơn hàng</h3>
      <div class="grid grid-cols-2 gap-4 text-gray-700">
        <p>
          Tổng sản phẩm: <strong>{{ totalProducts }}</strong>
        </p>
        <p>
          Tổng số lượng: <strong>{{ totalQuantity }}</strong>
        </p>
        <p>
          Tiền chưa giảm giá: <strong>${{ total.toFixed(2) }}</strong>
        </p>
        <p>
          Tiền đã giảm giá:
          <strong class="text-green-600"
            >${{ discountedTotal.toFixed(2) }}</strong
          >
        </p>
      </div>

      <!-- Thành tiền -->
      <div class="mt-6 border-t pt-4 flex justify-between items-center">
        <span class="text-xl font-semibold text-gray-800">Thành tiền:</span>
        <span class="text-2xl font-bold text-amber-600">
          ${{ discountedTotal }}
        </span>
      </div>

      <div class="mt-6">
        <button
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Thanh toán
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cart";
import { TrashIcon } from "@heroicons/vue/24/solid";

const cartStore = useCartStore();
const { cart, total, discountedTotal, totalProducts, totalQuantity } =
  storeToRefs(cartStore);

const { updateToCart, deleteToCart } = cartStore;
</script>
