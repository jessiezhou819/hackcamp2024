import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function Upload() {
  const [image, setImage] = useState(null);

  // Handle drop event
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image as the state
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Restrict to image files only
  });

  return (
    <div>
      <h2>Drag and Drop an Image of your Exam schedule</h2>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          padding: '200px',
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '100px',
          width: '700px',
          margin: '0 auto',
        }}
      >
        <input {...getInputProps()} />
        <h3>Drag and drop your exam schedule here, or click to select one</h3>
      </div>

      {image && (
        <div style={{ marginTop: '20px' }}>
          <h3>Uploaded Image:</h3>
          <img src={image} alt="Uploaded" style={{ width: '100%', maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default Upload;
