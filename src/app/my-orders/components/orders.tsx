"use client";

import CartSummary from "@/app/cart/components/cart-summary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { orderTable } from "@/db/schema";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      quantity: number;
      priceInCents: number;
    }>;
  }>;
}

export function Orders({ orders }: OrdersProps) {
  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <Accordion type="single" collapsible key={order.id}>
              <AccordionItem value="q" key={order.id}>
                <AccordionTrigger>
                  <div className="flex flex-col gap-1">
                    {order.status === "paid" && <Badge>Pago</Badge>}
                    {order.status === "pending" && (
                      <Badge variant="outline">Pagamento pendente</Badge>
                    )}
                    {order.status === "canceled" && (
                      <Badge variant="destructive">Cancelado</Badge>
                    )}
                    <p>
                      Pedido feito em{" "}
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")} às{" "}
                      {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CartSummary
                    subtotalInCents={order.totalPriceInCents / 100}
                    totalInCents={order.totalPriceInCents / 100}
                    products={order.items.map((item) => ({
                      id: item.id,
                      imageUrl: item.imageUrl,
                      name: item.productName,
                      variantName: item.productVariantName,
                      quantity: item.quantity,
                      priceInCents: item.priceInCents,
                    }))}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
