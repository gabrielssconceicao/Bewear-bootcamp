"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {}
export function QuantitySelector({}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
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
  );
}
