import React from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { FiGrid, FiList, FiFilter, FiChevronDown } from "react-icons/fi";

const ProductsToolbar = ({ 
  totalProducts = 0, 
  sortBy = "default", 
  onSortChange, 
  viewMode = "grid", 
  onViewModeChange,
  onFilterToggle 
}) => {
  const sortOptions = [
    { value: "default", label: "الافتراضي" },
    { value: "price-low", label: "السعر: من الأقل للأعلى" },
    { value: "price-high", label: "السعر: من الأعلى للأقل" },
    { value: "name", label: "الاسم: أ - ي" },
    { value: "rating", label: "التقييم الأعلى" },
    { value: "newest", label: "الأحدث" },
  ];

  const currentSort = sortOptions.find(opt => opt.value === sortBy) || sortOptions[0];

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "20px",
        margin: "20px 0",
        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
        border: "2px solid rgba(102, 126, 234, 0.1)",
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Results count */}
          <Col md={4}>
            <div style={{ color: "#4a5568", fontWeight: 600 }}>
              {totalProducts > 0 ? `${totalProducts} منتج` : "لا توجد منتجات"}
            </div>
          </Col>

          {/* Sort and view controls */}
          <Col md={8} className="d-flex justify-content-end align-items-center gap-3">
            {/* Filter button */}
            <Button
              variant="outline-primary"
              onClick={onFilterToggle}
              style={{
                borderRadius: "12px",
                padding: "8px 16px",
                border: "2px solid rgba(102, 126, 234, 0.2)",
                background: "transparent",
                color: "#667eea",
                fontWeight: 600,
              }}
            >
              <FiFilter className="me-2" />
              فلترة
            </Button>

            {/* Sort dropdown */}
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-secondary"
                style={{
                  borderRadius: "12px",
                  padding: "8px 16px",
                  border: "2px solid rgba(0,0,0,0.1)",
                  background: "white",
                  color: "#4a5568",
                  fontWeight: 600,
                  minWidth: "180px",
                }}
              >
                ترتيب: {currentSort.label}
                <FiChevronDown className="ms-2" />
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  borderRadius: "12px",
                  border: "2px solid rgba(102, 126, 234, 0.1)",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
                }}
              >
                {sortOptions.map((option) => (
                  <Dropdown.Item
                    key={option.value}
                    onClick={() => onSortChange && onSortChange(option.value)}
                    style={{
                      padding: "10px 16px",
                      fontWeight: sortBy === option.value ? 700 : 500,
                      color: sortBy === option.value ? "#667eea" : "#4a5568",
                    }}
                  >
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* View mode toggle */}
            <div
              style={{
                display: "flex",
                background: "rgba(102, 126, 234, 0.1)",
                borderRadius: "12px",
                padding: "4px",
              }}
            >
              <Button
                variant={viewMode === "grid" ? "primary" : "outline-primary"}
                size="sm"
                onClick={() => onViewModeChange && onViewModeChange("grid")}
                style={{
                  borderRadius: "8px",
                  border: "none",
                  padding: "8px 12px",
                  background: viewMode === "grid" ? "#667eea" : "transparent",
                  color: viewMode === "grid" ? "white" : "#667eea",
                }}
              >
                <FiGrid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "outline-primary"}
                size="sm"
                onClick={() => onViewModeChange && onViewModeChange("list")}
                style={{
                  borderRadius: "8px",
                  border: "none",
                  padding: "8px 12px",
                  background: viewMode === "list" ? "#667eea" : "transparent",
                  color: viewMode === "list" ? "white" : "#667eea",
                }}
              >
                <FiList size={16} />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductsToolbar;
