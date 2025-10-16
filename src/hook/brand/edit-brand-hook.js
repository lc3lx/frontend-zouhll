import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBrand, getOneBrand } from '../../redux/actions/brandAction';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction';
import avatar from '../../images/avatar.png';

const EditBrandHook = (id) => {
    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const brand = useSelector(state => state.allBrand.oneBrand);
    const res = useSelector(state => state.allBrand.brand);

    // Load brand data on component mount
    useEffect(() => {
        const loadBrandData = async () => {
            setLoadingData(true);
            await dispatch(getOneBrand(id));
            setLoadingData(false);
        };
        if (id) {
            loadBrandData();
        }
    }, [id, dispatch]);

    // Set form data when brand is loaded
    useEffect(() => {
        if (brand.data && !loadingData) {
            setName(brand.data.name || '');
            setImg(brand.data.image || avatar);
        }
    }, [brand, loadingData]);

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
            notify('من فضلك أدخل اسم الماركة', "warn");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        setLoading(true);
        setIsPress(true);
        await dispatch(updateBrand(id, formData));
        setLoading(false);
    };

    // Handle response
    useEffect(() => {
        if (loading === false && isPress) {
            setLoading(true);
            setTimeout(() => setIsPress(false), 1000);

            if (res.status === 200) {
                notify('تم تحديث الماركة بنجاح', "success");
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
        brand,
    ];
};

export default EditBrandHook;
