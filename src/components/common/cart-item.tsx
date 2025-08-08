import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}
export function CartItem(props: CartItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={props.productVariantUrl}
          alt={props.productName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">{props.productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {props.productVariantName}
          </p>

          <div className="flex w-24 items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              variant={"ghost"}
              size={"icon"}
              onClick={() => {}}
            >
              <MinusIcon />
            </Button>
            <p className="text-xs font-medium">{props.quantity}</p>
            <Button
              className="h-4 w-4"
              variant={"ghost"}
              size={"icon"}
              onClick={() => {}}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-1">
        <Button variant={"outline"} size={"icon"}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(props.productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
}
