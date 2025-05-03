import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './UploadPictures.scss';
import { useI18n } from '~/context/i18nContext';

export interface UploadPicturesProps {
  id?: string;
  label: string;
  isLabelVisible?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  hintText?: string;
  error?: string;
  className?: string;
  initialPictures?: string[]; // Array of URLs for pre-saved pictures
  onChange?: (files: FileList) => void;
}

const UploadPictures: React.FC<UploadPicturesProps> = ({
  id,
  label,
  isLabelVisible = true,
  isRequired = false,
  isDisabled = false,
  hintText,
  error,
  className,
  initialPictures = [],
  onChange
}) => {
  const { t } = useI18n();
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  useEffect(() => {
    setFilePreviews(initialPictures);
  }, [initialPictures]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const previews = Array.from(files).map(file => URL.createObjectURL(file));
      setFilePreviews(prevPreviews => [...prevPreviews, ...previews]);
      if (onChange) {
        onChange(files);
      }
    }
  };

  return (
    <div className={classNames('upload-pictures', className)}>
      <label
        className={classNames('upload-pictures__label', {
          'upload-pictures__label--hidden': !isLabelVisible
        })}
        htmlFor={id}
      >
        {t(label)} {isRequired && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type="file"
        multiple
        className="upload-pictures__input"
        onChange={handleFileChange}
        disabled={isDisabled}
        aria-required={isRequired}
        aria-disabled={isDisabled}
        data-id={id}
      />
      {filePreviews.length > 0 && (
        <div className="upload-pictures__previews">
          {filePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="upload-pictures__preview"
            />
          ))}
        </div>
      )}
      {error && <div className="upload-pictures__error">{error}</div>}
      {hintText && <div className="upload-pictures__hint">{t(hintText)}</div>}
    </div>
  );
};

export default UploadPictures;
