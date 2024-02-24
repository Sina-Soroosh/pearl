import React from "react";
import styles from "@/styles/templates/ContactUs/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import ContactUsForm from "@/components/modules/ContactUsForm/ContactUsForm";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

function Main() {
  const router = useRouter();
  const swal = withReactContent(Swal);

  const createMessageHandler = async (values, Swal) => {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        message: values.msg,
      }),
    });

    Swal.close();

    if (res.status === 201) {
      swal
        .fire({
          title: "پیغام شما با موفقیت ارسال شد",
          icon: "success",
          text: "در صورت نیاز به شما ایمیل زده میشود.",
          confirmButtonText: "باشه",
        })
        .then(() => {
          router.push("/");
        });
    } else if (res.status === 400) {
      swal.fire({
        title: "اطلاعات غلط است",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } else {
      swal.fire({
        title: "خطایی رخ داده \n لطفا اتصال خود را چک کنید.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const onSubmit = async (values) => {
    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        createMessageHandler(values, Swal);
      },
    });
  };

  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "تماس با ما", href: "/contact-us" }]}
        title="تماس با ما"
      />
      <div className={styles.contact_us}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={styles.texts}>
                <span>تماس با ما</span>
                <h3>پیامی بنویسید</h3>
              </div>
            </div>
            <div className="col-md-8">
              <div className={styles.form}>
                <ContactUsForm onSubmit={onSubmit} />
              </div>
              <div className={styles.map}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d38168.32903282598!2d53.55991384020386!3d28.50716986022733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1705916390330!5m2!1sen!2s"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
