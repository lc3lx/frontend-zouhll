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
  const [zoomStyle, setZoomStyle] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

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
        thumbnail: getImageUrl(img),
      }));
    }
    return images.map((img) => ({
      original: img.original,
      thumbnail: img.original,
    }));
  }, [item, images, selectedVariantIndex]);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e7e7e7",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Main Image Display */}
      <div
        style={{
          position: "relative",
          background: "#f8f9fa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "450px",
          maxHeight: "550px",
          overflow: "hidden",
          borderRadius: "8px 8px 0 0",
        }}
        onMouseMove={(e) => {
          if (isZooming) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setMousePosition({ x, y });
            setZoomStyle({
              transformOrigin: `${x}% ${y}%`,
              transform: "scale(2)",
              transition: "none",
            });
          }
        }}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => {
          setIsZooming(false);
          setZoomStyle({});
        }}
      >
        {galleryItems.length > 0 && (
          <>
            <img
              src={galleryItems[selectedImageIndex]?.original}
              alt="Product"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                cursor: isZooming ? "zoom-out" : "zoom-in",
                transition: isZooming ? "none" : "transform 0.3s ease",
                ...zoomStyle,
              }}
              onClick={() => setShowModal(true)}
            />
            {isZooming && (
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  pointerEvents: "none",
                }}
              >
                انقر للتكبير الكامل
              </div>
            )}
          </>
        )}

        {/* Navigation Arrows */}
        {galleryItems.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) =>
                  prev > 0 ? prev - 1 : galleryItems.length - 1
                );
              }}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.95)",
                border: "1px solid #ddd",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#333",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                transition: "all 0.2s ease",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) =>
                  prev < galleryItems.length - 1 ? prev + 1 : 0
                );
              }}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.95)",
                border: "1px solid #ddd",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#333",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                transition: "all 0.2s ease",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              ›
            </button>
            {/* Image Counter */}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {selectedImageIndex + 1} / {galleryItems.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {galleryItems.length > 1 && (
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid #e7e7e7",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              scrollbarWidth: "thin",
            }}
          >
            {galleryItems.map((item, index) => {
              const isSelected = selectedImageIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    minWidth: "70px",
                    height: "70px",
                    border: isSelected ? "3px solid #ff9900" : "2px solid #ddd",
                    borderRadius: "6px",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#f8f9fa",
                    position: "relative",
                    transition: "all 0.2s ease",
                    opacity: isSelected ? 1 : 0.8,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "#ff9900";
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "#ddd";
                      e.currentTarget.style.opacity = "0.8";
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.2s ease",
                    }}
                  />
                  {isSelected && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        border: "2px solid #ff9900",
                        borderRadius: "4px",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Image Zoom Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
      >
        <Modal.Body
          style={{ padding: 0, background: "#000", position: "relative" }}
        >
          <div
            style={{
              position: "relative",
              textAlign: "center",
              padding: "20px",
            }}
          >
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) =>
                      prev > 0 ? prev - 1 : galleryItems.length - 1
                    );
                  }}
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.9)",
                    border: "none",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    cursor: "pointer",
                    fontSize: "24px",
                    color: "#333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1)";
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) =>
                      prev < galleryItems.length - 1 ? prev + 1 : 0
                    );
                  }}
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.9)",
                    border: "none",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    cursor: "pointer",
                    fontSize: "24px",
                    color: "#333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1)";
                  }}
                >
                  ›
                </button>
              </>
            )}
            <img
              src={galleryItems[selectedImageIndex]?.original}
              alt="Product Zoom"
              style={{
                maxWidth: "100%",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "rgba(255,255,255,0.9)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                fontSize: "24px",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ×
            </button>
            {galleryItems.length > 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                {selectedImageIndex + 1} / {galleryItems.length}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductGallery;
