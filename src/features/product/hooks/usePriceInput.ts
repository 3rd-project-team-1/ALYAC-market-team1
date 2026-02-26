import {
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

/**
 * 가격 입력 필드의 검증 및 포매팅을 담당하는 커스텀 훅
 * - 숫자만 입력 가능
 * - 실시간 에러 처리
 */
export function usePriceInput<T extends FieldValues>(
  fieldName: Path<T>,
  setValue: UseFormSetValue<T>,
  setError: UseFormSetError<T>,
  clearErrors: UseFormClearErrors<T>,
) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (/[^0-9]/.test(raw)) {
      setError(fieldName, {
        type: 'manual',
        message: '숫자만 입력 가능합니다.',
      });
      setValue(fieldName, raw.replace(/[^0-9]/g, '') as unknown as T[Path<T>]);
    } else {
      clearErrors(fieldName);
      setValue(fieldName, raw as unknown as T[Path<T>]);
    }
  };

  return { handlePriceChange };
}
