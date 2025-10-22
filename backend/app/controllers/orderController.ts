import { Request, Response } from "express";
import { Order } from "../models/order";

export const getOrders = async (req: Request, res: Response) => {
  try {
  
    const pageParam = req.query.page as string | undefined;
      let page = parseInt(pageParam || "1", 10);
      if (isNaN(page) || page < 1) {
        page = 1; 
      }
    const pageSize = parseInt(req.query.page_size as string) || 10;

    const offset = (page - 1) * pageSize;

    const { rows, count } = await Order.findAndCountAll({
      limit: pageSize,
      offset,
      order: [["created_at", "DESC"]],
    });

    res.json({
      data: rows,
      page,
      pageSize,
      total: count,
      totalPages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pedidos" });
  }
};


export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

    await order.update(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

    await order.destroy();
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pedido" });
  }
};
