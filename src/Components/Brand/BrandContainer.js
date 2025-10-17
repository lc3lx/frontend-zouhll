import React from 'react'
import BrandCard from './BrandCard'
import BrandCardSkeleton from '../Uitily/BrandCardSkeleton';
import { Container, Row } from 'react-bootstrap';

const BrandContainer = ({ data, loading }) => {
    return (
        <Row className='g-3'>
            {loading ? (
                // Show skeleton loaders while loading
                Array.from({ length: 12 }).map((_, index) => (
                    <BrandCardSkeleton key={index} />
                ))
            ) : data && data.length > 0 ? (
                data.map((item, index) => (
                    <BrandCard id={item._id} key={index} img={item.image} />
                ))
            ) : (
                <div className="col-12 text-center py-5">
                    <div style={{ 
                        color: "#666", 
                        fontSize: "16px",
                        padding: "40px 20px"
                    }}>
                        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏪</div>
                        <div style={{ fontWeight: "600", marginBottom: "8px" }}>لا توجد علامات تجارية</div>
                        <div style={{ fontSize: "14px", color: "#999" }}>جرب تغيير معايير البحث</div>
                    </div>
                </div>
            )}
        </Row>
    )
}

export default BrandContainer
