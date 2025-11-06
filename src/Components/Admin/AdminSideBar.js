import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar admin-sidebar-responsive">
      {/* Toggle Button - Only visible on mobile */}
      <button
        className="admin-sidebar-toggle-btn d-md-none"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i className={`fas fa-${isOpen ? "times" : "bars"}`}></i>
        <span>{isOpen ? "إخفاء القائمة" : "إظهار القائمة"}</span>
      </button>

      <div
        className={`admin-sidebar-content ${
          isOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <Link
          to="/admin/allorders"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">اداره الطلبات</div>
        </Link>
        <Link
          to="/admin/allproducts"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">اداره المنتجات</div>
        </Link>
        <Link
          to="/admin/allbrands"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">إدارة الماركات</div>
        </Link>

        <Link
          to="/admin/allstores"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">إدارة المتاجر</div>
        </Link>

        <Link
          to="/admin/allcategories"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">إدارة التصنيفات</div>
        </Link>

        <Link
          to="/admin/allsubcategories"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">إدارة التصنيفات الفرعية</div>
        </Link>

        <Link
          to="/admin/all-offers"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">إدارة العروض</div>
        </Link>

        <Link
          to="/admin/all-secondary-categories"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">إدارة التصنيفات الثانوية</div>
        </Link>
        <Link
          to="/admin/addcoupon"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">اضف كوبون</div>
        </Link>
        <Link
          to="/admin/recharge-codes"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">أكواد الشحن</div>
        </Link>
        <Link
          to="/admin/add-exchange-rate"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">إضافة سعر صرف</div>
        </Link>
        <Link
          to="/admin/all-exchange-rates"
          style={{ textDecoration: "none" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="admin-side-text">إدارة أسعار الصرف</div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
