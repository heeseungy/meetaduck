import { ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface SlidesProps {
  /** 슬라이더 아이템 요소 */
  children: ReactNode[];
  className: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
}

function Slides({ children, className }: SlidesProps) {
  const settings: Settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    cssEase: 'linear',
  };
  return (
    <div className={className}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default Slides;
