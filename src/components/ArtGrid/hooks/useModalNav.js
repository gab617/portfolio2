import { useCallback, useEffect, useRef } from "react";

export function useModalNav({
  isOpen,
  index,
  total,
  onClose,
  onIndexChange,
  enableArrowNav = true,
}) {
  const apiRef = useRef({ index, total, onClose, onIndexChange });
  const restoreRef = useRef(null);

  useEffect(() => {
    apiRef.current = { index, total, onClose, onIndexChange };
  });

  useEffect(() => {
    if (!isOpen) return undefined;
    restoreRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      const el = restoreRef.current;
      if (el && typeof el.focus === "function") el.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => {
      const { index: i, total: t, onClose: cl, onIndexChange: ch } = apiRef.current;
      if (event.key === "Escape") {
        event.preventDefault();
        cl?.();
      } else if (enableArrowNav && event.key === "ArrowRight" && i < t - 1) {
        event.preventDefault();
        ch?.(i + 1);
      } else if (enableArrowNav && event.key === "ArrowLeft" && i > 0) {
        event.preventDefault();
        ch?.(i - 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, enableArrowNav]);

  const close = useCallback(() => apiRef.current.onClose?.(), []);

  const next = useCallback(() => {
    const { index: i, total: t, onIndexChange: ch } = apiRef.current;
    if (i < t - 1) ch?.(i + 1);
  }, []);

  const prev = useCallback(() => {
    const { index: i, onIndexChange: ch } = apiRef.current;
    if (i > 0) ch?.(i - 1);
  }, []);

  return { close, next, prev };
}
