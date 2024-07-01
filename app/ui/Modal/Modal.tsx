import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import "./Modal.scss"; // Ensure your local styles are imported
import Icon from "../Icon/Icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "full";
  className?: string; // New prop for additional class names
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = 'full', className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen && mounted) {
      // Save the element that was focused before the modal was opened
      previousFocusedElement.current = document.activeElement as HTMLElement;

      // Set focus to the modal
      modalRef.current?.focus();

      // Trap focus within the modal
      const handleFocusTrap = (event: FocusEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          modalRef.current.focus();
        }
      };

      document.addEventListener("focus", handleFocusTrap, true);
      document.body.style.overflow = "hidden"; // Prevent body scrolling

      return () => {
        document.removeEventListener("focus", handleFocusTrap, true);
        document.body.style.overflow = "auto"; // Re-enable body scrolling

        // Restore focus to the previously focused element
        previousFocusedElement.current?.focus();
      };
    }
  }, [isOpen, mounted]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  return ReactDOM.createPortal(
    <div className={classNames("modal-overlay", className)} role="dialog" aria-modal="true">
      <div
        className={classNames("modal-content", size)}
        tabIndex={-1}
        ref={modalRef}
        onKeyDown={handleKeyDown}
      >
        <button className="modal-close-button" onClick={onClose} aria-label="Close Modal">
          <Icon icon='FaTimes' size='medium' />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
