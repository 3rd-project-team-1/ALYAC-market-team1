// 피드 도메인 뷰 모델 타입 (화면 렌더링에 필요한 필드만 포함)
export interface PostCardModel {
  id: string;
  content: string;
  image?: string;
  hearted: boolean;
  heartCount: number;
  commentCount: number;
  createdAt: string;
  author: {
    username: string;
    accountname: string;
    image?: string;
  };
}
