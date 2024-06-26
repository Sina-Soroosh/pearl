import React from "react";
import styles from "@/styles/templates/WarrantyAndServices/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import SupportBox from "@/components/modules/SupportBox/SupportBox";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "گارانتی و خدمات", href: "/warranty-and-services" },
        ]}
        title="گارانتی و خدمات"
      />
      <div className={styles.warranty_services}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.box_info}>
              <h2>خدمات گارانتی و پشتیبانی</h2>
              <p>
                جزئیات ضمانت نامه شما به شما اطلاعاتی در مورد پوشش و حمایت برای
                محصول آیروس می دهد. برای همه موارد گارانتی آیروس اطلاعاتی را در
                اینجا پیدا کنید. وضعیت گارانتی، تجدید، انتقال و یا ثبت نام محصول
                آیروس خود را می توانید بررسی کنید. یا یک بار پشتیبانی برای
                محصولاتی که گارانتی شان منقضی شده است، دریافت کنید.
              </p>
            </div>
            <div className={styles.box_info}>
              <h2>وضعیت گارانتی</h2>
              <p>
                آیا محصول شما تحت پوشش گارانتی قرار دارد؟ وضعیت گارانتی و تاریخ
                انقضای ضمانت را در اینجا بررسی کنید.
              </p>
            </div>
            <div className={styles.box_info}>
              <h2>ثبت نام خرده فروشی</h2>
              <p>
                علاوه بر هرگونه حقوق قابل مصرف و یا حقوق قانونی، تامین کننده
                تضمین سازنده را ارائه می دهد. تضمین سازنده این است که مواد و
                کارکرد محصولات به مدت 10 سال از تاریخی که کالا توسط خریدار یا
                حامل شخص ثالث جمع آوری شده است، از نقص ها نباشد. تضمین محصول،
                پوشش و پارگی طبیعی را پوشش نمی دهد. تضمین 10 ساله تنها به
                سفارشات اعطا شده در تاریخ 1 مارس 2016 یا بعد از آن اعمال می شود،
                هر گونه سفارش پیشنهادی که در آن قرار داده شده، یک تضمین 1 ساله
                دارد. محصولات پاکسازی برای این تضمین واجد شرایط نیستند.
              </p>
              <p>با این حال این کلیه بند 7.1 اگر مشکل ناشی از:</p>
              <p>
                عدم استفاده از شرایط کاری، عدم اجرای دستورالعمل، سوءاستفاده،
                تغییر یا تعمیر غیر مجاز، آسیب رسمی، نگهداری نامناسب یا غفلت از
                سوی خریدار یا شخص ثالث؛ یا هر گونه آسیب مکانیکی، شیمیایی،
                الکترولیتی و یا دیگر پس از ریسک به خریداران منتقل شده است، که به
                دلیل نقص در کالاها نیست.
              </p>
              <p>
                در صورت تخریب کالاها، خریدار بایستی ظرف 7 روز از زمان کشف خطا با
                ما تماس بگیرد یا ظرف 7 روز از جمع آوری کالاها که در آن کالاها
                ضعیف بوده است.
              </p>
              <p>
                خریدار باید اطلاعات و تصاویر درخواست شده را به منظور تامین کننده
                برای مقابله با شکایت خریدار ارائه دهد. خریدار دستورالعمل کامل را
                پس از اطلاع ارائه کننده مشکل دریافت خواهد کرد.
              </p>
              <p>
                ادعا خواهد شد در صورت اختیاری تامین کننده جبران خواهد شد. ما حق
                ارائه جبران خسارت را داریم. در طول 28 روز از تاریخ تأیید تأمین
                کننده، جبران خسارت به طور معمول پرداخت می شود.
              </p>
            </div>
            <div className={styles.boxes}>
              <div className={styles.title}>
                <h3>نیاز به پشتیبانی دارید؟</h3>
              </div>
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
    </>
  );
}

export default Main;
