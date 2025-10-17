import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, InputGroup, Dropdown, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AmazonStyleNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = [
    'الكل',
    'الإلكترونيات',
    'الأزياء',
    'المنزل والحديقة',
    'الرياضة واللياقة',
    'الكتب',
    'الألعاب',
    'الجمال والعناية',
    'السيارات'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('البحث عن:', searchQuery, 'في فئة:', selectedCategory);
  };

  return (
    <>
      {/* Top Header */}
      <div style={{
        background: '#131921',
        color: 'white',
        padding: '8px 0',
        fontSize: '0.85rem'
      }}>
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3">
              <Link to="/delivery" style={{ color: 'white', textDecoration: 'none' }}>
                📍 التوصيل إلى القاهرة 12345
              </Link>
            </div>
            <div className="d-flex gap-3">
              <Link to="/account" style={{ color: 'white', textDecoration: 'none' }}>
                مرحباً، تسجيل الدخول
              </Link>
              <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>
                الطلبات والإرجاع
              </Link>
              <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
                العربة
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <Navbar 
        expand="lg" 
        style={{
          background: '#232f3e',
          padding: '10px 0',
          borderBottom: '1px solid #3a4553'
        }}
        variant="dark"
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
            marginLeft: '20px'
          }}>
            <span style={{ color: '#ff9900' }}>زوحال</span>
          </Navbar.Brand>

          {/* Search Bar */}
          <div className="flex-grow-1 mx-3" style={{ maxWidth: '600px' }}>
            <Form onSubmit={handleSearch}>
              <InputGroup>
                {/* Category Dropdown */}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    style={{
                      background: '#f3f3f3',
                      border: 'none',
                      borderRadius: '4px 0 0 4px',
                      color: '#0f1111',
                      fontSize: '0.9rem',
                      minWidth: '120px',
                      textAlign: 'right'
                    }}
                  >
                    {selectedCategory}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {categories.map((category) => (
                      <Dropdown.Item
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{ textAlign: 'right' }}
                      >
                        {category}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                {/* Search Input */}
                <Form.Control
                  type="text"
                  placeholder="ابحث في زوحال..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    fontSize: '0.95rem',
                    textAlign: 'right'
                  }}
                />

                {/* Search Button */}
                <InputGroup.Text
                  as="button"
                  type="submit"
                  style={{
                    background: '#febd69',
                    border: 'none',
                    borderRadius: '0 4px 4px 0',
                    cursor: 'pointer',
                    padding: '8px 12px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f3a847';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#febd69';
                  }}
                >
                  🔍
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </div>

          {/* Right Side Icons */}
          <div className="d-flex align-items-center gap-3">
            {/* Language */}
            <div style={{ color: 'white', fontSize: '0.9rem' }}>
              🇪🇬 العربية
            </div>

            {/* Account */}
            <Link
              to="/account"
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.9rem',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.8rem' }}>مرحباً، أحمد</div>
              <div style={{ fontWeight: 'bold' }}>الحساب والقوائم</div>
            </Link>

            {/* Orders */}
            <Link
              to="/orders"
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.9rem',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.8rem' }}>الإرجاع</div>
              <div style={{ fontWeight: 'bold' }}>والطلبات</div>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              style={{
                color: 'white',
                textDecoration: 'none',
                position: 'relative',
                fontSize: '1.5rem'
              }}
            >
              🛒
              <Badge
                bg="warning"
                text="dark"
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  fontSize: '0.7rem'
                }}
              >
                3
              </Badge>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginTop: '2px'
              }}>
                العربة
              </div>
            </Link>
          </div>
        </Container>
      </Navbar>

      {/* Categories Navigation */}
      <div style={{
        background: '#37475a',
        padding: '8px 0',
        borderBottom: '1px solid #3a4553'
      }}>
        <Container>
          <div className="d-flex align-items-center gap-4 flex-wrap">
            <Link
              to="/categories"
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                padding: '5px 10px',
                borderRadius: '3px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              📋 جميع الفئات
            </Link>

            {categories.slice(1, 7).map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  padding: '5px 8px',
                  borderRadius: '3px',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                {category}
              </Link>
            ))}

            <Link
              to="/deals"
              style={{
                color: '#ff9900',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                padding: '5px 10px',
                borderRadius: '3px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,153,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              🔥 عروض اليوم
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AmazonStyleNavbar;
