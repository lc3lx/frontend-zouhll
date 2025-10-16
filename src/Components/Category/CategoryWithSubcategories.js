import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getOneCategory as getSubCategory } from '../../redux/actions/subcategoryAction';
import { getCategoryImage } from '../../utils/imageHelper';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './CategoryWithSubcategories.css';

const CategoryWithSubcategories = () => {
    const dispatch = useDispatch();
    const [expandedCategories, setExpandedCategories] = useState({});

    useEffect(() => {
        dispatch(getAllCategory(100));
    }, [dispatch]);

    const categories = useSelector(state => state.allCategory.category);
    const subcategories = useSelector(state => state.subCategory.subcategory);

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));

        // Load subcategories if not already loaded
        if (!expandedCategories[categoryId]) {
            dispatch(getSubCategory(categoryId));
        }
    };

    const getSubcategoriesForCategory = (categoryId) => {
        if (!subcategories || !subcategories.data) return [];
        return subcategories.data.filter(sub => sub.category === categoryId || sub.category._id === categoryId) || [];
    };

    return (
        <Container className="py-4">
            <div className="text-center mb-4">
                <h2 className="category-main-title">تصفح التصنيفات</h2>
                <p className="text-muted">اكتشف منتجاتنا المتنوعة عبر التصنيفات والأقسام الفرعية</p>
            </div>

            <Row>
                {categories?.data?.map((category) => (
                    <Col key={category._id} lg={6} className="mb-4">
                        <Card className="category-hierarchy-card h-100">
                            <div className="category-main-section">
                                <Row className="align-items-center">
                                    <Col xs={3}>
                                        <div className="category-image-container">
                                            <img
                                                src={getCategoryImage(category)}
                                                alt={category.name}
                                                className="category-main-image"
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={7}>
                                        <Link 
                                            to={`/products/category/${category._id}`}
                                            className="category-main-link"
                                        >
                                            <h4 className="category-main-name">{category.name}</h4>
                                        </Link>
                                    </Col>
                                    <Col xs={2}>
                                        <Button
                                            variant="link"
                                            onClick={() => toggleCategory(category._id)}
                                            className="expand-btn"
                                        >
                                            {expandedCategories[category._id] ? 
                                                <FiChevronUp size={20} /> : 
                                                <FiChevronDown size={20} />
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                            </div>

                            <Collapse in={expandedCategories[category._id]}>
                                <div className="subcategories-section">
                                    <div className="subcategories-divider"></div>
                                    <div className="subcategories-list">
                                        {getSubcategoriesForCategory(category._id).length > 0 ? (
                                            getSubcategoriesForCategory(category._id).map((subcategory) => (
                                                <Link
                                                    key={subcategory._id}
                                                    to={`/products/subcategory/${subcategory._id}`}
                                                    className="subcategory-item"
                                                >
                                                    <div className="subcategory-content">
                                                        <span className="subcategory-name">{subcategory.name}</span>
                                                        <span className="subcategory-arrow">←</span>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="no-subcategories">
                                                <span>لا توجد تصنيفات فرعية</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Collapse>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    );
};

export default CategoryWithSubcategories;
