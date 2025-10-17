import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import Pagination from '../../Components/Uitily/Pagination'
import ProductsToolbar from '../../Components/Products/ProductsToolbar'
import ProductsFilter from '../../Components/Products/ProductsFilter'
import ViewSearchProductsHook from './../../hook/products/view-search-products-hook'
import '../../Components/Products/AmazonStyle.css';

const ShopProductsPage = () => {
    const [items, pagination, onPress, , results, loading] = ViewSearchProductsHook();
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
        <div className="amazon-products-page" style={{ minHeight: '100vh', background: '#f3f3f3' }}>
            <CategoryHeader />
            
            {/* Breadcrumb */}
            <div className="amazon-breadcrumb">
                <Container>
                    <div style={{ padding: '4px 0' }}>
                        <a href="/" style={{ textDecoration: 'none' }}>الرئيسية</a>
                        <span className="mx-2">›</span>
                        <span>المنتجات</span>
                    </div>
                </Container>
            </div>

            <Container fluid style={{ maxWidth: '1500px', padding: '16px' }}>
                <Row>
                    {/* Amazon-style Left Sidebar Filter */}
                    <Col lg={3} className="d-none d-lg-block">
                        <div className="amazon-sidebar-filter" style={{
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '16px'
                        }}>
                            <h6 style={{ 
                                fontWeight: '700', 
                                color: '#0f1111', 
                                marginBottom: '16px',
                                fontSize: '16px'
                            }}>
                                تصفية النتائج
                            </h6>
                            
                            {/* Price Filter */}
                            <div className="amazon-filter-section">
                                <h6 style={{ fontWeight: '600', color: '#0f1111', marginBottom: '12px', fontSize: '14px' }}>
                                    السعر
                                </h6>
                                <div>
                                    <div className="amazon-filter-option">أقل من $25</div>
                                    <div className="amazon-filter-option">$25 إلى $50</div>
                                    <div className="amazon-filter-option">$50 إلى $100</div>
                                    <div className="amazon-filter-option">$100 إلى $200</div>
                                    <div className="amazon-filter-option">أكثر من $200</div>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="amazon-filter-section">
                                <h6 style={{ fontWeight: '600', color: '#0f1111', marginBottom: '12px', fontSize: '14px' }}>
                                    تقييم العملاء
                                </h6>
                                <div>
                                    <div className="amazon-filter-option" style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: '#ff9900', marginLeft: '4px' }}>★★★★★</span>
                                        <span>وأعلى</span>
                                    </div>
                                    <div className="amazon-filter-option" style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: '#ff9900', marginLeft: '4px' }}>★★★★</span>
                                        <span>وأعلى</span>
                                    </div>
                                    <div className="amazon-filter-option" style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: '#ff9900', marginLeft: '4px' }}>★★★</span>
                                        <span>وأعلى</span>
                                    </div>
                                </div>
                            </div>

                            {/* Brand Filter */}
                            <div className="amazon-filter-section">
                                <h6 style={{ fontWeight: '600', color: '#0f1111', marginBottom: '12px', fontSize: '14px' }}>
                                    الماركة
                                </h6>
                                <div>
                                    <div className="amazon-filter-option">Apple</div>
                                    <div className="amazon-filter-option">Samsung</div>
                                    <div className="amazon-filter-option">Sony</div>
                                    <div className="amazon-filter-option">Nike</div>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Main Content */}
                    <Col lg={9}>
                        {/* Amazon-style Toolbar */}
                        <div className="amazon-toolbar">
                            <div style={{ fontSize: '14px', color: '#565959' }}>
                                {results > 0 ? (
                                    <>
                                        <span style={{ fontWeight: '600', color: '#0f1111' }}>1-{Math.min(16, results)}</span>
                                        <span> من أكثر من {results} نتيجة</span>
                                    </>
                                ) : (
                                    'لا توجد نتائج'
                                )}
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <button
                                    className="amazon-filter-button d-lg-none"
                                    onClick={handleFilterToggle}
                                >
                                    فلترة
                                </button>
                                
                                <select
                                    className="amazon-sort-select"
                                    value={sortBy}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                >
                                    <option value="default">ترتيب حسب: المميز</option>
                                    <option value="price-low">السعر: من الأقل للأعلى</option>
                                    <option value="price-high">السعر: من الأعلى للأقل</option>
                                    <option value="rating">تقييم العملاء</option>
                                    <option value="newest">الأحدث</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div style={{
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '16px'
                        }}>
                            <CardProductsContainer 
                                products={items} 
                                title="" 
                                btntitle="" 
                                loading={loading}
                            />
                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-center">
                            <Pagination pageCount={pageCount} onPress={onPress} />
                        </div>
                    </Col>
                </Row>

                {/* Mobile Filter Sidebar */}
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
