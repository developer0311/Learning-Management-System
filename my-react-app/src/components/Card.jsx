import React from "react";
import { Link } from "react-router-dom";

function Card({
  page_source, // id
  title,
  description, // description
  tag, // category
  author, // instructor
  rating,
  level,
  price,
  discount_percent,
  img_source,
  img_alt,
}) {
  // convert API string values to numbers safely
  const numericPrice = price ? Number(price) : null;
  const numericRating = rating ? Number(rating) : null;
  const numericDiscount =
    typeof discount_percent === "number"
      ? discount_percent
      : Number(discount_percent || 0);


  const hasPrice = typeof numericPrice === "number" && !isNaN(numericPrice);
  const hasDiscount =
    typeof numericDiscount === "number" && numericDiscount > 0;

  const discountedPrice =
    hasPrice && hasDiscount
      ? Math.round(numericPrice - (numericPrice * numericDiscount) / 100)
      : numericPrice;

  return (
    <Link
      to={`/courses/${page_source}`}
      className="card course-card h-100 text-decoration-none border-0 d-flex flex-column w-100"
    >
      {/* Image */}
      <div className="position-relative overflow-hidden">
        <img
          src={img_source || "/images/card_image.png"}
          className="card-img-top course-card-img"
          alt={img_alt || title}
        />

        {tag && (
          <span className="badge bg-light text-dark position-absolute top-0 start-0 m-2 extra-small rounded-pill px-3 py-1 shadow-sm">
            {tag}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">
        {/* Title */}
        <h6 className="card-title fw-semibold text-dark mb-2">{title}</h6>

        {/* Description */}
        {description && (
          <p className="card-text text-muted extra-small mb-2">{description}</p>
        )}

        {/* Author */}
        {author && (
          <p className="text-muted extra-small mb-2">
            By <span className="fw-semibold">{author}</span>
          </p>
        )}

        {/* Bottom section */}
        <div className="mt-auto">
          {/* Rating + Level */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            {numericRating !== null && !isNaN(numericRating) && (
              <span className="extra-small text-warning fw-semibold">
                ★ {numericRating.toFixed(1)}
              </span>
            )}

            {level && (
              <span className="badge bg-primary-subtle text-primary extra-small rounded-pill">
                {level}
              </span>
            )}
          </div>

          {/* Price row */}
          {hasPrice && (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-semibold text-dark">
                  ₹{discountedPrice}
                </span>

                {hasDiscount && (
                  <span className="text-muted extra-small ms-2 text-decoration-line-through">
                    ₹{numericPrice}
                  </span>
                )}
              </div>

              {hasDiscount && (
                <span className="badge bg-danger-subtle text-danger extra-small rounded-pill px-2">
                  -{numericDiscount}%
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Card;
