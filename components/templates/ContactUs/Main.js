import React from "react";
import styles from "@/styles/templates/ContactUs/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import ContactUsForm from "@/components/modules/ContactUsForm/ContactUsForm";

function Main() {
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
                <ContactUsForm />
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
