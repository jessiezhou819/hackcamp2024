import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Upload.css';

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
    noClick: false, // Allow click event on the dropzone area
  });

  return (
    <div className="upload-container">
      <h2 className="upload-title">Drag and Drop Your Exam Schedule</h2>
      
      <div
        {...getRootProps()}
        className="upload-box"
      >
        {/* The file input is hidden, but still triggers on click */}
        <input {...getInputProps()} />
        <h3 className="upload-message">
          Drag and drop your exam schedule here, or click to select one
        </h3>
      </div>

      {/* Show the uploaded image */}
      {image && (
        <div className="uploaded-image">
          <h3>Uploaded Image:</h3>
          <img src={image} alt="Uploaded Exam Schedule" />
        </div>
      )}
    </div>
  );
}

export default Upload;
