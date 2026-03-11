/**
 * 피드 도메인 뷰 모델 타입 (화면 렌더링에 필요한 필드만 포함)
 *
 * 서버에서 받은 Post 엔티티(post.schema.ts)와 달리,
 * UI 렌더링에 실제로 필요한 필드만 포솔린 경량 뷰 모델입니다.
 * `mapPost` 함수(`model/mapPost.ts`)를 통해 Post → PostCardModel로 변환됩니다.
 */
export interface PostCardModel {
  /** 게시글 고유 ID */
  id: string;
  /** 게시글 본문 텍스트 */
  content: string;
  /** 게시글 이미지 URL (없으면 undefined) */
  image?: string;
  /** 현재 로그인 유저의 좋아요 여부 */
  hearted: boolean;
  /** 총 좋아요 수 */
  heartCount: number;
  /** 총 댓글 수 */
  commentCount: number;
  /** 게시글 작성 시각 (ISO 8601) */
  createdAt: string;
  /** 게시글 작성자 정보 */
  author: {
    /** 작성자 이름 */
    username: string;
    /** 작성자 고유 계정명 (@handle) */
    accountname: string;
    /** 작성자 프로필 이미지 URL */
    image?: string;
  };
}
