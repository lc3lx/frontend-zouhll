import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, InputGroup, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CategoryContainer from '../../Components/Category/CategoryContainer'
import Pagination from '../../Components/Uitily/Pagination'
import AllCategoryHook from '../../hook/category/all-category-page-hook'

const AllCategoryPage = () => {
    const [category, loading, pageCount, getPage] = AllCategoryHook();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter categories based on search
    const filteredCategories = category.data ? category.data.filter(cat => 
        cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: '#eaeded',
            fontFamily: "'Amazon Ember', Arial, sans-serif"
        }}>
            {/* Breadcrumb */}
            <div style={{ background: '#f3f3f3', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
                <Container>
                    <Breadcrumb style={{ margin: 0, background: 'transparent', padding: 0 }}>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>الرئيسية</Breadcrumb.Item>
                        <Breadcrumb.Item active>جميع التصنيفات</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </div>

            {/* Header */}
            <div style={{ background: '#fff', padding: '30px 0', borderBottom: '1px solid #ddd' }}>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{
                                fontSize: '2.5rem',
                                fontWeight: '700',
                                color: '#0f1111',
                                marginBottom: '10px'
                            }}>
                                جميع التصنيفات
                            </h1>
                            <p style={{
                                color: '#565959',
                                fontSize: '1rem',
                                marginBottom: '20px'
                            }}>
                                اكتشف مجموعتنا الشاملة من التصنيفات مع آلاف المنتجات
                            </p>

                            {/* Search */}
                            <Row>
                                <Col lg={6}>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="ابحث في التصنيفات..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{ fontSize: '0.95rem' }}
                                        />
                                        <InputGroup.Text style={{ background: '#febd69', border: 'none' }}>
                                            🔍
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Categories Grid */}
            <Container style={{ padding: '30px 0' }}>
                {loading ? (
                    <div className="text-center py-5">
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⏳</div>
                        <h3 style={{ color: '#565959' }}>جاري تحميل التصنيفات...</h3>
                    </div>
                ) : filteredCategories.length === 0 ? (
                    <div className="text-center py-5">
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
                        <h3 style={{ color: '#565959', marginBottom: '15px' }}>
                            لم يتم العثور على تصنيفات
                        </h3>
                        <p style={{ color: '#565959' }}>
                            جرب البحث بكلمات مختلفة أو تصفح جميع التصنيفات
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                color: '#0f1111',
                                margin: 0
                            }}>
                                {filteredCategories.length} تصنيف
                            </h2>
                        </div>

                        {/* Amazon Style Categories Container */}
                        <div style={{
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '20px'
                        }}>
                            <CategoryContainer data={filteredCategories} loading={loading} />
                        </div>
                    </>
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

export default AllCategoryPage
