import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductGallery from './ProductGallery'
import ProductText from './ProductText'

const ProductDetalis = () => {
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    return (
        <div>
            <Row className='py-3'>
                <Col lg="4">
                    <ProductGallery selectedVariantIndex={selectedVariantIndex} />
                </Col>

                <Col lg="8">

                    <ProductText 
                      selectedVariantIndex={selectedVariantIndex}
                      setSelectedVariantIndex={setSelectedVariantIndex}
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetalis
