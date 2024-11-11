import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./Upload.css";

function Upload() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  // Handle drop event
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image as the state (base64)
        setFile(file); // Save the file for submission
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Restrict to image files only
  });

  // Handle file submission
  const handleSubmit = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Send the image to the backend
      const response = await axios.post(
        "http://localhost:4321/extract-text",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Display the extracted text
      alert(`Extracted Text: ${response.data.extractedText}`);
    } catch (error) {
      console.error("Error submitting the file:", error);
      alert("Failed to submit the file.");
    }
  };

  return (
    <div className="outer-container">
      <div className="upload-container">
        <h2 className="upload-title">Drag and Drop Your Exam Schedule</h2>

        <div
          {...getRootProps()}
          className="upload-box"
        >
          <input {...getInputProps()} />
          <h3>Drag and drop your exam schedule here, or click to select one</h3>
        </div>

        {/* Show the uploaded image */}
        {image && (
          <div className="uploaded-image">
            <h3>Uploaded Image:</h3>
            <img
              src={image}
              alt="Uploaded"
              style={{ width: "100%", maxWidth: "300px" }}
            />
            <button
              onClick={handleSubmit}
              style={{ marginTop: "20px", padding: "10px 20px" }}
            >
              Submit Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
