import React, { useEffect } from 'react'

export default function File({ fileName, setFileName, register, errors, isSubmitSuccessful }: any) {

  useEffect(() => {
    setFileName('Upload your photo')
    errors?.valueOf() && console.log('adasdasdasas')
  }, [isSubmitSuccessful])

  const validateImageSize = (file: Blob | MediaSource, minWidth: number, minHeight: number) => {
    var img = new Image();

    img.src = window.URL.createObjectURL(file);

    return new Promise((resolve) => {
      img.onerror = (e) => {
        return resolve(false);
      };

      img.onload = (e) => {
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
        <span className="container-upload__button" style={errors?.photo && { border: '2px solid #CB3D40' }}>
          Upload
        </span>
        <div className="file__placeholder input-text" style={errors?.photo && { border: '2px solid #CB3D40', borderLeft: 'none' }}>
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
              imageWidth: (files: any) => validateImageSize(files[0], 70, 70),
              lessThan5MB: (files: { size: number }[]) => files[0]?.size < 5000000 || "Max 5MB",
            },
            onChange: (e: { target: { files: { name: React.SetStateAction<string>; }[]; }; }) => {
              // newImage(e.target.files[0])
              setFileName(e.target.files[0].name);
            }
          })}
        />
      </label>
      {errors?.photo &&
        <div className="text-input-container__tip tip"
          style={errors?.photo && { color: '#CB3D40' }}>
          Minimum size of photo 70x70px. The photo format must be jpeg/jpg type. The photo size must not be greater than 5 Mb.
        </div>
      }
    </>
  )
}
