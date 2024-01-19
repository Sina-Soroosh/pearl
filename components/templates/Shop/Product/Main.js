import React, { useState } from "react";
import styles from "@/styles/templates/Shop/Product/Main.module.css";
import { Controlled } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

function Main() {
  const [isZoomImage, setIsZoomImage] = useState(false);
  const [tabsValue, setTabsValue] = React.useState("description");

  const changeTabsValueHandler = (event, newValue) => {
    setTabsValue(newValue);
  };
  const zoomImageHandler = () => {
    setIsZoomImage(true);
  };

  return (
    <>
      <div className={styles.product}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className={styles.image_product}>
                <Controlled
                  isZoomed={isZoomImage}
                  onZoomChange={(value) => setIsZoomImage(value)}
                >
                  <img
                    src="https://auros.1webstar.ir/wp-content/uploads/2018/10/1-33.jpg"
                    alt=""
                  />
                  <span className={styles.zoom_icon} onClick={zoomImageHandler}>
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                  </span>
                </Controlled>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.info_product}>
                <div className={styles.title}>
                  <h1>لاین کارکنان</h1>
                </div>
                <div className={styles.price}>
                  <span>165,000 تومان</span>
                  <span className={styles.discount}>183,000 تومان</span>
                </div>

                <div className={styles.desc}>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد.
                  </p>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد. لورم ایپسوم متن ساختگی با تولید سادگی
                    نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                    لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                    متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                  </p>
                </div>
                <div className={styles.unavailable}>
                  <p>
                    در حال حاضر این محصول در انبار موجود نیست و در دسترس نمی
                    باشد.
                  </p>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.add_cart}>
                    افزودن به سبد خرید
                  </button>
                  <button className={styles.add_favorites}>
                    افزودن به لیست علاقه مندی ها
                  </button>
                </div>
                <div className={styles.category}>
                  <span>
                    دسته : <Link href="/product-category/test">تست</Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className={styles.tabs}>
                <TabContext value={tabsValue}>
                  <Box sx={{ bgcolor: "background.paper" }}>
                    <TabList
                      onChange={changeTabsValueHandler}
                      aria-label="lab API tabs example"
                      textColor="#000"
                      centered
                    >
                      <Tab
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
                        }}
                        label="توضیحات"
                        value="description"
                      />
                      <Tab
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
                        }}
                        label="توضیحات تکمیلی"
                        value="details"
                      />
                      <Tab
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
                        }}
                        label="نظرات"
                        value="comments"
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="description">
                    <div className={styles.desceription}>
                      <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                        برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با
                        هدف بهبود ابزارهای کاربردی می باشد.
                      </p>
                      <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                        برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با
                        هدف بهبود ابزارهای کاربردی می باشد. لورم ایپسوم متن
                        ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
                        از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                        در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                        تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
                        ابزارهای کاربردی می باشد.
                      </p>
                    </div>
                  </TabPanel>
                  <TabPanel value="details">
                    <table className={styles.details}>
                      <tbody>
                        <tr>
                          <th>ارتفاع دسته</th>
                          <td>37-45 اینچ</td>
                        </tr>
                        <tr>
                          <th>عرض</th>
                          <td>37 اینچ</td>
                        </tr>
                        <tr>
                          <th>چرخ ها</th>
                          <td>12 اینچ</td>
                        </tr>
                      </tbody>
                    </table>
                  </TabPanel>
                  <TabPanel value="comments">Item Three</TabPanel>
                </TabContext>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
