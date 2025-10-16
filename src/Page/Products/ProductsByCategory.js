import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Pagination from '../../Components/Uitily/Pagination';
import CardProductsContainer from './../../Components/Products/CardProductsContainer';
import ProductsToolbar from '../../Components/Products/ProductsToolbar';
import ProductsFilter from '../../Components/Products/ProductsFilter';
import ModernBreadcrumb from '../../Components/Uitily/ModernBreadcrumb';
import { useParams } from 'react-router-dom';
import ViewAllProductsCategoryHook from './../../hook/products/view-all-products-category-hook';

const ProductsByCategory = () => {
    const { id } = useParams()
    const [items, pagination, onPress] = ViewAllProductsCategoryHook(id)
    const [sortBy, setSortBy] = useState("default");
    const [viewMode, setViewMode] = useState("grid");
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({});
    
    if (pagination)
        var pageCount = pagination
    else
        pageCount = 0

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
    };

    const handleViewModeChange = (newMode) => {
        setViewMode(newMode);
    };

    const handleFilterToggle = () => {
        setShowFilter(true);
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div style={{ 
            minHeight: '670px', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            paddingTop: '40px',
            paddingBottom: '40px'
        }}>
            <Container>
                {/* Breadcrumb */}
                <ModernBreadcrumb 
                    items={[
                        { label: "التصنيفات", link: "/allcategory" },
                        { label: "منتجات التصنيف" }
                    ]} 
                />

                {/* Page Header */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "25px",
                        padding: "40px",
                        marginBottom: "30px",
                        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
                        border: "2px solid rgba(102, 126, 234, 0.1)",
                        textAlign: "center",
                    }}
                >
                    <h1
                        style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: "36px",
                            fontWeight: "900",
                            marginBottom: "15px",
                        }}
                    >
                        منتجات التصنيف
                    </h1>
                    <p style={{ color: "#4a5568", fontSize: "16px", margin: 0 }}>
                        تصفح جميع المنتجات في هذا التصنيف
                    </p>
                </div>

                {/* Modern toolbar */}
                <ProductsToolbar
                    totalProducts={items?.length || 0}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                    onFilterToggle={handleFilterToggle}
                />

                {/* Products grid */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "25px",
                        padding: "30px",
                        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
                        border: "2px solid rgba(102, 126, 234, 0.1)",
                        marginBottom: "30px",
                    }}
                >
                    <CardProductsContainer 
                        products={items} 
                        title="" 
                        btntitle="" 
                        loading={false}
                    />
                </div>

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="d-flex justify-content-center">
                        <Pagination pageCount={pageCount} onPress={onPress} />
                    </div>
                )}

                {/* Filter sidebar */}
                <ProductsFilter
                    show={showFilter}
                    onHide={() => setShowFilter(false)}
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                />
            </Container>
        </div>
    )
}

export default ProductsByCategory