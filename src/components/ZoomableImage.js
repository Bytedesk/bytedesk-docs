import React, { useState } from 'react';
import styles from './ZoomableImage.module.css';

export default function ZoomableImage({ src, alt, width }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        style={width ? { width } : {}} 
        onClick={handleImageClick} 
        className={styles.zoomableImage} 
      />
      
      {isOpen && (
        <div className={styles.modal} onClick={handleClose}>
          <span className={styles.close}>&times;</span>
          <img className={styles.modalContent} src={src} alt={alt} />
          <div className={styles.caption}>{alt}</div>
        </div>
      )}
    </>
  );
}
