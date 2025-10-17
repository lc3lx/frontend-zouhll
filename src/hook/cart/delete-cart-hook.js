import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createBrand } from '../../redux/actions/brandAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction'
import { clearAllCartItem, deleteCartItem, updateCartItem, getAllUserCartItems } from './../../redux/actions/cartAction';

const DeleteCartHook = (item) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [itemCount, setItemCount] = useState(0)

    const handelDeleteCart = async () => {
        setLoading(true)
        await dispatch(clearAllCartItem())
        await dispatch(getAllUserCartItems())
        setLoading(false)
    }
    const onChangeCount = (e) => {
        const val = parseInt(e.target.value, 10)
        setItemCount(Number.isNaN(val) || val < 1 ? 1 : val)
    }
    useEffect(() => {
        if (item) {
            // استخدام quantity بدلاً من count
            setItemCount(item.quantity || item.count || 1)
        }
    }, [item])
    const res = useSelector(state => state.cartReducer.clearCart)
    useEffect(() => {
        if (loading === false) {
            if (res === "") {
                notify("تم الحذف بنجاح", "success")
            } else {
            }

        }
    }, [loading])


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //const dispatch = useDispatch();

    const handelDeleteItem = async () => {
        await dispatch(deleteCartItem(item._id))
        await dispatch(getAllUserCartItems())
        setShow(false);
    }

    const handeleUpdateCart = async (nextCount) => {
        try {
            const qty = Number(nextCount ?? itemCount)
            await dispatch(updateCartItem(item._id, {
                quantity: qty
            }))
            await dispatch(getAllUserCartItems())
            return true;
        } catch (error) {
            console.error('Error updating cart:', error);
            return false;
        }
    }

    return [handelDeleteCart, show, handleClose, handleShow, handelDeleteItem, itemCount, onChangeCount, handeleUpdateCart]

}

export default DeleteCartHook