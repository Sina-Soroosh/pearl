import React, { useRef } from "react";
import styles from "@/styles/templates/Support/Main.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import SupportBox from "@/components/modules/SupportBox/SupportBox";

function Main() {
  const router = useRouter();
  const searchInputRef = useRef();

  const searchHandler = (e) => {
    e.preventDefault();

    router.push(`/search?q=${searchInputRef.current.value}`);
  };

  return (
    <>
      <div className={styles.support}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className={styles.search_box}>
                    <div className={styles.title}>
                      <h2>چطور میتوانیم کمک کنیم؟</h2>
                    </div>
                    <form onSubmit={searchHandler}>
                      <input
                        type="search"
                        placeholder="محصول مورد نظر خود را جستجو کنید..."
                        ref={searchInputRef}
                      />
                      <button>جستجو</button>
                    </form>
                    <p className={styles.label}>
                      یا <Link href="/faq">سوالات متداول</Link> را مررور کنید!
                    </p>
                  </div>
                  <div className={styles.info_boxes}>
                    <div className="row">
                      <div className="col-md-6 col-lg-4">
                        <SupportBox
                          icon="faFilePen"
                          title="پایگاه دانش"
                          desc="برای مطالعه راهنما و مستندات وب سایت می توانید پایگاه دانش ما را بررسی کنید."
                        />
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <SupportBox
                          icon="faHeadset"
                          title="سوالات متداول"
                          desc="شما می توانید سوالات و مشکلات خود را با ما در میان بگذارید تا پاسخ و راهنمایی دریافت کنید."
                        />
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <SupportBox
                          icon="faPeopleGroup"
                          title="انجمن"
                          desc="شما می توانید با مراجعه به انجمن ما پاسخ مشکلات و سوالات خود را بیابید و با دیگران اشتراک بگذارید."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className="container">
              <div className={styles.title}>
                <h2>راه های دیگر برای دریافت راهنمایی</h2>
              </div>
              <div className={styles.info_boxes}>
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <SupportBox icon="faMessage" title="پشتیبانی با چت" />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <SupportBox icon="faHeadset" title="پشتیبانی با توئیتر" />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <SupportBox icon="faPhone" title="پشتیبان تلفنی" />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <SupportBox icon="faPeopleArrows" title="فرم تماس با ما" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
