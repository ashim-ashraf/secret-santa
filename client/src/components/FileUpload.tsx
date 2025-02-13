import React from "react";

interface FileUploadProps {
  label: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileChange }) => {
  return (
    <div>
      <label className="block">{label}</label>
      <div className="relative w-full mt-1">
        <input
          type="file"
          accept=".csv"
          onChange={onFileChange}
          className="mb-2 p-2 border rounded w-full cursor-pointer file:cursor-pointer file:bg-blue-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded-lg"
        />
      </div>
    </div>
  );
};

export default FileUpload;
