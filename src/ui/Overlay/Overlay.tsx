import { FC } from "react";

interface Props {
  onClose: () => void;
  className?: string;
  zIndex?: string;
}

const Overlay: FC<Props> = ({ onClose, className = "", zIndex = "z-40" }) => {
  return (
    <div
      className={`fixed inset-0 ${zIndex} bg-black/70 backdrop-blur-sm ${className}`}
      onClick={onClose}
    />
  );
};

export default Overlay;
