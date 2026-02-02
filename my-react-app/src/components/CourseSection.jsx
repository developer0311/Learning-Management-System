import React, { useRef, useState, useEffect } from "react";
import Card from "../components/Card";

function CourseSection({ title, courses }) {
  const sliderRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(280); // default

  // Dynamically calculate card width based on container size
  const calculateCardWidth = () => {
    const container = sliderRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    console.log(containerWidth)

    let visibleCards = 4; // default (dashboard sweet spot)

    if (containerWidth >= 1400) visibleCards = 5;      // courses page large
    else if (containerWidth >= 1100) visibleCards = 4;
    else if (containerWidth >= 800) visibleCards = 3;
    else if (containerWidth >= 500) visibleCards = 3;
    else if (containerWidth >= 400) visibleCards = 2;
    else visibleCards = 1;

    const gap = 16; // px (matches CSS gap)
    const totalGap = gap * (visibleCards - 1);

    setCardWidth((containerWidth - totalGap) / visibleCards);
  };

  const handleScroll = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction * (cardWidth + 16),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    calculateCardWidth();

    const resizeObserver = new ResizeObserver(calculateCardWidth);
    if (sliderRef.current) {
      resizeObserver.observe(sliderRef.current);
    }

    window.addEventListener("resize", calculateCardWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateCardWidth);
    };
  }, []);

  if (!courses.length) return null;

  return (
    <div className="mb-5 position-relative w-100">
      {title && <h4 className="fw-semibold mb-4">{title} Courses</h4>}

      {/* Left Arrow */}
      <button
        className="btn btn-light rounded-circle shadow position-absolute top-50 start-0 translate-middle-y z-2"
        onClick={() => handleScroll(-1)}
      >
        <i className="bx bx-chevron-left" />
      </button>

      {/* Right Arrow */}
      <button
        className="btn btn-light rounded-circle shadow position-absolute top-50 end-0 translate-middle-y z-2"
        onClick={() => handleScroll(1)}
      >
        <i className="bx bx-chevron-right" />
      </button>

      <div
        ref={sliderRef}
        className="courses-slider d-flex overflow-auto"
      >
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-slide"
            style={{ width: `${cardWidth}px`, alignItems: "stretch" }}
          >
            <Card
              page_source={course.id}
              title={course.title}
              description={course.description}
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
