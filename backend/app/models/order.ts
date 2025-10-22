import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../dbConfig/db";

interface OrderAttributes {
  id: string;
  customer_name: string;
  item: string;
  quantity: number;
  status: "pending" | "completed" | "cancelled";
  created_at: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id" | "status" | "created_at"> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> {}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled"),
      defaultValue: "pending",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: false,
  }
);