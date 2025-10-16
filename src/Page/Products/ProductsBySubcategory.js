import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SearchCountResult from '../../Components/Uitily/SearchCountResult';
import SideFilter from '../../Components/Uitily/SideFilter';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import Pagination from '../../Components/Uitily/Pagination';
import ViewSearchProductsHook from '../../hook/products/view-search-products-hook';

const ProductsBySubcategory = () => {
    const { id } = useParams();
    
    const [
        items,
        pagination,
        onPress,
        getProduct
    ] = ViewSearchProductsHook();

    React.useEffect(() => {
        getProduct(`/api/v1/products?subcategory=${id}`);
    }, [id, getProduct]);

    return (
        <div style={{ minHeight: '670px' }}>
            <Container>
                <SearchCountResult 
                    title={`منتجات التصنيف الفرعي`}
                    onClick={onPress} 
                />
                
                <Row className='d-flex flex-row'>
                    <Col sm="2" xs="2" md="1" className='d-flex'>
                        <SideFilter />
                    </Col>
                    <Col sm="10" xs="10" md="11">
                        <CardProductsContainer products={items} title="" btntitle="" />
                    </Col>
                </Row>
                
                {pagination && pagination.numberOfPages >= 2 ? (
                    <Pagination 
                        pageCount={pagination.numberOfPages} 
                        onPress={onPress} 
                    />
                ) : null}
            </Container>
        </div>
    );
};

export default ProductsBySubcategory;
