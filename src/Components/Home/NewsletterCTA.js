import React from "react";
import { Container } from "react-bootstrap";

const NewsletterCTA = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        padding: "80px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          opacity: 0.8,
        }}
      />

      <Container style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ 
          fontWeight: 900, 
          marginBottom: "20px",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)"
        }}>
          ابق على اطلاع دائم
        </h2>
        <p style={{ 
          opacity: 0.95, 
          marginBottom: "40px",
          fontSize: "1.2rem",
          maxWidth: "600px",
          margin: "0 auto 40px"
        }}>
          اشترك في نشرتنا البريدية واحصل على عروض حصرية وآخر المنتجات قبل الجميع
        </p>
        
        <div
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "30px",
            maxWidth: "500px",
            margin: "0 auto",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        >
          <div
            className="d-flex flex-column flex-sm-row justify-content-center align-items-center"
            style={{ gap: "15px" }}
          >
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              style={{
                padding: "15px 20px",
                borderRadius: "50px",
                border: "none",
                flex: 1,
                minWidth: "250px",
                fontSize: "1rem",
                outline: "none"
              }}
            />
            <button
              style={{
                background: "white",
                color: "#667eea",
                borderRadius: "50px",
                padding: "15px 30px",
                fontWeight: 700,
                border: "none",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}
            >
              اشترك الآن
            </button>
          </div>
          
          <p style={{ 
            fontSize: "0.85rem", 
            opacity: 0.8, 
            marginTop: "15px",
            marginBottom: 0
          }}>
            لا نرسل رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default NewsletterCTA;
