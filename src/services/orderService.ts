// services/orderService.ts
import prisma from "@/lib/prisma";
import { OrderByDayProps } from "@/types/OrderByDayProps";


export const getOrders = async (): Promise<OrderByDayProps> => {
  const orders = await prisma.user.findMany(); // Change 'user' to your model name
  return { data: orders };
};

export const createOrder = async (newOrder: {
  date: string;
  perDay: number;
  perPeriod: number;
}) => {
  const order = await prisma.user.create({
    // Change 'user' to your model name
    data: newOrder,
  });
  return order;
};

export const updateOrder = async (
  date: string,
  updatedOrder: { perDay: number; perPeriod: number }
) => {
  const order = await prisma.user.update({
    // Change 'user' to your model name
    where: { date },
    data: updatedOrder,
  });
  return order;
};

export const deleteOrder = async (date: string) => {
  await prisma.user.delete({
    // Change 'user' to your model name
    where: { date },
  });
};
