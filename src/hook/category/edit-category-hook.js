import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCategory, getOneCategory } from '../../redux/actions/categoryAction';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction';
import avatar from '../../images/avatar.png';

const EditCategoryHook = (id) => {
    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const category = useSelector(state => state.allCategory.oneCategory);
    const res = useSelector(state => state.allCategory.category);

    // Load category data on component mount
    useEffect(() => {
        const loadCategoryData = async () => {
            setLoadingData(true);
            await dispatch(getOneCategory(id));
            setLoadingData(false);
        };
        if (id) {
            loadCategoryData();
        }
    }, [id, dispatch]);

    // Set form data when category is loaded
    useEffect(() => {
        if (category.data && !loadingData) {
            setName(category.data.name || '');
            setImg(category.data.image || avatar);
        }
    }, [category, loadingData]);

    // Handle name change
    const onChangeName = (event) => {
        event.persist();
        setName(event.target.value);
    };

    // Handle image change
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0]);
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (name === "") {
            notify('من فضلك أدخل اسم التصنيف', "warn");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        setLoading(true);
        setIsPress(true);
        await dispatch(updateCategory(id, formData));
        setLoading(false);
    };

    // Handle response
    useEffect(() => {
        if (loading === false && isPress) {
            setLoading(true);
            setTimeout(() => setIsPress(false), 1000);

            if (res.status === 200) {
                notify('تم تحديث التصنيف بنجاح', "success");
            } else {
                notify('هناك مشكلة في عملية التحديث', "error");
            }
        }
    }, [loading, isPress, res]);

    return [
        img,
        name,
        loading,
        isPress,
        handleSubmit,
        onImageChange,
        onChangeName,
        category,
    ];
};

export default EditCategoryHook;
