/**
 * 폼 유효성 검사 규칙 (Validation Rules)
 * 상품 등록/수정 폼에서 사용하는 검증 규칙 정의
 */

export const validationRules = {
  // 상품명
  productName: {
    required: '상품명을 입력해주세요.',
    minLength: { value: 2, message: '상품명은 최소 2자 이상이어야 합니다.' },
    maxLength: { value: 15, message: '상품명은 15자 이하여야 합니다.' },
  },

  // 가격
  price: {
    required: '가격을 입력해주세요.',
    min: { value: 1, message: '가격은 1원 이상이어야 합니다.' },
  },

  // 판매 링크
  link: {
    pattern: {
      value: /^(https?:\/\/).*/,
      message: 'http:// 또는 https://로 시작해야 합니다.',
    },
  },

  // 사용자 이름
  username: {
    required: '사용자 이름을 입력해주세요.',
    minLength: { value: 2, message: '2자 이상 입력해주세요.' },
    maxLength: { value: 10, message: '10자 이하로 입력해주세요.' },
  },

  // 프로필 소개
  intro: {
    maxLength: { value: 80, message: '80자 이하로 입력해주세요.' },
  },

  // 게시글 내용
  content: {
    required: true,
  },
};

/**
 * 에러 메시지 매핑
 * 필드명 → 에러 메시지
 */
export const fieldLabels: Record<string, string> = {
  productName: '상품명',
  price: '가격',
  link: '판매 링크',
  username: '사용자 이름',
  intro: '프로필 소개',
  content: '게시글 내용',
};
