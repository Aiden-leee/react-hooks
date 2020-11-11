import React, { useEffect } from "react";
import styled from "styled-components";
import Swiper, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
Swiper.use([Navigation]);

const ContentBlock = styled.div`
  > .swiper-container {
    border-radius: 5px;
  }
  > .swiper-wrapper {
    padding: 10px;
  }
`;
interface contentType {
  data: any;
}
const Content: React.FC<contentType> = ({ data }) => {
  useEffect(() => {
    if (data.length > 1) {
      var mySwiper = new Swiper(".swiper-container.list", {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          // when window width is <= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is <= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is <= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });
    }
  }, [data]);
  return (
    <ContentBlock className="content">
      <div className="swiper-container list">
        <div className="swiper-wrapper">{data}</div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </ContentBlock>
  );
};

export default Content;
