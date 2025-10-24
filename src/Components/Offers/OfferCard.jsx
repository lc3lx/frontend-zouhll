// Components/Offers/OfferCard.jsx
import React from "react";
import { Card, Badge } from "react-bootstrap";

const OfferCard = ({ offer }) => {
  const isExpired = new Date(offer.endDate) < new Date();

  return (
    <Card
      className="offer-card"
      style={{
        background: `linear-gradient(135deg, ${offer.color.primary} 0%, ${offer.color.secondary} 100%)`,
        color: "white",
      }}
    >
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="offer-icon me-3">
            <i className="material-icons">{offer.icon}</i>
          </div>
          <div>
            <h5 className="mb-1">{offer.title}</h5>
            <p className="mb-2">{offer.description}</p>
            <Badge bg={isExpired ? "secondary" : "success"}>
              {offer.discount}
            </Badge>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default OfferCard;
