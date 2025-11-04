import React, { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import rate from "../../images/rate.png";
import Pagination from "../Uitily/Pagination";
import RateItem from "./RateItem";
import RatePost from "./RatePost";
import ViewAllReviewHook from "./../../hook/review/view-all-review-hook";
import { useParams } from "react-router-dom";
const RateContainer = ({ rateAvg, rateQty }) => {
  const { id } = useParams();
  const [allReview, onPress] = ViewAllReviewHook(id);

  // Calculate rating distribution
  const ratingDistribution = useMemo(() => {
    if (!allReview.data || !Array.isArray(allReview.data))
      return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    allReview.data.forEach((review) => {
      const rating = Math.round(review.ratings);
      if (rating >= 1 && rating <= 5) {
        distribution[rating]++;
      }
    });
    return distribution;
  }, [allReview.data]);

  const getPercentage = (count) => {
    if (!rateQty || rateQty === 0) return 0;
    return Math.round((count / rateQty) * 100);
  };

  return (
    <Container className="rate-container" style={{ padding: "0" }}>
      {/* Rating Summary Section */}
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "8px",
          border: "1px solid #e7e7e7",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "700",
                color: "#0f1111",
                lineHeight: "1",
              }}
            >
              {rateAvg?.toFixed(1) || "0.0"}
            </div>
            <div
              style={{
                display: "flex",
                gap: "2px",
                marginTop: "8px",
                justifyContent: "center",
              }}
            >
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < Math.floor(rateAvg || 0) ? "#ff9900" : "#ddd",
                    fontSize: "20px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <div
              style={{ fontSize: "14px", color: "#565959", marginTop: "8px" }}
            >
              {rateQty || 0} تقييم
            </div>
          </div>

          {/* Rating Distribution */}
          <div style={{ flex: 1, minWidth: "250px" }}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingDistribution[star] || 0;
              const percentage = getPercentage(count);
              return (
                <div
                  key={star}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#565959",
                      minWidth: "40px",
                    }}
                  >
                    {star} نجوم
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "8px",
                      background: "#f0f0f0",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background: percentage > 0 ? "#ff9900" : "#f0f0f0",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#565959",
                      minWidth: "35px",
                    }}
                  >
                    {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Review Section */}
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "8px",
          border: "1px solid #e7e7e7",
          marginBottom: "24px",
        }}
      >
        <h6
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#0f1111",
            marginBottom: "16px",
          }}
        >
          اكتب تقييمك
        </h6>
        <RatePost />
      </div>

      {/* Reviews List */}
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "8px",
          border: "1px solid #e7e7e7",
        }}
      >
        <h6
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#0f1111",
            marginBottom: "20px",
            paddingBottom: "12px",
            borderBottom: "2px solid #e7e7e7",
          }}
        >
          جميع التقييمات ({rateQty || 0})
        </h6>

        {allReview.data && allReview.data.length > 0 ? (
          <div>
            {allReview.data.map((review, index) => (
              <div
                key={index}
                style={{
                  marginBottom:
                    index < allReview.data.length - 1 ? "20px" : "0",
                  paddingBottom:
                    index < allReview.data.length - 1 ? "20px" : "0",
                  borderBottom:
                    index < allReview.data.length - 1
                      ? "1px solid #e7e7e7"
                      : "none",
                }}
              >
                <RateItem review={review} />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#565959",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⭐</div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              لا توجد تقييمات بعد
            </div>
            <div style={{ fontSize: "14px", color: "#999" }}>
              كن أول من يقيم هذا المنتج
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {allReview.paginationResult &&
      allReview.paginationResult.numberOfPages >= 2 ? (
        <div style={{ marginTop: "24px" }}>
          <Pagination
            pageCount={
              allReview.paginationResult
                ? allReview.paginationResult.numberOfPages
                : 0
            }
            onPress={onPress}
          />
        </div>
      ) : null}
    </Container>
  );
};

export default RateContainer;
