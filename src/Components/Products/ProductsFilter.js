import React, { useState } from "react";
import { Offcanvas, Form, Button, Badge } from "react-bootstrap";
import { FiX, FiRefreshCw } from "react-icons/fi";

const ProductsFilter = ({ show, onHide, filters = {}, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const priceRanges = [
    { label: "أقل من 50$", min: 0, max: 50 },
    { label: "50$ - 100$", min: 50, max: 100 },
    { label: "100$ - 200$", min: 100, max: 200 },
    { label: "200$ - 500$", min: 200, max: 500 },
    { label: "أكثر من 500$", min: 500, max: 999999 },
  ];

  const ratings = [
    { label: "⭐⭐⭐⭐⭐", value: 5 },
    { label: "⭐⭐⭐⭐ وأعلى", value: 4 },
    { label: "⭐⭐⭐ وأعلى", value: 3 },
    { label: "⭐⭐ وأعلى", value: 2 },
    { label: "⭐ وأعلى", value: 1 },
  ];

  const handlePriceChange = (range) => {
    const newFilters = {
      ...localFilters,
      priceMin: range.min,
      priceMax: range.max,
    };
    setLocalFilters(newFilters);
  };

  const handleRatingChange = (rating) => {
    const newFilters = {
      ...localFilters,
      minRating: rating,
    };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange && onFiltersChange(localFilters);
    onHide();
  };

  const handleClearFilters = () => {
    const emptyFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange && onFiltersChange(emptyFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.priceMin !== undefined || localFilters.priceMax !== undefined) count++;
    if (localFilters.minRating) count++;
    return count;
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      style={{ width: "350px" }}
    >
      <Offcanvas.Header
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderBottom: "none",
        }}
      >
        <Offcanvas.Title style={{ fontWeight: 800 }}>
          فلترة المنتجات
          {getActiveFiltersCount() > 0 && (
            <Badge
              bg="light"
              text="dark"
              className="ms-2"
              style={{ fontSize: "12px" }}
            >
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Offcanvas.Title>
        <Button
          variant="link"
          onClick={onHide}
          style={{ color: "white", fontSize: "20px", padding: 0 }}
        >
          <FiX />
        </Button>
      </Offcanvas.Header>

      <Offcanvas.Body style={{ padding: "20px" }}>
        {/* Price Range */}
        <div className="mb-4">
          <h6 style={{ fontWeight: 700, color: "#2d3748", marginBottom: "15px" }}>
            نطاق السعر
          </h6>
          {priceRanges.map((range, index) => (
            <Form.Check
              key={index}
              type="radio"
              name="priceRange"
              label={range.label}
              checked={
                localFilters.priceMin === range.min &&
                localFilters.priceMax === range.max
              }
              onChange={() => handlePriceChange(range)}
              style={{ marginBottom: "8px" }}
            />
          ))}
        </div>

        {/* Rating */}
        <div className="mb-4">
          <h6 style={{ fontWeight: 700, color: "#2d3748", marginBottom: "15px" }}>
            التقييم
          </h6>
          {ratings.map((rating, index) => (
            <Form.Check
              key={index}
              type="radio"
              name="rating"
              label={rating.label}
              checked={localFilters.minRating === rating.value}
              onChange={() => handleRatingChange(rating.value)}
              style={{ marginBottom: "8px" }}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="d-flex gap-2 mt-4">
          <Button
            variant="primary"
            onClick={handleApplyFilters}
            style={{
              flex: 1,
              borderRadius: "12px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
            }}
          >
            تطبيق الفلاتر
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleClearFilters}
            style={{
              borderRadius: "12px",
              fontWeight: 600,
              padding: "8px 16px",
            }}
          >
            <FiRefreshCw />
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ProductsFilter;
