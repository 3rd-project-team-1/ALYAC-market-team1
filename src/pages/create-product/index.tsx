import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import imageIcon from '@/shared/assets/icons/image.svg';
import { useImageUpload } from '@/shared/hooks/useImageUpload';

type FormValues = {
  productName: string;
  price: string;
  link: string;
};

export function CreateProductPage() {
  const navigate = useNavigate();

  const { fileInputRef, imagePreview, handleImageClick, handleImageChange } = useImageUpload();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { productName: '', price: '', link: '' },
  });

  // 가격 입력 핸들러 - 숫자 외 문자 차단
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (/[^0-9]/.test(raw)) {
      // 숫자 외 문자가 있으면 에러 표시 + 숫자만 남김
      setError('price', { type: 'manual', message: '숫자만 입력 가능합니다.' });
      setValue('price', raw.replace(/[^0-9]/g, ''));
    } else {
      clearErrors('price');
      setValue('price', raw);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // TODO: 저장 API 연동
    navigate('/profile');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 본문 */}
        <div className="flex flex-col gap-5 px-6 pt-6">
          {/* 이미지 등록 */}
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">이미지 등록</p>
            <div
              className="relative flex h-52 w-full cursor-pointer items-end justify-end overflow-hidden rounded-xl bg-muted"
              onClick={handleImageClick}
            >
              {imagePreview && (
                <img src={imagePreview} alt="상품 이미지" className="h-full w-full object-cover" />
              )}
              <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background shadow transition-shadow hover:shadow-md">
                <img src={imageIcon} alt="이미지 등록" width={20} height={20} />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* 상품명 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-foreground">상품명</label>
            <input
              {...register('productName', {
                required: '상품명을 입력해주세요.',
                minLength: { value: 2, message: '상품명은 최소 2자 이상이어야 합니다.' },
                maxLength: { value: 15, message: '상품명은 15자 이하여야 합니다.' },
              })}
              placeholder="2~15자 이내여야 합니다."
              className={`w-full border-b py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground ${errors.productName ? 'border-destructive' : 'border-border'}`}
            />
            {errors.productName && (
              <p className="text-xs text-destructive">{errors.productName.message}</p>
            )}
          </div>

          {/* 가격 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-foreground">가격</label>
            <input
              {...register('price')}
              placeholder="숫자만 입력 가능합니다."
              inputMode="numeric"
              onChange={handlePriceChange}
              className={`w-full border-b py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground ${errors.price ? 'border-destructive' : 'border-border'}`}
            />
            {errors.price && (
              <p className="text-xs text-destructive">{errors.price.message}</p>
            )}
          </div>

          {/* 판매 링크 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-foreground">판매 링크</label>
            <input
              {...register('link', {
                pattern: {
                  value: /^(https?:\/\/).*/,
                  message: 'http:// 또는 https://로 시작해야 합니다.',
                },
              })}
              type="url"
              placeholder="URL을 입력해 주세요."
              className={`w-full border-b py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground ${errors.link ? 'border-destructive' : 'border-border'}`}
            />
            {errors.link ? (
              <p className="text-xs text-destructive">{errors.link.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground">선택 사항 (http:// 또는 https://로 시작)</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
