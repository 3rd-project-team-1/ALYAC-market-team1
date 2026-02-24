// src/shared/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? '';

// 서버에서 오는 상대경로 이미지를 절대 URL로 변환
// 이미 http로 시작하면 그대로 반환
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMAGE_BASE_URL}/${path}`;
}
