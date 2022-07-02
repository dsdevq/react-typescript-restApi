import React, { useEffect } from 'react'

export default function File( {fileName, setFileName, register, errors, isSubmitSuccessful }: any) {


  useEffect(() => {
    setFileName('Upload your photo')
  }, [isSubmitSuccessful])

  const newImage = (image: any) => {
    const myImage = new Image()
    myImage.src = window.URL.createObjectURL(image)
    return myImage.onload = () => console.log(myImage.width, myImage.height)
  }



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
            onChange: (e: { target: { files: { name: React.SetStateAction<string>; }[]; }; }) => {
              newImage(e.target.files[0])
              setFileName(e.target.files[0].name);
            },
          })}
        />

      </label>
      {errors?.photo &&
        <div className="text-input-container__tip tip"
          style={ errors?.photo && { color: '#CB3D40' }}>
          Minimum size of photo 70x70px. The photo format must be jpeg/jpg type. The photo size must not be greater than 5 Mb.
        </div>
      }
      </>
  )
}
