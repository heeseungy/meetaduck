import { ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';

import styles from '@/styles/mission/MissionSlider.module.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface SlidesProps {
  /** 슬라이더 아이템 요소 */
  children: ReactNode[];
  className: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
}

function MissionSlider({ children, className }: SlidesProps) {
  const settings: Settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    swipe: false,
    swipeToSlide: false,
    draggable: false,
    touchMove: false,
  };
  return (
    <>
      <div className={`${styles[className]}`}>
        <Slider {...settings}>{children}</Slider>
      </div>
    </>
  );
}

export default MissionSlider;
