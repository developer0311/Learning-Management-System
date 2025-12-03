import React, { useRef, useState, useEffect } from "react";
import coursesData from "../../coursesData";
import Card from "../components/Card";
import cardImage from "/images/card_image.png"; 


function CourseSection({ title, courses }) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const container = sliderRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const handleScroll = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    const cardEl = container.querySelector(".course-slide");
    if (!cardEl) return;

    const cardWidth = cardEl.getBoundingClientRect().width;
    const visibleCount = window.innerWidth < 768 ? 1 : 1;
    const scrollAmount = cardWidth * visibleCount * direction;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    setTimeout(updateScrollButtons, 500);
  };

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, []);

  if (!courses.length) return null;

  return (
    <section className="mb-5 position-relative w-100">
      <h4 className="fw-semibold mb-5">{title} Courses</h4>

      {/* Left Button */}
      {canScrollLeft && (
        <button
          className="btn btn-light btn-lg rounded-circle shadow position-absolute top-50 start-0 translate-middle-y z-2"
          style={{ transform: "translate(-50%, -50%)" }}
          onClick={() => handleScroll(-1)}
        >
          <i className="bx bx-chevron-left" />
        </button>
      )}

      {/* Right Button */}
      {canScrollRight && (
        <button
          className="btn btn-light btn-lg rounded-circle shadow position-absolute top-50 end-0 translate-middle-y z-2"
          style={{ transform: "translate(50%, -50%)" }}
          onClick={() => handleScroll(1)}
        >
          <i className="bx bx-chevron-right" />
        </button>
      )}

      <div
        ref={sliderRef}
        className="courses-slider d-flex flex-nowrap overflow-auto pb-2 w-100"
      >
        {courses.map((course) => (
          <div key={course.id} className="course-slide pe-3">
            <Card
              page_source={course.id}
              title={course.title}
              text={course.description}
              tag={course.category}
              author={course.instructor}
              rating={course.rating}
              level={course.level}
              price={course.price}
              discount_percent={course.discount_percent}
              img_source={cardImage}
              img_alt={course.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CourseSection