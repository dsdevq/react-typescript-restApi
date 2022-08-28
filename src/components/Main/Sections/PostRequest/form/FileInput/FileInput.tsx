import React, { useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { errorStyle, FormValues } from '../FormBody'
import './FileInput.scss'

interface FileInputInterface {
  register: any,
  errors: FieldErrors<FormValues>,
}

export const FileInput = ({ register, errors }: FileInputInterface) => {

  const [fileName, setFileName] = useState<string>('Upload your photo')

  const validateImageSize = (file: Blob | MediaSource, minWidth: number, minHeight: number) => {
    const img = new Image();

    img.src = window.URL.createObjectURL(file);

    return new Promise((resolve) => {
      img.onerror = () => {
        return resolve(false);
      };

      img.onload = () => {
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);
        if (width < minWidth || height < minHeight) resolve(false);
        return resolve(true);
      };
    });
  };

  return (
    <>
      <label htmlFor="input-file" className="form__upload-container container-upload">
        <span className="container-upload__button" style={errors?.photo && errorStyle.border()}>
          Upload
        </span>
        <div className="container-upload__placeholder input-text" style={errors?.photo && { ...errorStyle.border, borderLeft: 'none' }}>
          {fileName}
        </div>

        <input
          type="file"
          id="input-file"
          accept="image/jpeg,image/jpg"
          className="container-upload__file-input"
          {...register('photo', {
            required: true,
            validate: {
              imageWidth: (files: (Blob | MediaSource)[]) => validateImageSize(files[0], 70, 70),
              lessThan5MB: (files: { size: number }[]) => files[0]?.size < 5000000 || "Max 5MB",
            },
            onChange: (e: { target: { files: { name: React.SetStateAction<string>; }[]; }; }) => {
              setFileName(e.target.files[0].name)
            }
          })}
        />
      </label>
      {errors?.photo &&
        <div className="text-input-container__tip tip"
          style={errors?.photo && errorStyle.border()}>
          Minimum size of photo 70x70px. The photo format must be jpeg/jpg type. The photo size must not be greater than 5 Mb.
        </div>
      }
    </>
  )
}
