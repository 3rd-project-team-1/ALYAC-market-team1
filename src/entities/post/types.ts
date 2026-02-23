export interface PostAuthor {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  followingCount: number;
  followerCount: number;
}

export interface Post {
  id: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  hearted: boolean;
  heartCount: number;
  commentCount: number;
  authorId: string;
  author: PostAuthor;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  authorId: string;
  author: PostAuthor;
}
