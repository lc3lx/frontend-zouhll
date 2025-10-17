import React, { useState } from 'react'
import { Container, Row, Col, Form, InputGroup, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import BrandContainer from '../../Components/Brand/BrandContainer'
import Pagination from '../../Components/Uitily/Pagination'
import AllBrandHook from '../../hook/brand/all-brand-page-hook'
import '../../Components/Products/AmazonStyle.css'

const AllBrand = () => {
    const [brand, loading, pageCount, getPage] = AllBrandHook();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter brands based on search
    const filteredBrands = brand.data ? brand.data.filter(brandItem => 
        brandItem.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
    
    return (
        <div className="amazon-products-page" style={{ minHeight: '100vh', background: '#f3f3f3' }}>
            <CategoryHeader />
            
            {/* Breadcrumb */}
            <div className="amazon-breadcrumb">
                <Container>
                    <div style={{ padding: '4px 0' }}>
                        <a href="/" style={{ textDecoration: 'none' }}>الرئيسية</a>
                        <span className="mx-2">›</span>
                        <span>العلامات التجارية</span>
                    </div>
                </Container>
            </div>

            <Container fluid style={{ maxWidth: '1500px', padding: '16px' }}>
                {/* Page Title */}
                <div className="amazon-page-title">
                    <h1>العلامات التجارية</h1>
                    <p>اكتشف أفضل العلامات التجارية العالمية والمحلية</p>
                </div>

                {/* Search Bar */}
                <div style={{
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '16px'
                }}>
                    <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
                        <FiSearch style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#999',
                            fontSize: '18px'
                        }} />
                        <input
                            type="text"
                            placeholder="البحث في العلامات التجارية..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="amazon-sort-select"
                            style={{
                                width: '100%',
                                padding: '12px 16px 12px 40px',
                                minWidth: 'auto'
                            }}
                        />
                    </div>
                </div>

                {/* Brands Count */}
                <div style={{
                    marginBottom: '16px',
                    fontSize: '14px',
                    color: '#565959'
                }}>
                    {filteredBrands.length > 0 ? (
                        <>
                            <span style={{ fontWeight: '600', color: '#0f1111' }}>
                                {filteredBrands.length}
                            </span>
                            <span> علامة تجارية</span>
                            {searchTerm && <span> من أصل {brand.data?.length || 0}</span>}
                        </>
                    ) : searchTerm ? (
                        'لا توجد علامات تجارية تطابق البحث'
                    ) : (
                        'لا توجد علامات تجارية'
                    )}
                </div>

                {/* Brands Grid */}
                {loading ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        background: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                        <div style={{ 
                            fontSize: '18px', 
                            fontWeight: '600', 
                            color: '#0f1111', 
                            marginBottom: '8px' 
                        }}>
                            جاري تحميل العلامات التجارية...
                        </div>
                    </div>
                ) : filteredBrands.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        background: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏪</div>
                        <div style={{ 
                            fontSize: '18px', 
                            fontWeight: '600', 
                            color: '#0f1111', 
                            marginBottom: '8px' 
                        }}>
                            {searchTerm ? 'لا توجد علامات تجارية تطابق البحث' : 'لا توجد علامات تجارية'}
                        </div>
                        <div style={{ fontSize: '14px', color: '#565959' }}>
                            {searchTerm ? 'جرب البحث بكلمات مختلفة' : 'لم يتم العثور على أي علامات تجارية'}
                        </div>
                    </div>
                ) : (
                    <div style={{
                        background: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '16px'
                    }}>
                        <BrandContainer data={filteredBrands} loading={loading} />
                    </div>
                )}

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <Pagination pageCount={pageCount} onPress={getPage} />
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllBrand
