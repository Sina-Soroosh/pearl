import React from "react";
import styles from "@/styles/templates/AboutUs/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import Image from "next/image";
import AboutBox from "@/components/modules/AboutBox/AboutBox";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "درباره ما", href: "/about-us" }]}
        title="درباره ما"
      />

      <div className={styles.about_us}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.title}>
              <h3>Pearl , یک سایت فروشگاهی برای همه</h3>
            </div>
            <div className={styles.desc}>
              <p>
                Pearl یک انتخاب از اشیاء متمرکز بر کیفیت، مینیمالیسم، و قابلیت.
                ماموریت ما ارائه مجموعه ای منحصر به فرد از محصولات است که کاربر
                را جذاب و الهام بخش می کند. ما هر محصول را تا بسته بندی آن بررسی
                می کنیم تا اطمینان حاصل کنیم که ما به طور مداوم بهترین کیفیت و
                طراحی را ارائه می دهیم.
              </p>
              <p>
                انتخاب محصولات ما طراحی شده و وارد شده از سراسر جهان است. این که
                آیا از دانمارک یا ژاپن، برخی از این موارد هرگز در ایالات متحده
                قرار نگرفته اند. علاوه بر این، ما توزیع کننده منحصر به فرد
                آمریکای شمالی برای تعدادی از مارک های موجود در فروشگاه ما هستیم.
              </p>
            </div>
            <div className={styles.images}>
              <div className="row">
                <div className="col-md-6">
                  <Image width={400} height={400} src="/images/about1.jpg" />
                </div>
                <div className="col-md-6">
                  <Image width={400} height={400} src="/images/about2.jpg" />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.main}>
            <div className={styles.title}>
              <h3>چرا ما...؟</h3>
            </div>
            <div className="row">
              <AboutBox
                img="https://auros.1webstar.ir/wp-content/uploads/2019/03/Support.png"
                title="پشتیبانی 24/7"
                desc="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است."
              />
              <AboutBox
                img="https://auros.1webstar.ir/wp-content/uploads/2019/03/Shipping.png"
                title="ارسال رایگان"
                desc="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است."
              />
              <AboutBox
                img="https://auros.1webstar.ir/wp-content/uploads/2019/03/Refund.png"
                title="بازگشت کالا"
                desc="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
