// importing modules
import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {FiUpload} from 'react-icons/fi';
// styles
import './styles.css';
// interface
interface Props {
    onFileUploaded: (file: File) => void;
}
// component
const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
  // state hooks
  const [selectedFileUrl, setSeletedFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    // get image upload and set url for preview
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setSeletedFileUrl(fileUrl);
    // call function fileupload
    onFileUploaded(file);
    
  }, [onFileUploaded]);

  const {getRootProps, getInputProps} = useDropzone({
      onDrop,
      accept: 'image/*'
  })

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} accept="image/*"/>

    {/* preview image upload condition show */}
      { selectedFileUrl
        ? <img src={selectedFileUrl} alt="Point thumbnail"/>
        : (
            <p>
                <FiUpload />
                Imagem do estabelecimento
            </p>
        )
      }
    </div>
  )
}
// exporting component
export default Dropzone;