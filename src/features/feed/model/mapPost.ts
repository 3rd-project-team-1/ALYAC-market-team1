import type { Post } from '@/entities/post/model/post.schema';

import type { PostCardModel } from './types';

/**
 * API 응답 Post 엔티티를 UI 렌더링에 필요한 PostCardModel로 변환합니다.
 * 빈 문자열 이미지는 undefined로 정규화하여 img 태그의 불필요한 렌더링을 방지합니다.
 */
export function mapPost(post: Post): PostCardModel {
  return {
    id: post.id,
    content: post.content,
    image: post.image?.trim() || undefined,
    hearted: post.hearted,
    heartCount: post.heartCount,
    commentCount: post.commentCount,
    createdAt: post.createdAt,
    isfollow: post.author.isfollow,
    author: {
      username: post.author.username,
      accountname: post.author.accountname,
      image: post.author.image,
    },
  };
}
