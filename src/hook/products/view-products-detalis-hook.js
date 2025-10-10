import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneProduct,
  getProductLike,
  getProductYouLike,
} from "../../redux/actions/productsAction";
import mobile from "../../images/mobile.png";
import { getOneCategory } from "../../redux/actions/categoryAction";
import { getOneBrand } from "../../redux/actions/brandAction";
import { getImageUrl } from "../../utils/imageHelper";
const ViewProductsDetalisHook = (prodID) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneProduct(prodID));
  }, []);

  const oneProducts = useSelector((state) => state.allproducts.oneProduct);
  const oneCategory = useSelector((state) => state.allCategory.oneCategory);
  const oneBrand = useSelector((state) => state.allBrand.oneBrand);
  const productLike = useSelector((state) => state.allproducts.productLike);
  //to show products item
  let item = [];
  if (oneProducts && oneProducts.data) item = oneProducts.data;
  else item = [];

  useEffect(() => {
    if (item.category && item.category._id)
      dispatch(getOneCategory(item.category._id));
    if (item.brand && item.brand._id) dispatch(getOneBrand(item.brand._id));
    if (item.category && item.category._id)
      dispatch(getProductLike(item.category._id));
  }, [item]);

  //to view images gallery
  let images = [];
  if (item.images && item.images.length > 0)
    images = item.images.map((img) => {
      return { original: getImageUrl(img) };
    });
  else if (item.imageCover) {
    images = [{ original: getImageUrl(item.imageCover) }];
  } else {
    images = [{ original: `${mobile}` }];
  }

  //to show category item
  let cat = [];
  if (oneCategory.data) cat = oneCategory.data;
  else cat = [];

  //to show brand item
  let brand = [];
  if (oneBrand.data) brand = oneBrand.data;
  else brand = [];

  let prod = [];
  if (productLike) prod = productLike.data;
  else prod = [];
  return [item, images, cat, brand, prod];
};

export default ViewProductsDetalisHook;
