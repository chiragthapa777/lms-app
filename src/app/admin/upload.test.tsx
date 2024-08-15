"use client";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "course-cloud"); // Replace with your upload preset

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dnnqnwwsp/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      setUrl(data.secure_url);
    } else {
      console.error("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {url && (
        <div>
          <p>File uploaded successfully!</p>
          <img src={url} alt="Uploaded file" />
        </div>
      )}
    </div>
  );
}
