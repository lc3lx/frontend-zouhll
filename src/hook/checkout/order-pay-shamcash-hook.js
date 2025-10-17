import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrderShamCash } from '../../redux/actions/checkoutAction';
import { clearAllCartItem } from '../../redux/actions/cartAction';
import notify from '../useNotifaction';
import GetAllUserCartHook from '../cart/get-all-user-cart-hook';

const OrderPayShamCashHook = () => {
    const [loading, setLoading] = useState(true);
    const [addressDetalis, setAddressDetalis] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [transactionId, setTransactionId] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [, , , , , cartID] = GetAllUserCartHook();
    
    // جلب العناوين من Redux
    const resAddress = useSelector(state => state.userAddressesReducer.allAddresses);
    
    useEffect(() => {
        if (resAddress && resAddress.data) {
            setAddressDetalis(resAddress.data);
        }
    }, [resAddress]);

    // اختيار العنوان
    const handelChooseAddress = (e) => {
        if (e.target.value !== "0") {
            const selectedAddress = addressDetalis.find(item => item._id === e.target.value);
            setAddressDetalis(selectedAddress);
        }
    };

    // إنشاء طلب ShamCash
    const handelCreateOrderShamCash = async () => {
        if (!addressDetalis || !addressDetalis._id) {
            notify("يرجى اختيار عنوان للشحن", "warn");
            return;
        }
        
        if (!phoneNumber || !transactionId) {
            notify("يرجى إدخال رقم الهاتف ومعرف المعاملة", "warn");
            return;
        }

        setLoading(true);
        
        await dispatch(createOrderShamCash(cartID, {
            shippingAddress: {
                details: addressDetalis.alias || addressDetalis.details || "",
                phone: addressDetalis.phone,
                city: addressDetalis.city || "",
                postalCode: addressDetalis.postalCode || "",
            },
            phoneNumber: phoneNumber,
            transactionId: transactionId
        }));
        
        setLoading(false);
    };

    // مراقبة نتيجة إنشاء الطلب
    const res = useSelector(state => state.checkoutReducer.createOrderShamCash);
    
    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 201) {
                notify("تم إنشاء الطلب بنجاح، في انتظار الموافقة على الدفع", "success");
                setTimeout(() => {
                    dispatch(clearAllCartItem());
                    navigate('/user/allorders');
                }, 1000);
            } else if (res && res.status === 400) {
                notify("فشل في إنشاء الطلب - " + res.data.message, "error");
            } else if (res && res.status === 404) {
                notify("العربة غير موجودة", "error");
            }
        }
    }, [loading, res, dispatch, navigate]);

    return [
        handelChooseAddress,
        addressDetalis,
        handelCreateOrderShamCash,
        phoneNumber,
        setPhoneNumber,
        transactionId,
        setTransactionId
    ];
};

export default OrderPayShamCashHook;
