import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import notify from "../useNotifaction";
import {
  getPendingShamCashPayments,
  approveShamCashPayment,
  rejectShamCashPayment,
} from "../../redux/actions/orderAction";

const AdminShamCashPaymentsHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Get pending payments from Redux store
  const pendingPayments = useSelector(
    (state) => state.orderReducer.pendingShamCashPayments || []
  );

  // Fetch pending payments
  const refreshPayments = async () => {
    setLoading(true);
    try {
      await dispatch(getPendingShamCashPayments());
    } catch (error) {
      notify("حدث خطأ أثناء جلب البيانات", "error");
    } finally {
      setLoading(false);
    }
  };

  // Approve payment
  const approvePayment = async (orderId, adminNotes = "") => {
    try {
      const response = await dispatch(
        approveShamCashPayment(orderId, adminNotes)
      );

      if (response && response.status === "success") {
        notify("تم الموافقة على الدفع بنجاح", "success");
        return true;
      } else {
        notify("حدث خطأ أثناء الموافقة على الدفع", "error");
        return false;
      }
    } catch (error) {
      notify("حدث خطأ أثناء الموافقة على الدفع", "error");
      return false;
    }
  };

  // Reject payment
  const rejectPayment = async (orderId, adminNotes = "") => {
    try {
      const response = await dispatch(
        rejectShamCashPayment(orderId, adminNotes)
      );

      if (response && response.status === "success") {
        notify("تم رفض الدفع بنجاح", "success");
        return true;
      } else {
        notify("حدث خطأ أثناء رفض الدفع", "error");
        return false;
      }
    } catch (error) {
      notify("حدث خطأ أثناء رفض الدفع", "error");
      return false;
    }
  };

  useEffect(() => {
    refreshPayments();
  }, []);

  return [
    pendingPayments,
    loading,
    approvePayment,
    rejectPayment,
    refreshPayments,
  ];
};

export default AdminShamCashPaymentsHook;
