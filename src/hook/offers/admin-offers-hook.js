import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
} from "../../redux/actions/offerAction";
import { toast } from "react-toastify";

export const useAdminOffers = () => {
  const dispatch = useDispatch();
  const { offers, loading, error } = useSelector((state) => state.offers);

  // Extract offers data from the response
  const offersData = offers?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOffer, setEditingOffer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllOffers({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    dispatch(
      getAllOffers({
        page: 1,
        limit: 10,
        search: term,
        isActive:
          statusFilter === "all" ? undefined : statusFilter === "active",
      })
    );
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    dispatch(
      getAllOffers({
        page: 1,
        limit: 10,
        search: searchTerm,
        isActive: status === "all" ? undefined : status === "active",
      })
    );
  };

  const handleAddOffer = (offerData) => {
    dispatch(createOffer(offerData))
      .then(() => {
        toast.success("تم إضافة العرض بنجاح");
        dispatch(getAllOffers({ page: currentPage, limit: 10 }));
      })
      .catch((error) => {
        toast.error(error.message || "حدث خطأ في إضافة العرض");
      });
  };

  const handleEditOffer = (offerData) => {
    dispatch(updateOffer(editingOffer._id, offerData))
      .then(() => {
        toast.success("تم تحديث العرض بنجاح");
        setShowEditModal(false);
        setEditingOffer(null);
        dispatch(getAllOffers({ page: currentPage, limit: 10 }));
      })
      .catch((error) => {
        toast.error(error.message || "حدث خطأ في تحديث العرض");
      });
  };

  const handleDeleteOffer = () => {
    if (offerToDelete) {
      dispatch(deleteOffer(offerToDelete._id))
        .then(() => {
          toast.success("تم حذف العرض بنجاح");
          setShowDeleteModal(false);
          setOfferToDelete(null);
          dispatch(getAllOffers({ page: currentPage, limit: 10 }));
        })
        .catch((error) => {
          toast.error(error.message || "حدث خطأ في حذف العرض");
        });
    }
  };

  const handleToggleStatus = (offerId) => {
    dispatch(toggleOfferStatus(offerId))
      .then(() => {
        toast.success("تم تغيير حالة العرض بنجاح");
        dispatch(getAllOffers({ page: currentPage, limit: 10 }));
      })
      .catch((error) => {
        toast.error(error.message || "حدث خطأ في تغيير حالة العرض");
      });
  };

  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setShowEditModal(true);
  };

  const openDeleteModal = (offer) => {
    setOfferToDelete(offer);
    setShowDeleteModal(true);
  };

  const filteredOffers =
    offersData?.filter((offer) => {
      const matchesSearch =
        !searchTerm ||
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && offer.isActive) ||
        (statusFilter === "inactive" && !offer.isActive);

      return matchesSearch && matchesStatus;
    }) || [];

  return {
    offers: filteredOffers,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    editingOffer,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
    offerToDelete,
    handleSearch,
    handleStatusFilter,
    handleAddOffer,
    handleEditOffer,
    handleDeleteOffer,
    handleToggleStatus,
    openEditModal,
    openDeleteModal,
  };
};
