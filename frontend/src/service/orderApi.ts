import axios from "axios";

export interface Order {
  id: string;
  customer_name: string;
  item: string;
  quantity: number;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
}


export const getOrders = async (page = 1, page_size = 5) => {
  const { data } = await axios.get(`http://localhost:8000/orders/?page=${page}&page_size=${page_size}`);
  console.log("data => ", data)
  return data;
};

export const createOrder = async (order: Omit<Order, "id" | "created_at">) => {
  const { data } = await axios.post('http://localhost:8000/orders/', order);
  return data;
};


export const updateOrder = async ( id: string, updates: Partial<Omit<Order, "id" | "created_at">>) => {
  const { data } = await axios.put(`http://localhost:8000/orders/${id}`, updates);
  return data;
};

export const deleteOrder = async ( id: string) => {
  const { data } = await axios.delete(`http://localhost:8000/orders/${id}`);
  return data;
};