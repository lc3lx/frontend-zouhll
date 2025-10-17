import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import CartItem from '../Cart/CartItem'
import UserAllOrderItem from '../User/UserAllOrderItem'
import GetOrderDetalisHook from './../../hook/admin/get-order-detalis-hook';
import ChangeOrderStatusHook from './../../hook/admin/change-order-status-hook';
import { ToastContainer } from 'react-toastify';

const AdminOrderDetalis = () => {
    const { id } = useParams()
    const [orderData, cartItems, loading] = GetOrderDetalisHook(id)

    const [formatDate, onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder] = ChangeOrderStatusHook(id)

    // إذا كان هناك تحميل
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">جاري التحميل...</span>
                    </div>
                    <p>جاري تحميل تفاصيل الطلب...</p>
                </div>
            </div>
        )
    }
    
    // إذا لم يتم العثور على بيانات الطلب
    if (!orderData || Object.keys(orderData).length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                    <div className="alert alert-warning" role="alert">
                        <h4>لم يتم العثور على الطلب</h4>
                        <p>الطلب الذي تبحث عنه غير موجود أو تم حذفه</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>

            <UserAllOrderItem orderItem={orderData} />

            <Row className="justify-content-center mt-4 user-data">
                <Col xs="12" className=" d-flex">
                    <div className="admin-content-text py-2">تفاصيل العميل</div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        الاسم:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {orderData ? orderData.user ? orderData.user.name : '' : ''}
                    </div>
                </Col>

                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        رقم الهاتف:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {orderData ? orderData.user ? orderData.user.phone : '' : ''}
                    </div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        الايميل:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {orderData ? orderData.user ? orderData.user.email : '' : ''}
                    </div>
                </Col>
                <div className="d-flex mt-2 justify-content-center">
                    <div>
                        <select
                            name="pay"
                            id="paid"
                            onChange={onChangePaid}
                            className="select input-form-area mt-1  text-center w-50">
                            <option value="0">الدفع</option>
                            <option value="true">تم</option>
                            <option value="false">لم يتم</option>
                        </select>
                        <button onClick={changePayOrder} className="btn-a px-2 d-inline mx-1 ">حفظ </button>
                    </div>
                    <div>
                        <select
                            onChange={onChangeDeliver}
                            name="deliver"
                            id="deliver"
                            className="select input-form-area mt-1  text-center  w-50">
                            <option value="0">التوصيل</option>
                            <option value="true">تم</option>
                            <option value="false">لم يتم</option>
                        </select>
                        <button onClick={changeDeliverOrder} className="btn-a px-2 d-inline mx-1 ">حفظ </button>
                    </div>
                </div>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default AdminOrderDetalis
