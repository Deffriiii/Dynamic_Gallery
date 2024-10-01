import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import '../css/Gallery.css';

const Gallery = ({ category, searchTerm }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // State untuk halaman saat ini
  const observer = useRef(); // Menggunakan ref untuk IntersectionObserver
  const lastPhotoRef = useRef();

  // Mengatur ulang foto dan halaman ketika kategori atau searchTerm berubah
  useEffect(() => {
    setPhotos([]);
    setPage(1);
  }, [category, searchTerm]);

  // Mengambil foto dengan useCallback
  const fetchPhotos = useCallback(async () => {
    const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
    const query = searchTerm || category;
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=10&page=${page}`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      setPhotos((prev) => [...prev, ...response.data.results]); // Menambahkan hasil ke foto sebelumnya
    } catch (error) {
      console.error('Error fetching data from Unsplash API:', error);
    } finally {
      setLoading(false);
    }
  }, [category, searchTerm, page]);

  // Memanggil fetchPhotos setiap kali kategori, searchTerm, atau halaman berubah
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Fungsi untuk mengunduh gambar
  const downloadImage = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = urlBlob;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // Logika Infinite Scroll menggunakan IntersectionObserver
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setPage((prev) => prev + 1); // Menambah halaman ketika elemen terakhir terlihat
    }
  }, [loading]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, option);
    const currentRef = lastPhotoRef.current; // Menyimpan nilai saat ini untuk cleanup
    if (currentRef) {
      observer.current.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.current.unobserve(currentRef);
      }
    };
  }, [handleObserver]);

  return (
    <div className="gallery">
      {photos.length > 0 ? (
        photos.map((photo, index) => {
          const isLastPhoto = index === photos.length - 1; // Memeriksa apakah ini adalah foto terakhir
          const { width, height } = photo; // Mengambil width dan height dari objek photo
          return (
            <div key={photo.id} className="photo" ref={isLastPhoto ? lastPhotoRef : null}>
              <img src={photo.urls.small} alt={photo.alt_description} />
              {/* Menampilkan ukuran foto di kanan atas */}
              <div className="photo-size">
                {width} x {height} {/* Menampilkan ukuran foto */}
              </div>
              {/* Tombol unduh gambar */}
              <button className="button" onClick={() => downloadImage(photo.urls.full, `photo-${photo.id}.jpg`)}>
                <span className="button_lg">
                  <span className="button_sl"></span>
                  <span className="button_text">Download Now</span>
                </span>
              </button>
            </div>
          );
        })
      ) : (
        <p>No photos found.</p>
      )}
      {loading && <p>Loading more photos...</p>} {/* Menampilkan loading */}
    </div>
  );
};

export default Gallery;
