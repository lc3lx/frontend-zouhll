import React from 'react'
import { Container } from 'react-bootstrap'
import BrandContainer from '../../Components/Brand/BrandContainer'
import Pagination from '../../Components/Uitily/Pagination'
import AllBrandHook from '../../hook/brand/all-brand-page-hook'

const AllBrand = () => {
    const [brand, loading, pageCount, getPage] = AllBrandHook();
    
    return (
        <div style={{ 
            minHeight: '670px', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            paddingTop: '40px',
            paddingBottom: '40px'
        }}>
            <Container>
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
                            fontSize: "42px",
                            fontWeight: "900",
                            marginBottom: "15px",
                        }}
                    >
                        جميع الماركات
                    </h1>
                    <p style={{ color: "#4a5568", fontSize: "18px", margin: 0 }}>
                        تسوق من أشهر الماركات العالمية والمحلية
                    </p>
                </div>

                {/* Brands Grid */}
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
                    <BrandContainer data={brand.data} loading={loading} />
                </div>

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="d-flex justify-content-center">
                        <Pagination pageCount={pageCount} onPress={getPage} />
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllBrand
