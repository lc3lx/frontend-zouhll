import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import Pagination from '../../Components/Uitily/Pagination'
import SearchCountResult from '../../Components/Uitily/SearchCountResult'
import ProductsToolbar from '../../Components/Products/ProductsToolbar'
import ProductsFilter from '../../Components/Products/ProductsFilter'
import ViewSearchProductsHook from './../../hook/products/view-search-products-hook';

const ShopProductsPage = () => {
    const [items, pagination, onPress, getProduct, results] = ViewSearchProductsHook();
    const [sortBy, setSortBy] = useState("default");
    const [viewMode, setViewMode] = useState("grid");
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({});
    
    if (pagination)
        var pageCount = pagination;
    else
        pageCount = 0;

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
        // TODO: Implement sorting logic
    };

    const handleViewModeChange = (newMode) => {
        setViewMode(newMode);
    };

    const handleFilterToggle = () => {
        setShowFilter(true);
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        // TODO: Implement filtering logic
    };

    return (
        <div style={{ minHeight: '670px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
            <CategoryHeader />
            <Container>
                {/* Modern toolbar */}
                <ProductsToolbar
                    totalProducts={results || 0}
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
                <div className="d-flex justify-content-center">
                    <Pagination pageCount={pageCount} onPress={onPress} />
                </div>

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

export default ShopProductsPage
