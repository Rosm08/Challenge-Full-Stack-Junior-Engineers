<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
import type { Order } from "../service/orderApi";
import { updateOrder, deleteOrder } from "../service/orderApi";

const route = useRoute();
const router = useRouter();
const orderId = route.params.id as string;

const orderForm = reactive<Omit<Order, "id" | "created_at">>({
  customer_name: (route.query.customer_name as string) || "",
  item: (route.query.item as string) || "",
  quantity: Number(route.query.quantity) || 1,
  status:
    (route.query.status as "pending" | "completed" | "cancelled") || "pending",
});

const submitUpdate = async () => {
  try {
    const data = await updateOrder(orderId, orderForm);
    console.log("Orden actualizada:", data);
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
  }
};

const submitDelete = async () => {
  try {
    const data = await deleteOrder(orderId);
    console.log("Orden eliminada:", data);
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
  }
};

const Back = ()=>{
  router.push({
        name: 'OrderViews',
      });
}
</script>

<template>
  <div class="order-update-container">
    <h2>Order</h2>

    <form @submit.prevent="submitUpdate" class="order-form">
      <div class="form-group">
        <label>Customer:</label>
        <input v-model="orderForm.customer_name" type="text" required />
      </div>

      <div class="form-group">
        <label>Item:</label>
        <input v-model="orderForm.item" type="text" required />
      </div>

      <div class="form-group">
        <label>Quantity:</label>
        <input v-model.number="orderForm.quantity" type="number" min="1" />
      </div>

      <div class="form-group">
        <label>State:</label>
        <select v-model="orderForm.status">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div class="button-group">
        <button  class="btn update">Update</button>
        <button  class="btn delete" @click="submitDelete">
          Delete
        </button>
        <button   @click="Back">
          Back
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.order-update-container {
  max-width: 480px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: #4d4c4c;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #f5f5f5;
}

.order-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #ffffff;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  outline: none;
  transition: border 0.2s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #2b8a3e;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn {
  flex: 1;
  padding: 10px 0;
  margin: 0 4px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.25s ease;
}

.btn.update {
  background-color: #2b8a3e;
  color: white;
}

.btn.update:hover {
  background-color: #1e6b2f;
}

.btn.delete {
  background-color: #c92a2a;
  color: white;
}

.btn.delete:hover {
  background-color: #a51111;
}
</style>
