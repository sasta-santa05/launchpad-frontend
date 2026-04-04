/* TrainingCard.jsx */
import React from 'react';
import './TrainingCard.css';

function StarRating({ rating }) {
  return (
    <div className="tcard__stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`tcard__star ${i <= Math.round(rating) ? 'tcard__star--filled' : ''}`}>★</span>
      ))}
      <span className="tcard__rating-num">{rating}</span>
    </div>
  );
}

export default function TrainingCard({ training, onOpenModal }) {
  const { title, provider, providerLogo, logoColor, rating, reviews,
          duration, level, price, originalPrice, tags, tagColor,
          enrolled, certificate, featured, description } = training;

  const discount = Math.round((1 - price / originalPrice) * 100);

  const handleClick = (e) => {
    e.preventDefault();
    if (onOpenModal) onOpenModal(training);
  };

  return (
    <div className="tcard" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {/* Thumbnail */}
      <div className="tcard__thumb" style={{ '--thumb-color': logoColor }}>
        <div className="tcard__thumb-inner">
          <span className="tcard__thumb-logo">{providerLogo}</span>
          {featured && <span className="tcard__thumb-badge">⚡ Popular</span>}
        </div>
        <div className="tcard__thumb-overlay">
          <span className="tcard__play">▶ Preview</span>
        </div>
      </div>

      {/* Body */}
      <div className="tcard__body">
        <div className="tcard__tags">
          {tags.slice(0, 2).map(tag => (
            <span key={tag} className={`tag tag-${tagColor}`}>{tag}</span>
          ))}
        </div>

        <h4 className="tcard__title">{title}</h4>
        <p className="tcard__provider">{provider}</p>
        <p className="tcard__desc">{description}</p>

        <StarRating rating={rating} />
        <p className="tcard__reviews">({reviews.toLocaleString()} reviews)</p>

        <div className="tcard__metas">
          <span className="tcard__meta-item">📅 {duration}</span>
          <span className="tcard__meta-item">📶 {level}</span>
          {certificate && <span className="tcard__meta-item">🏆 Certificate</span>}
        </div>

        <div className="tcard__price-row">
          <span className="tcard__price">₹{price.toLocaleString()}</span>
          <span className="tcard__price-original">₹{originalPrice.toLocaleString()}</span>
          <span className="tcard__discount">{discount}% off</span>
        </div>

        <div className="tcard__footer">
          <span className="tcard__enrolled">👥 {(enrolled / 1000).toFixed(1)}k enrolled</span>
          <span className="tcard__enroll-btn">View Details →</span>
        </div>
      </div>
    </div>
  );
}
