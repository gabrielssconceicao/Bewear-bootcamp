import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { removeProductFromCart } from "@/actions/remove-cart-product";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}
export function CartItem(props: CartItemProps) {
  const queryClient = useQueryClient();
  const removeProductFromCartMutation = useMutation({
    mutationKey: ["removeProductFromCart"],
    mutationFn: () =>
      removeProductFromCart({
        cartItemId: props.id,
      }),
  });

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success("Produto removido do carrinho");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho");
      },
    });
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={props.productVariantImageUrl}
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
        <Button variant={"outline"} size={"icon"} onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(props.productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
}
