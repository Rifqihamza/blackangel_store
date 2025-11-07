/*
  Warnings:

  - A unique constraint covering the columns `[shippingId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Order_shippingId_key` ON `Order`(`shippingId`);
