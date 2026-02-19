import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreatePostPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPrice(value);
  };

  const handleSave = () => {
    // TODO: 저장 API 연동
    navigate('/profile');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center"
          aria-label="뒤로가기"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.4166 11H4.58325" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.9999 17.4167L4.58325 11L10.9999 4.58334" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={handleSave}
          className="rounded-full px-5 py-1.5 text-sm font-semibold text-white"
          style={{ backgroundColor: '#3C9E00' }}
        >
          저장
        </button>
      </header>

      {/* 본문 */}
      <div className="flex flex-col gap-5 px-6 pt-6">
        {/* 이미지 등록 */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-900">이미지 등록</p>
          <div
            className="relative flex h-52 w-full cursor-pointer items-end justify-end overflow-hidden rounded-xl bg-gray-100"
            onClick={handleImageClick}
          >
            {imagePreview && (
              <img src={imagePreview} alt="상품 이미지" className="h-full w-full object-cover" />
            )}
            <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#767676" strokeWidth="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="#767676"/>
                <path d="M21 15L16 10L5 21" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
          <label className="text-sm font-bold text-gray-900">상품명</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="2~15자 이내여야 합니다."
            className="w-full border-b py-2 text-sm text-gray-900 outline-none placeholder:text-gray-300"
            style={{ borderColor: '#dbdbdb' }}
          />
        </div>

        {/* 가격 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-900">가격</label>
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="숫자만 입력 가능합니다."
            className="w-full border-b py-2 text-sm text-gray-900 outline-none placeholder:text-gray-300"
            style={{ borderColor: '#dbdbdb' }}
          />
        </div>

        {/* 판매 링크 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-900">판매 링크</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="URL을 입력해 주세요."
            className="w-full border-b py-2 text-sm text-gray-900 outline-none placeholder:text-gray-300"
            style={{ borderColor: '#dbdbdb' }}
          />
          <p className="text-xs text-gray-400">선택 사항 (http:// 또는 https://로 시작)</p>
        </div>
      </div>
    </div>
  );
}
