import React from "react";
import { Link } from "react-router-dom";

function Card({
  page_source,      // id
  title,
  text,            // description
  tag,
  author,
  rating,
  level,
  price,
  discount_percent,
  img_source,
  img_alt,
}) {
  const description =
    text && text.length > 80 ? text.slice(0, 80) + "..." : text;

  const hasPrice = typeof price === "number";
  const hasDiscount =
    typeof discount_percent === "number" && discount_percent > 0;

  const discountedPrice =
    hasPrice && hasDiscount
      ? Math.round(price - (price * discount_percent) / 100)
      : price;

  return (
    <Link
      to={`/courses/${page_source}`}
      className="card course-card h-100 text-decoration-none border-0 d-flex flex-column"
    >
      {/* Image */}
      <div className="position-relative overflow-hidden">
        <img
          src={img_source}
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
        <h6 className="card-title fw-semibold text-dark mb-2">
          {title}
        </h6>

        {description && (
          <p className="card-text text-muted extra-small mb-2">
            {description.slice(0, 50)}...
          </p>
        )}

        {author && (
          <p className="text-muted extra-small mb-2">
            By <span className="fw-semibold">{author}</span>
          </p>
        )}

        {/* Rating + Level */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          {rating && (
            <span className="extra-small text-warning fw-semibold">
              ★ {rating.toFixed(1)}
            </span>
          )}
          {level && (
            <span className="badge bg-primary-subtle text-primary extra-small rounded-pill">
              {level}
            </span>
          )}
        </div>

        {/* Price row (optional) */}
        {(hasPrice || hasDiscount) && (
          <div className="mt-auto d-flex justify-content-between align-items-center pt-1">
            <div>
              {hasPrice && (
                <span className="fw-semibold text-dark">
                  ₹{discountedPrice}
                </span>
              )}
              {hasPrice && hasDiscount && (
                <span className="text-muted extra-small ms-2 text-decoration-line-through">
                  ₹{price}
                </span>
              )}
            </div>

            {hasDiscount && (
              <span className="badge bg-danger-subtle text-danger extra-small rounded-pill px-2">
                -{discount_percent}%
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default Card;
