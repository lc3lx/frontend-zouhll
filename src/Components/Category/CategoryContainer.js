import React from 'react'
import { Container, Row } from 'react-bootstrap'
import CategoryCard from './../Category/CategoryCard';
import CategoryCardSkeleton from '../Uitily/CategoryCardSkeleton';

const CategoryContainer = ({ data, loading }) => {
    const colors = ["#FFD3E8", "#F4DBA5", "#55CFDF", "#FF6262", "#0034FF", "#FFD3E8"]
    
    return (
        <Container>
            <Row className='my-2 d-flex justify-content-between'>
                {loading ? (
                    // Show skeleton loaders while loading
                    Array.from({ length: 12 }).map((_, index) => (
                        <CategoryCardSkeleton key={index} />
                    ))
                ) : data && data.length > 0 ? (
                    data.map((item, index) => (
                        <CategoryCard 
                            key={index} 
                            id={item._id} 
                            title={item.name} 
                            img={item.image} 
                            background={colors[Math.floor(Math.random() * 5) + 1]} 
                        />
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <p style={{ color: "#888", fontWeight: 600 }}>لا يوجد تصنيفات</p>
                    </div>
                )}
            </Row>
        </Container>
    )
}

export default CategoryContainer
