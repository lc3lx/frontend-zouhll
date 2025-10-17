import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, getOneOrders } from '../../redux/actions/ordersAction';

const GetOrderDetalisHook = (id) => {
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch()


    const get = async () => {
        try {
            setLoading(true)
            await dispatch(getOneOrders(id))
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            get()
        }
    }, [id])

    //get address detalis for user
    const resOneOrder = useSelector(state => state.orderReducer.getOneOrder)
    
    useEffect(() => {
        if (loading === false) {
            console.log('resOneOrder:', resOneOrder);
            if (resOneOrder && resOneOrder.data) {
                setOrderData(resOneOrder.data);
                if (resOneOrder.data.cartItems) {
                    setCartItems(resOneOrder.data.cartItems);
                }
            } else {
                console.error('No order data found:', resOneOrder);
            }
        }
    }, [loading, resOneOrder])


    return [orderData, cartItems, loading]

}

export default GetOrderDetalisHook