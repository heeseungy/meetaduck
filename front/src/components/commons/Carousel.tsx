import { ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';

import styles from '@/styles/vote/VoteCarouselList.module.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface CarouselProps {
  /** 슬라이더 아이템 요소 */
  children: ReactNode;
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
}

function Carousel({ children, className }: CarouselProps) {
  const settings: Settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    arrows: false,
    pauseOnFocus: false,
    cssEase: 'linear',
  };
  return (
    <div className="carousel-container">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default Carousel;
