import mongoose, { Schema, Document } from 'mongoose';

export interface IInventory extends Document {
  product: mongoose.Types.ObjectId;
  productTitle: string;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  reorderQuantity: number;
  lastRestockedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InventorySchema = new Schema<IInventory>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
    productTitle: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, min: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    reorderQuantity: { type: Number, default: 20 },
    lastRestockedAt: { type: Date },
  },
  { timestamps: true }
);

export const Inventory = mongoose.model<IInventory>('Inventory', InventorySchema);
