import React, { useState } from 'react';
import '../css/PhotoDetail.css'; // Pastikan untuk mengimpor CSS

const PhotoDetail = ({ isOpen, onClose, photo }) => {
  const [isImageLarge, setIsImageLarge] = useState(false); // State untuk gambar besar

  if (!isOpen) return null; // Jangan tampilkan jika tidak terbuka

  // Fungsi untuk menangani klik tombol
  const handleViewLargeClick = () => {
    setIsImageLarge(true); // Menandai bahwa kita ingin melihat gambar besar
  };

  // Fungsi untuk menutup gambar besar
  const closeLargeImage = () => {
    setIsImageLarge(false); // Menandai bahwa kita ingin menutup gambar besar
  };

  return (
    <div className="photo-detail-overlay" onClick={onClose}>
      <div className="photo-detail" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        
        {isImageLarge ? (
          // Menampilkan gambar besar
          <div className="large-image-container" onClick={closeLargeImage}>
            <img src={photo.urls.full} alt={photo.alt_description} className="large-image" />
            <span className="close-large-image" onClick={closeLargeImage}>&times;</span>
          </div>
        ) : (
          // Menampilkan gambar kecil
          <>
            <img src={photo.urls.small} alt={photo.alt_description} />
            <h2>{photo.alt_description || 'No Description'}</h2>
            <p>Taken on: {new Date(photo.created_at).toLocaleDateString()}</p>
            <p>Photographer: {photo.user.name}</p>
            {/* Tombol untuk melihat gambar lebih besar */}
            <button onClick={handleViewLargeClick} className="view-large-button">
              View Larger
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoDetail;
