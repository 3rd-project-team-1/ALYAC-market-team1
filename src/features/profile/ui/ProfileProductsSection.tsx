import { useNavigate, useParams } from 'react-router-dom';

import { useUserProducts } from '@/entities/product/hooks/useUserProducts';
import { getTokenUserInfo } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';

export function ProfileProductsSection() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? null;
  const targetAccountname = accountname ?? myAccountname;

  const { products } = useUserProducts(targetAccountname);

  if (!products || products.length === 0) return null;

  return (
    <section className="border-border border-t px-4 py-4">
      <h2 className="text-foreground mb-3 text-sm font-semibold">판매 중인 상품</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate(`/edit-product/${product.id}`, { state: { product } })}
          >
            <div className="bg-muted h-[90px] w-[90px] overflow-hidden rounded-xl">
              <img
                src={getImageUrl(product.itemImage) ?? product.itemImage}
                alt={product.itemName}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-foreground mt-1 max-w-[90px] truncate text-xs font-medium">
              {product.itemName}
            </p>
            <p className="text-xs text-[#3C9E00]">{product.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </section>
  );
}
