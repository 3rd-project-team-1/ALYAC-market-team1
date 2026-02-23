//에러 응답 타입
export interface ApiErrorResponse {
  message: string;
  status: number | string;
}
//기본 User 데이터 모델
export interface User {
  _id: string;
  username: string;
  email: string;
  accountname: string;
  intro: string;
  image: string;
  password: string;
  following: string[];
  followers: string[];
}

// 프로필 조회 응답 모델 (API 문서 기준)
export interface Profile {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  followingCount: number;
  followerCount: number;
  isfollow: boolean;
}

//회원가입
export interface SignupRequest {
  user: Pick<User, 'username' | 'email' | 'accountname' | 'intro' | 'image' | 'password'>;
} //Pick : User 타입에서 여러개의 속성을 선택하여 SignupRequest 타입의 user 속성으로 사용

export interface AuthResponse {
  user: Omit<User, 'password'> & { accessToken: string; refreshToken: string };
} //Omit : User 타입에서 password 속성을 제외한 나머지 속성들과 accessToken, refreshToken을 포함하는 AuthResponse 타입의 user 속성으로 사용

//로그인
export interface LoginRequest {
  user: Pick<User, 'email' | 'password'>;
}

//토큰 재발급
export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// 중복 확인용
export interface EmailValidRequest {
  user: Pick<User, 'email'>;
}

export interface AccountNameValidRequest {
  user: Pick<User, 'accountname'>;
}
