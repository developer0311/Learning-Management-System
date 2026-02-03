import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import Card from "../components/Card";

function CourseSection({ title, courses }) {
  const wrapperRef = useRef(null); // ⬅️ OUTER container
  const sliderRef = useRef(null);
  const rafRef = useRef(null);

  const [cardWidth, setCardWidth] = useState(280);

  const calculateCardWidth = () => {
    if (!wrapperRef.current) return;

    const containerWidth = wrapperRef.current.clientWidth;

    let visibleCards = 4;

    if (containerWidth >= 1400) visibleCards = 6;
    else if (containerWidth >= 1100) visibleCards = 5;
    else if (containerWidth >= 800) visibleCards = 4;
    else if (containerWidth >= 500) visibleCards = 3;
    else visibleCards = 2;

    const gap = 16;
    const totalGap = gap * (visibleCards - 1);

    setCardWidth(Math.floor((containerWidth - totalGap) / visibleCards));
  };

  const handleScroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction * (cardWidth + 16),
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    calculateCardWidth();
    window.addEventListener("resize", calculateCardWidth);

    return () => {
      window.removeEventListener("resize", calculateCardWidth);
    };
  }, []);

  if (!courses.length || !cardWidth) return null;

  if (!courses.length) return null;

  return (
    <div ref={wrapperRef} className="mb-5 position-relative w-100">
      {title && <h4 className="fw-semibold mb-4">{title} Courses</h4>}

      {/* LEFT */}
      <button
        className="btn btn-light rounded-circle shadow position-absolute top-50 start-0 translate-middle-y z-2"
        onClick={() => handleScroll(-1)}
      >
        <i className="bx bx-chevron-left" />
      </button>

      {/* RIGHT */}
      <button
        className="btn btn-light rounded-circle shadow position-absolute top-50 end-0 translate-middle-y z-2"
        onClick={() => handleScroll(1)}
      >
        <i className="bx bx-chevron-right" />
      </button>

      <div
        ref={sliderRef}
        className="courses-slider d-flex gap-3 overflow-auto"
      >
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-slide"
            style={{ width: cardWidth }}
          >
            <Card
              page_source={course.id}
              title={course.title}
              description={course.description.slice(0, 25) + "..."}
              tag={course.category}
              author={course.instructor}
              rating={course.rating}
              level={course.level}
              price={course.price}
              discount_percent={course.discount_percent}
              img_source={course.banner_url}
              img_alt={course.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseSection;
