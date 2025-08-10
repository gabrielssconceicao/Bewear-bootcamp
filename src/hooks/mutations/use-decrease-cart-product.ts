import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductQuantity } from "@/actions/drecrease-cart-quantity";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getDecreaseCartProductQueryKey = (cartItemId: string) =>
  ["decrease-cart-product", cartItemId] as const;

export const useDecreaseCartProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDecreaseCartProductQueryKey(cartItemId),
    mutationFn: () =>
      decreaseCartProductQuantity({
        cartItemId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
