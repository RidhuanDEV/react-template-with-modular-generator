import { useCallback, useRef, useState } from "react";
import { clsx } from "clsx";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onUpload: (files: File[]) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize,
  onUpload,
  className,
  label = "Click or drag files to upload",
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = useCallback(
    (files: FileList): File[] => {
      const validFiles: File[] = [];
      for (const file of Array.from(files)) {
        if (maxSize && file.size > maxSize) {
          setError(
            `File "${file.name}" exceeds max size of ${String(Math.round(maxSize / 1024))}KB`,
          );
          continue;
        }
        validFiles.push(file);
      }
      return validFiles;
    },
    [maxSize],
  );

  const handleFiles = useCallback(
    (files: FileList) => {
      setError(null);
      const valid = validateFiles(files);
      if (valid.length > 0) onUpload(valid);
    },
    [validateFiles, onUpload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  return (
    <div
      className={clsx(
        "file-upload",
        dragActive && "file-upload--active",
        className,
      )}
    >
      <div
        className="file-upload__dropzone"
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") inputRef.current?.click();
        }}
      >
        <p className="file-upload__label">{label}</p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="file-upload__input"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
        />
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};
