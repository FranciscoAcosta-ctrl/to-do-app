import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-neutral-800 text-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-4 animate-fade-in-scale">
        <p className="mb-6 text-lg font-medium text-center">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-colors"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="bg-neutral-600 hover:bg-neutral-700 px-4 py-2 rounded-lg text-white transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
