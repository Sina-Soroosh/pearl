import React, { useEffect } from "react";
import styles from "@/styles/templates/Register/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import AuthForm from "@/components/modules/AuthForm/AuthForm";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import useSWR, { useSWRConfig } from "swr";

const fetcher = async () => {
  const res = await fetch("/api/auth/me");

  if (res.status !== 200) {
    return false;
  }

  return true;
};

function Main() {
  const router = useRouter();
  const { data } = useSWR("GetMeLogin", fetcher);
  const swal = withReactContent(Swal);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (data) {
      router.replace("/my-account");
    }
  }, [data]);

  const registerHandler = async (values, Swal) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    Swal.close();

    if (res.status === 400) {
      swal.fire({
        title: "اطلاعات وارد شده اشتباه می باشد !!",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } else if (res.status === 422) {
      swal.fire({
        title: "کاربری قبلا با این ایمیل یا نام کاربری ثبت نام کرده !!",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } else if (res.status === 201) {
      swal
        .fire({
          title: "خوش آمدید",
          icon: "success",
          confirmButtonText: "رفتن به حساب کاربری",
        })
        .then(() => {
          mutate("GetMeHeader");
          router.replace("/my-account");
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

        registerHandler(values, Swal);
      },
    });
  };

  return (
    <>
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "ثبت نام",
            href: "/register",
          },
        ]}
        title="ثبت نام"
      />

      <div className={styles.register}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <AuthForm onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
