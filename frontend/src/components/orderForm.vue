<script lang="ts">
import { defineComponent, reactive } from 'vue';
import type { Order} from "../service/orderApi";
import {createOrder} from "../service/orderApi";
import { useRouter } from 'vue-router';

export default defineComponent({

  name: 'OrderForm',
  setup() {
    const router = useRouter();
    const Back = ()=>{
      router.push({
        name: 'OrderViews',
      });
    }
    const orderForm = reactive<Omit<Order, "id" | "created_at">>({
      customer_name: '',
      item: '',
      quantity: 1,
      status: 'pending'
    });

    const submitOrder = async () => {
      try {
        const data = await createOrder(orderForm);
        
        console.log('Orden creada:', data);

        orderForm.customer_name = '';
        orderForm.item = '';
        orderForm.quantity = 1;
        orderForm.status = 'pending';
      } catch (error) {
        console.error('Error al crear la orden:', error);
      }
    };
    
    return {
      orderForm,
      submitOrder,
      Back
    };
  }
});
</script>

<template>
  <div class="order-form">
    <h2>Create Order</h2>
    <form @submit.prevent="submitOrder">
      <div>
        <label>Customer Name:</label>
        <input v-model="orderForm.customer_name" type="text" required />
      </div>
      <div>
        <label>Item:</label>
        <input v-model="orderForm.item" type="text" required />
      </div>
      <div>
        <label>Quantity:</label>
        <input v-model.number="orderForm.quantity" type="number" min="1" />
      </div>
      <div>
        <label>State:</label>
        <select v-model="orderForm.status">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <button type="submit">Create</button>
      <button @click='Back'>Back</button>
    </form>
  </div>
</template>

<style scoped>
.order-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.order-form div {
  margin-bottom: 12px;
}
.order-form label {
  display: block;
  margin-bottom: 4px;
}
.order-form input,
.order-form select {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}
button {
  padding: 8px 12px;
}
</style>
