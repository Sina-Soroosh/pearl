import React from "react";
import styles from "@/styles/templates/Home/Slider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";

function Slider({ sliders }) {
  return (
    <>
      <div className={styles.slider}>
        <div className={styles.content_slider}>
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            navigation={true}
            loop
            modules={[EffectFade, Navigation]}
            dir="rtl"
          >
            {sliders.map((slider) => (
              <SwiperSlide key={slider._id}>
                <div className={styles.slide}>
                  <div className={styles.back_slide}>
                    <img src="/images/slide.png" />
                  </div>
                  <MouseParallaxContainer
                    globalFactorX={0.1}
                    globalFactorY={0.1}
                  >
                    <div className="row">
                      <div
                        className={`col-lg-4 col-md-12 ${styles.content_slide}`}
                      >
                        <div>
                          <div className={styles.title_slide}>
                            <h3>{slider.title}</h3>
                          </div>
                          <div className={styles.price_slide}>
                            <p>{slider.text}</p>
                          </div>
                          <div className={styles.show_product}>
                            <Link href={`/shop/${slider.product}`}>
                              + بررسی کنید
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-12">
                        <div className={styles.image_slide}>
                          <MouseParallaxChild factorX={0.5} factorY={0.5}>
                            <img src={slider.image} alt={slider.title} />
                          </MouseParallaxChild>
                        </div>
                      </div>
                    </div>
                  </MouseParallaxContainer>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Slider;
