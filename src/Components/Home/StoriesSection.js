import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FiPlay, FiX } from "react-icons/fi";

const StoriesSection = () => {
  const [activeStory, setActiveStory] = useState(null);
  const [progress, setProgress] = useState(0);

  const stories = [
    {
      id: 1,
      title: "عروض الصيف",
      thumbnail: "/api/placeholder/80/80",
      image: "/api/placeholder/400/600",
      content: "خصومات تصل إلى 70% على جميع المنتجات الصيفية",
      color: "#ff6b6b",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)"
    },
    {
      id: 2,
      title: "منتجات جديدة",
      thumbnail: "/api/placeholder/80/80",
      image: "/api/placeholder/400/600",
      content: "اكتشف أحدث المنتجات التي وصلت حديثاً",
      color: "#4ecdc4",
      gradient: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)"
    },
    {
      id: 3,
      title: "الأكثر مبيعاً",
      thumbnail: "/api/placeholder/80/80",
      image: "/api/placeholder/400/600",
      content: "المنتجات الأكثر طلباً من عملائنا",
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 4,
      title: "تخفيضات",
      thumbnail: "/api/placeholder/80/80",
      image: "/api/placeholder/400/600",
      content: "عروض محدودة الوقت لا تفوتها",
      color: "#f093fb",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 5,
      title: "إلكترونيات",
      thumbnail: "/api/placeholder/80/80",
      image: "/api/placeholder/400/600",
      content: "أحدث الأجهزة الإلكترونية بأفضل الأسعار",
      color: "#ffd93d",
      gradient: "linear-gradient(135deg, #ffd93d 0%, #ff9500 100%)"
    }
  ];

  useEffect(() => {
    if (activeStory) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setActiveStory(null);
            setProgress(0);
            return 0;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [activeStory]);

  const openStory = (story) => {
    setActiveStory(story);
    setProgress(0);
  };

  const closeStory = () => {
    setActiveStory(null);
    setProgress(0);
  };

  return (
    <>
      <div style={{ padding: "40px 0", background: "white" }}>
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 style={{ 
              fontSize: "1.5rem", 
              fontWeight: "700", 
              color: "#1a202c",
              margin: 0 
            }}>
              القصص
            </h3>
            <div style={{ 
              fontSize: "0.9rem", 
              color: "#718096",
              background: "rgba(102, 126, 234, 0.1)",
              padding: "4px 12px",
              borderRadius: "12px"
            }}>
              🔥 جديد
            </div>
          </div>

          {/* Stories Container */}
          <div 
            style={{
              display: "flex",
              gap: "15px",
              overflowX: "auto",
              paddingBottom: "10px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="stories-container"
          >
            {stories.map((story, index) => (
              <div
                key={story.id}
                onClick={() => openStory(story)}
                style={{
                  minWidth: "80px",
                  textAlign: "center",
                  cursor: "pointer",
                  animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: story.gradient,
                    padding: "3px",
                    marginBottom: "8px",
                    position: "relative",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = `0 8px 25px ${story.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: `url(${story.thumbnail}) center/cover`,
                      backgroundColor: "#f7fafc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: "5px",
                        right: "5px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      <FiPlay size={10} color={story.color} />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    color: "#4a5568",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "80px",
                  }}
                >
                  {story.title}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Story Modal */}
      {activeStory && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.3s ease-out",
          }}
          onClick={closeStory}
        >
          <div
            style={{
              width: "min(400px, 90vw)",
              height: "min(600px, 80vh)",
              borderRadius: "20px",
              background: activeStory.gradient,
              position: "relative",
              overflow: "hidden",
              animation: "scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bar */}
            <div
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                right: "50px",
                height: "3px",
                background: "rgba(255, 255, 255, 0.3)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "white",
                  borderRadius: "2px",
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            {/* Close Button */}
            <button
              onClick={closeStory}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.3)";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "scale(1)";
              }}
            >
              <FiX size={18} />
            </button>

            {/* Story Content */}
            <div
              style={{
                padding: "60px 30px 30px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                color: "white",
                textAlign: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "900",
                    marginBottom: "20px",
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  {activeStory.title}
                </h2>
                <p
                  style={{
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    opacity: 0.95,
                    textShadow: "0 1px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  {activeStory.content}
                </p>
              </div>

              <button
                style={{
                  background: "white",
                  color: activeStory.color,
                  border: "none",
                  borderRadius: "50px",
                  padding: "15px 30px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 12px 35px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                }}
              >
                تسوق الآن
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .stories-container::-webkit-scrollbar {
          display: none;
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default StoriesSection;
