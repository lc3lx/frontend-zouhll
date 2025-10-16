import React, { useMemo } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import LeftButton from "./LeftButton";
import RightButton from "./RightButton";
import { useParams } from "react-router-dom";
import ViewProductsDetalisHook from "./../../hook/products/view-products-detalis-hook";
const ProductGallery = ({ selectedVariantIndex }) => {
  const { id } = useParams();
  const [item, images, cat, brand] = ViewProductsDetalisHook(id);

  const galleryItems = useMemo(() => {
    const variants = Array.isArray(item?.variants) ? item.variants : [];
    if (
      variants.length > 0 &&
      selectedVariantIndex !== null &&
      variants[selectedVariantIndex] &&
      Array.isArray(variants[selectedVariantIndex].images) &&
      variants[selectedVariantIndex].images.length > 0
    ) {
      return variants[selectedVariantIndex].images.map((img) => ({ original: img }));
    }
    return images;
  }, [item, images, selectedVariantIndex]);

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "25px",
        padding: "20px",
        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
        border: "2px solid rgba(102, 126, 234, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative gradient on top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #667eea, #764ba2, #667eea)",
          animation: "slideInRight 0.6s ease",
        }}
      />

      <div
        className="product-gallary-card d-flex justify-content-center align-items-center"
        style={{
          minHeight: "400px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <ImageGallery
          items={galleryItems}
          showFullscreenButton={false}
          isRTL={true}
          showPlayButton={false}
          showThumbnails={galleryItems.length > 1}
          renderRightNav={RightButton}
          renderLeftNav={LeftButton}
          lazyLoad={true}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
