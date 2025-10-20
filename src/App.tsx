import { useState } from 'react'
import './App.css'

function App() {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setUserImage(e.target.files[0]);
    }
  }

  async function handleUpload() {
    if (!userImage) return;
    const formData = new FormData();
    formData.append("file", userImage);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/process`, {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const imageUrl = URL.createObjectURL(blob);
    setProcessedImage(imageUrl);
  };

  return (
    <div>
      <div>
        <input type='file' accept='image/*' onChange={handleFileChange} />
      </div>
      <h1>
        {userImage && <p>Selected: {userImage.name}</p>}
      </h1>
      <h1>
        {processedImage && <img src={processedImage} alt="Processed with ffmpeg" />}
      </h1>
      <button onClick={handleUpload}>Upload For Scaling Up!</button>
    </div>
  )
}

export default App
