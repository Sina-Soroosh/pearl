import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/modules/CheckoutForm/CheckoutForm.module.css";
import { Formik } from "formik";

function CheckoutForm({ isAddress, onSubmit, ...address }) {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const provincesRef = useRef();
  const initialValues = {
    firstName: address.firstName || "",
    lastName: address.lastName || "",
    province: address.province || "",
    city: address.city || "",
    address: address.address || "",
    postalCode: address.postalCode || "",
    phone: address.phone || "",
    email: address.email || "",
    desc: address.desc || "",
  };

  useEffect(() => {
    const getProvinces = async () => {
      const res = await fetch("/api/cities");
      const data = await res.json();

      if (address.province) {
        const provinceMain = data.find(
          (province) => province.name === address.province
        );

        setCities(provinceMain.cities);
      }

      setProvinces(data);
    };

    getProvinces();
  }, []);

  const onChangeProvince = (e, handleChange) => {
    if (e.target.value === "") {
      setCities([]);
    } else {
      const provinceMain = provinces.find(
        (province) => province.name === e.target.value
      );

      setCities(provinceMain.cities);
    }

    handleChange(e);
  };

  const validateHandler = (values) => {
    const errors = {};
    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!values.firstName) {
      errors.firstName = "نام خود را وارد کنید";
    } else if (values.firstName.length < 3) {
      errors.firstName = "نام خود را به درستی وارد کنید";
    }

    if (!values.lastName) {
      errors.lastName = "نام خانوادگی خود را وارد کنید";
    } else if (values.lastName.length < 3) {
      errors.lastName = "نام خانوادگی خود را به درستی وارد کنید";
    }

    const isHasCity = cities.some((city) => city.name === values.city);

    if (!values.city || !isHasCity) {
      errors.city = "لطفا شهر محل زندگی خود را انتخاب کنید";
    }

    if (!values.province) {
      errors.province = "لطفا استان محل زندگی خود را انتخاب کنید";
    }

    if (!values.address) {
      errors.address = "لطفا آدرس محل زندگی خود را وارد کنید";
    } else if (values.address.length < 10) {
      errors.address = "لطفا آدرس محل زندگی خود را درست وارد کنید";
    }

    if (!values.postalCode) {
      errors.postalCode = "لطفا کد پستی محل زندگی خود را وارد کنید";
    } else if (isNaN(values.postalCode)) {
      errors.postalCode = "لطفا کد پستی محل زندگی خود را درست وارد کنید";
    }

    if (!values.phone) {
      errors.phone = "لطفا شماره تلفن خود را وارد کنید";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "لطفا شماره تلفن خود را درست وارد کنید";
    }

    if (!values.email) {
      errors.email = "لطفا ایمیل خود را وارد کنید";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "لطفا ایمیل خود را درست وارد کنید";
    }

    return errors;
  };

  return (
    <>
      <div className={styles.checkout_form}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>{isAddress ? "آدرس صورتحساب" : "جزییات صورت حساب"}</h3>
          </div>

          <Formik
            initialValues={initialValues}
            validate={validateHandler}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className={`col-sm-6 ${styles.input_box}`}>
                    <label htmlFor="firstName">
                      نام <span>*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    {touched.firstName && (
                      <span className={styles.err}>{errors.firstName}</span>
                    )}
                  </div>
                  <div className={`col-sm-6 ${styles.input_box}`}>
                    <label htmlFor="lastName">
                      نام خانوادگی <span>*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    {touched.lastName && (
                      <span className={styles.err}>{errors.lastName}</span>
                    )}
                  </div>
                  <div className={`${styles.input_box}`}>
                    <label htmlFor="province">
                      استان <span>*</span>
                    </label>
                    <select
                      id="province"
                      value={values.province}
                      onChange={(e) => onChangeProvince(e, handleChange)}
                    >
                      <option value="">استان خود را انتخاب کنید</option>
                      {provinces.map((province) => (
                        <option value={province.name} key={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>

                    {touched.province && (
                      <span className={styles.err}>{errors.province}</span>
                    )}
                  </div>
                  <div className={`${styles.input_box}`}>
                    <label htmlFor="city">
                      شهر <span>*</span>
                    </label>
                    <select
                      id="city"
                      value={values.city}
                      onChange={handleChange}
                    >
                      <option value="">شهر خود را انتخاب کنید</option>
                      {cities.map((city) => (
                        <option value={city.name} key={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>

                    {touched.city && (
                      <span className={styles.err}>{errors.city}</span>
                    )}
                  </div>
                  <div className={`${styles.input_box}`}>
                    <label htmlFor="address">
                      آدرس <span>*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={values.address}
                      onChange={handleChange}
                    />
                    {touched.address && (
                      <span className={styles.err}>{errors.address}</span>
                    )}
                  </div>
                  <div className={`${styles.input_box}`}>
                    <label htmlFor="postalCode">
                      کدپستی <span>*</span>
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      value={values.postalCode}
                      onChange={handleChange}
                    />
                    {touched.postalCode && (
                      <span className={styles.err}>{errors.postalCode}</span>
                    )}
                  </div>
                  <div className={`${styles.input_box}`}>
                    <label htmlFor="phone">
                      تلفن <span>*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={values.phone}
                      onChange={handleChange}
                    />
                    {touched.phone && (
                      <span className={styles.err}>{errors.phone}</span>
                    )}
                  </div>
                  <div className={`${styles.input_box}`}>
                    <label htmlFor="email">
                      ایمیل <span>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {touched.email && (
                      <span className={styles.err}>{errors.email}</span>
                    )}
                  </div>
                  {isAddress || (
                    <div className={`${styles.input_box}`}>
                      <label htmlFor="desc">توضیحات سفارش (اختیاری)</label>
                      <textarea
                        type="desc"
                        id="desc"
                        value={values.desc}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  )}
                  <input
                    type="submit"
                    value={isAddress ? "ذخیره آدرس" : "ثبت سفارش"}
                    className={styles.submit_btn}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default CheckoutForm;
