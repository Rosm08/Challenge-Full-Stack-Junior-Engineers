<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import type { Order } from "../service/orderApi";
import { getOrders } from "../service/orderApi";

export default defineComponent({
  name: "OrderList",
  setup() {
    const orders = ref<Order[]>([]);
    const loading = ref(true);
    const page = ref(1);

    const router = useRouter();

    const fetchOrders = async () => {
      loading.value = true;
      const { data } = await getOrders(page.value);
      orders.value = data;
      loading.value = false;
    };

    onMounted(fetchOrders);

    const nextPage = () => { page.value++; fetchOrders(); };
    const prevPage = () => { if (page.value > 1) { page.value--; fetchOrders(); } };

    const goToUpdate = (order: Order) => {
      router.push({
        name: 'order-view',
        params: { id: order.id },
        query: {
          customer_name: order.customer_name,
          item: order.item,
          quantity: order.quantity.toString(),
          status: order.status
        }
      });
    };

    const goCreateOrder = ()=>{

      router.push({
        name: 'order-create',
      });

    }

    return { orders, loading, page, nextPage, prevPage, goToUpdate, goCreateOrder };
  }
});
</script>

<template>
<div class="p-6 bg-black rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold text-gray-800 mb-4">order list</h2>

  <div v-if="loading" class="text-gray-500">loading...</div>

  <div v-else>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-gray-700 font-medium">ID</th>
            <th class="px-4 py-2 text-left text-gray-700 font-medium">Customer Name</th>
            <th class="px-4 py-2 text-left text-gray-700 font-medium">Item</th>
            <th class="px-4 py-2 text-left text-gray-700 font-medium">Quantity</th>
            <th class="px-4 py-2 text-left text-gray-700 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" 
              :key="order.id" 
              class="hover:bg-gray-50 cursor-pointer transition-colors">
            <td class="px-4 py-2 border-t border-gray-200">{{ order.id }}</td>
            <td class="px-4 py-2 border-t border-gray-200">{{ order.customer_name }}</td>
            <td class="px-4 py-2 border-t border-gray-200">{{ order.item }}</td>
            <td class="px-4 py-2 border-t border-gray-200">{{ order.quantity }}</td>
            <td class="px-4 py-2 border-t border-gray-200">
              <span :class="{
                'text-green-600 font-semibold': order.status === 'completed',
                'text-yellow-600 font-semibold': order.status === 'pending',
                'text-red-600 font-semibold': order.status === 'cancelled'
              }">{{ order.status }}</span>
            </td>
            <td>
              <button  @click="goToUpdate(order)">view</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex justify-end gap-2">
      <button 
        @click="prevPage" 
        :disabled="page === 1"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition">
        Prev
      </button>
      <button 
        @click="nextPage"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Next
      </button>

      <button 
        @click="goCreateOrder"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Create Order
      </button>
    </div>
  </div>
</div>

</template>