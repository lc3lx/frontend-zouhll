import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { FiHome, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const ModernBreadcrumb = ({ items = [] }) => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "15px 20px",
        marginBottom: "20px",
        boxShadow: "0 4px 20px rgba(102, 126, 234, 0.1)",
        border: "1px solid rgba(102, 126, 234, 0.1)",
      }}
    >
      <Breadcrumb className="mb-0">
        <Breadcrumb.Item
          as={Link}
          to="/"
          style={{
            color: "#667eea",
            textDecoration: "none",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FiHome size={16} />
          الرئيسية
        </Breadcrumb.Item>

        {items.map((item, index) => (
          <Breadcrumb.Item
            key={index}
            as={item.link ? Link : "span"}
            to={item.link}
            active={!item.link}
            style={{
              color: item.link ? "#667eea" : "#4a5568",
              textDecoration: "none",
              fontWeight: item.link ? 600 : 700,
            }}
          >
            {item.label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>

      <style jsx>{`
        .breadcrumb-item + .breadcrumb-item::before {
          content: "";
          display: inline-flex;
          align-items: center;
          margin: 0 8px;
        }
        .breadcrumb-item + .breadcrumb-item::after {
          content: "←";
          color: #a0aec0;
          font-weight: 600;
          margin-left: -8px;
        }
        .breadcrumb-item a:hover {
          color: #764ba2 !important;
          transform: translateX(-2px);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default ModernBreadcrumb;
