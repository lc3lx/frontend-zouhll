// Components/Offers/DynamicOfferBanner.jsx
import React, { useState, useEffect } from "react";
import { useBannerOffers } from "../hook/offers/useOffers";
import { Badge } from "react-bootstrap";

const DynamicOfferBanner = () => {
  const { data: offers, loading } = useBannerOffers();
  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    if (offers?.data?.length > 1) {
      const timer = setInterval(() => {
        setCurrentOffer((prev) => (prev + 1) % offers.data.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [offers]);

  if (loading || !offers?.data?.length) return null;

  const offer = offers.data[currentOffer];

  return (
    <div
      className="offer-banner"
      style={{
        background: `linear-gradient(135deg, ${offer.color.primary} 0%, ${offer.color.secondary} 100%)`,
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        textAlign: "center",
      }}
    >
      <h3>{offer.title}</h3>
      <p>{offer.description}</p>
      <Badge bg="light" text="dark" className="fs-6">
        {offer.discount}
      </Badge>
    </div>
  );
};
export default DynamicOfferBanner;
