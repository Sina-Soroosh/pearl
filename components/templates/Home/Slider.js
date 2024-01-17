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

function Slider() {
  return (
    <>
      <div className={styles.slider}>
        <div className={styles.content_slider}>
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            navigation={true}
            modules={[EffectFade, Navigation]}
            dir="rtl"
          >
            <SwiperSlide>
              <div className={styles.slide}>
                <div className={styles.back_slide}>
                  <img src="/images/slide.png" />
                </div>
                <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
                  <div className="row">
                    <div
                      className={`col-lg-4 col-md-12 ${styles.content_slide}`}
                    >
                      <div>
                        <div className={styles.title_slide}>
                          <h3>چراغ</h3>
                        </div>
                        <div className={styles.price_slide}>
                          <p>165,000 تومان</p>
                        </div>
                        <div className={styles.show_product}>
                          <Link href="#">+ بررسی کنید</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-12">
                      <div className={styles.image_slide}>
                        <MouseParallaxChild factorX={0.5} factorY={0.5}>
                          <img src="https://auros.1webstar.ir/wp-content/uploads/2022/10/home7_layer3.png" />
                        </MouseParallaxChild>
                      </div>
                    </div>
                  </div>
                </MouseParallaxContainer>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <div className={styles.back_slide}>
                  <img src="/images/slide.png" />
                </div>
                <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
                  <div className="row">
                    <div
                      className={`col-lg-4 col-md-12 ${styles.content_slide}`}
                    >
                      <div>
                        <div className={styles.title_slide}>
                          <h3>سر گوزن</h3>
                        </div>
                        <div className={styles.price_slide}>
                          <p>250,000 تومان</p>
                        </div>
                        <div className={styles.show_product}>
                          <Link href="#">+ بررسی کنید</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-12">
                      <div className={styles.image_slide}>
                        <MouseParallaxChild factorX={0.5} factorY={0.5}>
                          <img src="https://auros.1webstar.ir/wp-content/uploads/2022/10/home7_layer2.png" />
                        </MouseParallaxChild>
                      </div>
                    </div>
                  </div>
                </MouseParallaxContainer>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
                  <div className="row">
                    <div className={styles.back_slide}>
                      <img src="/images/slide.png" />
                    </div>
                    <div
                      className={`col-lg-4 col-md-12 ${styles.content_slide}`}
                    >
                      <div>
                        <div className={styles.title_slide}>
                          <h3>لوستر</h3>
                        </div>
                        <div className={styles.price_slide}>
                          <p>120,00 تومان</p>
                        </div>
                        <div className={styles.show_product}>
                          <Link href="#">+ بررسی کنید</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-12">
                      <div className={styles.image_slide}>
                        <MouseParallaxChild factorX={0.5} factorY={0.5}>
                          <img src="https://auros.1webstar.ir/wp-content/uploads/2022/10/home7_layer4.png" />
                        </MouseParallaxChild>
                      </div>
                    </div>
                  </div>
                </MouseParallaxContainer>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Slider;
