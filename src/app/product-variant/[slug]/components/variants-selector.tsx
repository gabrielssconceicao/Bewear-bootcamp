import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  variants: (typeof productVariantTable.$inferSelect)[];
  selectedVariant: string;
}
export function VariantSelector({
  variants,
  selectedVariant,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          key={variant.id}
          href={`/product-variant/${variant.slug}`}
          className={
            variant.slug === selectedVariant
              ? "border-primary rounded-xl border-2"
              : ""
          }
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={60}
            height={60}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
}
