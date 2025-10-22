import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSecondaryCategories } from "../../redux/actions/secondaryCategoryAction";

const useAllSecondaryCategoryPageHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSecondaryCategories("limit=100&sort=name"));
  }, [dispatch]);

  const secondaryCategories = useSelector(
    (state) => state.secondaryCategory.allSecondaryCategories
  );
  const loading = useSelector((state) => state.secondaryCategory.loading);

  return [secondaryCategories, loading];
};

export default useAllSecondaryCategoryPageHook;
