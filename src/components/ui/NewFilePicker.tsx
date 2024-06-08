import React, { useState } from 'react';

interface FileInputProps {
  extensions?: string[]; // Allowed extensions (e.g., ["jpg", "png"])
  maxFiles?: number; // Maximum number of files allowed (default: 1)
  maxFileSize?: number; // Maximum file size in MB (default: 5)
  onFilesSelected?: (files: FileList) => void; // Callback for selected files
}

const FileInput: React.FC<FileInputProps> = ({
  extensions = [],
  maxFiles = 1,
  maxFileSize = 5,
  onFilesSelected,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase() || '';

      if (extensions.length > 0 && !extensions.includes(ext)) {
        console.warn(`Invalid file type: ${file.name}`);
        continue;
      }

      if (file.size > maxFileSize * 1024 * 1024) {
        console.warn(`File size exceeds limit: ${file.name}`);
        continue;
      }

      if (validFiles.length >= maxFiles) {
        console.warn(`Maximum number of files reached: ${maxFiles}`);
        break;
      }

      validFiles.push(file);
    }

    setSelectedFiles(validFiles);
    // if (onFilesSelected) onFilesSelected(validFiles);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const renderSelectedFiles = () =>
    selectedFiles.map((file, index) => (
      <SelectedFileCard key={index} fileName={file.name} onRemove={() => handleRemoveFile(index)} />
    ));

  return (
    <div>
      <input type="file" accept={extensions.length > 0 ? `.${extensions.join(', .')}` : '*/*'} multiple onChange={handleFileChange} />
      <div className="selected-files">{renderSelectedFiles()}</div>
    </div>
  );
};

const SelectedFileCard: React.FC<{ fileName: string; onRemove: () => void }> = ({ fileName, onRemove }) => (
  <div className="selected-file-card">
    <span>{fileName}</span>
    <button onClick={onRemove}>Remove</button>
  </div>
);

export default FileInput;
