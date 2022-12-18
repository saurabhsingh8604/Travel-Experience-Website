import React from 'react'
import './ImageGallery.css';

const ImageGallery = ({ images, imagesPerPage, imagesCount }) => {
  let i=0;
  const img = [];
  for (i = 0; i < imagesCount; i++) {
    img.push(images[i]?.images[0]);
  }
  return (
    <>
      <div className="images_gallery_div">
        <div className="images_gallery">
          {img.map((image) => (
              <img className="gal_img" src={image?.url} alt="img1" />
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageGallery