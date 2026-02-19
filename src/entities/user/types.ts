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

//회원가입
export interface SigbupRequest {
  user: Pick<User, 'username' | 'email' | 'accountname' | 'intro' | 'image' | 'password'>;
}

export interface AuthResponse {
  user: Omit<User, 'password'> & { token: string; refreshToken: string };
}

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
