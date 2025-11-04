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
  if (item.category) {
    cat = item.category;
  } else if (oneCategory.data) {
    cat = oneCategory.data;
  } else {
    cat = [];
  }

  //to show brand item
  let brand = [];
  if (item.brand) {
    brand = item.brand;
  } else if (oneBrand && oneBrand.data) {
    brand = oneBrand.data;
  } else {
    brand = [];
  }

  //to show store item
  let store = [];
  if (item.store) {
    store = item.store;
  } else {
    store = [];
  }

  let prod = [];
  if (productLike && productLike.data) prod = productLike.data;
  else prod = [];

  // Debug logs
  console.log('Product item:', item);
  console.log('Category:', cat);
  console.log('Brand:', brand);
  console.log('Store:', store);

  return [item, images, cat, brand, store];
};

export default ViewProductsDetalisHook;
