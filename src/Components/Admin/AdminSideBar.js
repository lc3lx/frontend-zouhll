import React from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="sidebar">
      <div className="d-flex flex-column">
        <Link to="/admin/allorders" style={{ textDecoration: "none" }}>
          <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">
            اداره الطلبات
          </div>
        </Link>
        <Link to="/admin/allproducts" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            اداره المنتجات
          </div>
        </Link>
        <Link to="/admin/allbrands" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            إدارة الماركات
          </div>
        </Link>
        <Link to="/admin/addbrand" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            اضف ماركه
          </div>
        </Link>

        <Link to="/admin/allcategories" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            إدارة التصنيفات
          </div>
        </Link>
        <Link to="/admin/addcategory" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            اضف تصنيف
          </div>
        </Link>

        <Link to="/admin/addsubcategory" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            اضف تصنيف فرعي
          </div>
        </Link>
        <Link to="/admin/allsubcategories" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            إدارة التصنيفات الفرعية
          </div>
        </Link>

        <Link
          to="/admin/add-secondary-category"
          style={{ textDecoration: "none" }}
        >
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            اضف تصنيف ثانوي
          </div>
        </Link>
        <Link
          to="/admin/all-secondary-categories"
          style={{ textDecoration: "none" }}
        >
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            إدارة التصنيفات الثانوية
          </div>
        </Link>
        <Link to="/admin/addproduct" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            اضف منتج
          </div>
        </Link>
        <Link to="/admin/addcoupon" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            اضف كوبون
          </div>
        </Link>
        <Link to="/admin/recharge-codes" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            أكواد الشحن
          </div>
        </Link>
        <Link to="/admin/add-exchange-rate" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            إضافة سعر صرف
          </div>
        </Link>
        <Link to="/admin/all-exchange-rates" style={{ textDecoration: "none" }}>
          <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
            إدارة أسعار الصرف
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
