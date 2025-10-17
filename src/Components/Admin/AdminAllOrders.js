import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { FiSearch, FiFilter } from "react-icons/fi";
import AdminAllOrdersItem from "./AdminAllOrdersItem";
import UserGetAllOrderHook from "./../../hook/user/user-get-all-order-hook";
import Pagination from "../Uitily/Pagination";

const AdminAllOrders = () => {
  const [userName, results, paginate, orderData, onPress] =
    UserGetAllOrderHook();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // التأكد من أن orderData هو array
  const orders = Array.isArray(orderData) ? orderData : [];

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = !searchTerm || 
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id?.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'delivered' && order.isDelivered) ||
      (statusFilter === 'pending' && !order.isDelivered) ||
      (statusFilter === 'paid' && order.isPaid) ||
      (statusFilter === 'unpaid' && !order.isPaid);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Search and Filter Bar */}
      <div style={{
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
            <FiSearch style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999',
              fontSize: '18px'
            }} />
            <input
              type="text"
              placeholder="البحث في الطلبات (اسم العميل، الإيميل، رقم الطلب)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="amazon-sort-select"
              style={{
                width: '100%',
                padding: '12px 16px 12px 40px',
                minWidth: 'auto'
              }}
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="amazon-sort-select"
            style={{ minWidth: '150px' }}
          >
            <option value="all">جميع الطلبات</option>
            <option value="delivered">تم التوصيل</option>
            <option value="pending">في الانتظار</option>
            <option value="paid">تم الدفع</option>
            <option value="unpaid">لم يتم الدفع</option>
          </select>
        </div>
      </div>

      {/* Orders Count */}
      <div style={{
        marginBottom: '16px',
        fontSize: '14px',
        color: '#565959'
      }}>
        {filteredOrders.length > 0 ? (
          <>
            <span style={{ fontWeight: '600', color: '#0f1111' }}>
              {filteredOrders.length}
            </span>
            <span> طلب</span>
            {(searchTerm || statusFilter !== 'all') && <span> من أصل {orders.length}</span>}
          </>
        ) : (searchTerm || statusFilter !== 'all') ? (
          'لا توجد طلبات تطابق البحث'
        ) : (
          'لا توجد طلبات'
        )}
      </div>

      {/* Orders List */}
      <div style={{
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px'
      }}>
        <Row className="justify-content-start">
          {filteredOrders.length >= 1 ? (
            filteredOrders.map((orderItem, index) => (
              <AdminAllOrdersItem key={index} orderItem={orderItem} />
            ))
          ) : orders.length === 0 ? (
            <div className="col-12 text-center py-5">
              <div style={{ 
                color: "#666", 
                fontSize: "16px",
                padding: "40px 20px"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
                <div style={{ fontWeight: "600", marginBottom: "8px" }}>
                  {orderData === undefined ? "جاري تحميل الطلبات..." : "لا يوجد طلبات حتى الآن"}
                </div>
                <div style={{ fontSize: "14px", color: "#999" }}>
                  {orderData === undefined ? "يرجى الانتظار..." : "لم يتم إنشاء أي طلبات بعد"}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-12 text-center py-5">
              <div style={{ 
                color: "#666", 
                fontSize: "16px",
                padding: "40px 20px"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                <div style={{ fontWeight: "600", marginBottom: "8px" }}>لا توجد طلبات تطابق البحث</div>
                <div style={{ fontSize: "14px", color: "#999" }}>جرب تغيير معايير البحث أو الفلترة</div>
              </div>
            </div>
          )}
        </Row>
      </div>

      {/* Pagination */}
      {paginate && paginate.numberOfPages >= 2 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            onPress={onPress}
            pageCount={paginate.numberOfPages || 0}
          />
        </div>
      )}
    </div>
  );
};

export default AdminAllOrders;
