import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AmazonStyleFooter = () => {
  return (
    <footer className="amazon-footer">
      {/* Back to Top */}
      <div 
        style={{
          background: '#37475a',
          padding: '15px 0',
          textAlign: 'center',
          cursor: 'pointer',
          borderTop: '1px solid #3a4553'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span style={{ color: 'white', fontSize: '0.9rem' }}>
          العودة إلى الأعلى
        </span>
      </div>

      {/* Main Footer Content */}
      <div style={{ background: '#232f3e', padding: '40px 0' }}>
        <Container>
          <Row>
            {/* تعرف علينا */}
            <Col lg={3} md={6} className="amazon-footer-section">
              <h5 className="amazon-footer-title">تعرف علينا</h5>
              <Link to="/about" className="amazon-footer-link">معلومات عنا</Link>
              <Link to="/careers" className="amazon-footer-link">الوظائف</Link>
              <Link to="/press" className="amazon-footer-link">البيانات الصحفية</Link>
              <Link to="/investor-relations" className="amazon-footer-link">علاقات المستثمرين</Link>
              <Link to="/sustainability" className="amazon-footer-link">الاستدامة</Link>
            </Col>

            {/* اربح المال معنا */}
            <Col lg={3} md={6} className="amazon-footer-section">
              <h5 className="amazon-footer-title">اربح المال معنا</h5>
              <Link to="/sell" className="amazon-footer-link">بيع المنتجات على زوحال</Link>
              <Link to="/business" className="amazon-footer-link">بيع تحت علامة زوحال التجارية</Link>
              <Link to="/affiliate" className="amazon-footer-link">كن شريك تابع</Link>
              <Link to="/advertise" className="amazon-footer-link">الإعلان على المنتجات</Link>
              <Link to="/publish" className="amazon-footer-link">انشر كتابك</Link>
            </Col>

            {/* طرق الدفع */}
            <Col lg={3} md={6} className="amazon-footer-section">
              <h5 className="amazon-footer-title">طرق الدفع زوحال</h5>
              <Link to="/credit-card" className="amazon-footer-link">بطاقة زوحال الائتمانية</Link>
              <Link to="/shop-with-points" className="amazon-footer-link">تسوق بالنقاط</Link>
              <Link to="/reload-balance" className="amazon-footer-link">إعادة تحميل الرصيد</Link>
              <Link to="/currency-converter" className="amazon-footer-link">محول العملات</Link>
            </Col>

            {/* دعنا نساعدك */}
            <Col lg={3} md={6} className="amazon-footer-section">
              <h5 className="amazon-footer-title">دعنا نساعدك</h5>
              <Link to="/account" className="amazon-footer-link">حسابك</Link>
              <Link to="/orders" className="amazon-footer-link">طلباتك</Link>
              <Link to="/shipping" className="amazon-footer-link">أسعار وسياسات الشحن</Link>
              <Link to="/returns" className="amazon-footer-link">الإرجاع والاستبدال</Link>
              <Link to="/content" className="amazon-footer-link">إدارة المحتوى والأجهزة</Link>
              <Link to="/help" className="amazon-footer-link">مساعدة</Link>
            </Col>
          </Row>

          {/* Divider */}
          <hr style={{ borderColor: '#3a4553', margin: '30px 0' }} />

          {/* Logo and Language */}
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <span style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    <span style={{ color: '#ff9900' }}>زوحال</span>
                  </span>
                </Link>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-end gap-3">
                <div style={{
                  border: '1px solid #3a4553',
                  borderRadius: '3px',
                  padding: '5px 10px',
                  color: 'white',
                  fontSize: '0.85rem'
                }}>
                  🌐 العربية
                </div>
                <div style={{
                  border: '1px solid #3a4553',
                  borderRadius: '3px',
                  padding: '5px 10px',
                  color: 'white',
                  fontSize: '0.85rem'
                }}>
                  💵 USD - دولار
                </div>
                <div style={{
                  border: '1px solid #3a4553',
                  borderRadius: '3px',
                  padding: '5px 10px',
                  color: 'white',
                  fontSize: '0.85rem'
                }}>
                  🇸🇾 سوريا
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Bottom Footer */}
      <div style={{
        background: '#131921',
        padding: '20px 0',
        borderTop: '1px solid #3a4553'
      }}>
        <Container>
          <Row>
            <Col>
              <div className="text-center">
                <div className="d-flex justify-content-center flex-wrap gap-4 mb-3">
                  <Link to="/conditions" className="amazon-footer-link" style={{ fontSize: '0.8rem' }}>
                    شروط الاستخدام
                  </Link>
                  <Link to="/privacy" className="amazon-footer-link" style={{ fontSize: '0.8rem' }}>
                    إشعار الخصوصية
                  </Link>
                  <Link to="/interest-ads" className="amazon-footer-link" style={{ fontSize: '0.8rem' }}>
                    الإعلانات المبنية على الاهتمام
                  </Link>
                  <Link to="/cookies" className="amazon-footer-link" style={{ fontSize: '0.8rem' }}>
                    ملفات تعريف الارتباط
                  </Link>
                </div>
                
                <div style={{ color: '#999', fontSize: '0.8rem' }}>
                  © 1996-2024، زوحال.كوم، Inc. أو الشركات التابعة لها
                </div>
              </div>
            </Col>
          </Row>

          {/* International Sites */}
          <Row className="mt-4">
            <Col>
              <div className="text-center">
                <div style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '10px' }}>
                  مواقع زوحال العالمية:
                </div>
                <div className="d-flex justify-content-center flex-wrap gap-3">
                  {[
                    { country: 'السعودية', flag: '🇸🇦' },
                    { country: 'الإمارات', flag: '🇦🇪' },
                    { country: 'الكويت', flag: '🇰🇼' },
                    { country: 'قطر', flag: '🇶🇦' },
                    { country: 'البحرين', flag: '🇧🇭' },
                    { country: 'عمان', flag: '🇴🇲' },
                    { country: 'الأردن', flag: '🇯🇴' },
                    { country: 'لبنان', flag: '🇱🇧' }
                  ].map((site) => (
                    <Link
                      key={site.country}
                      to={`/${site.country.toLowerCase()}`}
                      style={{
                        color: '#ccc',
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        padding: '3px 6px',
                        borderRadius: '3px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'white';
                        e.target.style.background = 'rgba(255,255,255,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#ccc';
                        e.target.style.background = 'transparent';
                      }}
                    >
                      {site.flag} {site.country}
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default AmazonStyleFooter;
