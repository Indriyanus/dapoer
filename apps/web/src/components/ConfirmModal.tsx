import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 hover:scale-105 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-amber-600 hover:scale-105 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
