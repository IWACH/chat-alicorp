import { RefObject, useEffect } from "react";

export const useFocusInput = (
  inputRef: RefObject<HTMLInputElement | null>,
  disabled?: boolean
) => {
  const focusInput = () => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusInput();
  }, [disabled]);

  return { focusInput };
};
