import React from 'react'
import BrandCard from './BrandCard'
import BrandCardSkeleton from '../Uitily/BrandCardSkeleton';
import { Container, Row } from 'react-bootstrap';

const BrandContainer = ({ data, loading }) => {
    return (
        <Container>
            <Row className='my-1 d-flex justify-content-between'>
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
                        <p style={{ color: "#888", fontWeight: 600 }}>لا يوجد ماركات</p>
                    </div>
                )}
            </Row>
        </Container>
    )
}

export default BrandContainer
