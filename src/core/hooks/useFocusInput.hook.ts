import { RefObject, useEffect, useCallback } from "react";

export const useFocusInput = (
  inputRef: RefObject<HTMLInputElement | null>,
  disabled?: boolean
) => {
  const focusInput = useCallback(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [inputRef, disabled]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  return { focusInput };
};
