import React, { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ViewProductsDetalisHook from "./../../hook/products/view-products-detalis-hook";
import { getImageUrl } from "../../utils/imageHelper";

const ProductGallery = ({ selectedVariantIndex }) => {
  const { id } = useParams();
  const [item, images, cat, brand] = ViewProductsDetalisHook(id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const galleryItems = useMemo(() => {
    const variants = Array.isArray(item?.variants) ? item.variants : [];
    if (
      variants.length > 0 &&
      selectedVariantIndex !== null &&
      variants[selectedVariantIndex] &&
      Array.isArray(variants[selectedVariantIndex].images) &&
      variants[selectedVariantIndex].images.length > 0
    ) {
      return variants[selectedVariantIndex].images.map((img) => ({
        original: getImageUrl(img),
        thumbnail: getImageUrl(img)
      }));
    }
    return images.map(img => ({
      original: img.original,
      thumbnail: img.original
    }));
  }, [item, images, selectedVariantIndex]);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e7e7e7',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Main Image Display */}
      <div style={{
        position: 'relative',
        background: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        maxHeight: '500px'
      }}>
        {galleryItems.length > 0 && (
          <img
            src={galleryItems[selectedImageIndex]?.original}
            alt="Product"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              cursor: 'zoom-in'
            }}
            onClick={() => setShowModal(true)}
          />
        )}
        
        {/* Navigation Arrows */}
        {galleryItems.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImageIndex(prev => 
                prev > 0 ? prev - 1 : galleryItems.length - 1
              )}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid #ddd',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#333'
              }}
            >
              ‹
            </button>
            <button
              onClick={() => setSelectedImageIndex(prev => 
                prev < galleryItems.length - 1 ? prev + 1 : 0
              )}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid #ddd',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#333'
              }}
            >
              ›
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail Strip */}
      {galleryItems.length > 1 && (
        <div style={{
          padding: '12px',
          borderTop: '1px solid #e7e7e7',
          background: '#fff'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'thin'
          }}>
            {galleryItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                style={{
                  minWidth: '60px',
                  height: '60px',
                  border: selectedImageIndex === index ? '2px solid #ff9900' : '1px solid #ddd',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#f8f9fa'
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Image Zoom Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Body style={{ padding: 0, background: '#000' }}>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <img
              src={galleryItems[selectedImageIndex]?.original}
              alt="Product Zoom"
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain'
              }}
            />
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#333'
              }}
            >
              ×
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductGallery;
