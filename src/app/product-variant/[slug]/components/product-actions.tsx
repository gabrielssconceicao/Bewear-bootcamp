"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { AddToCartButton } from "./add-to-cart-button";

interface ProductActionsProps {
  productVariant: string;
}

export function ProductActions({ productVariant }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
      <div className="px-5">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-24 items-center justify-between rounded-lg border">
            <Button variant={"ghost"} size={"icon"} onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button variant={"ghost"} size={"icon"} onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 px-5">
        <AddToCartButton
          productVariantId={productVariant}
          quantity={quantity}
        />
        <Button className="rounded-full font-semibold" size={"lg"}>
          Comprar Agora
        </Button>
      </div>
    </>
  );
}
