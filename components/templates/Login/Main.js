import React, { useEffect } from "react";
import styles from "@/styles/templates/Login/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import AuthForm from "@/components/modules/AuthForm/AuthForm";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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

  const loginHandler = async (values, Swal) => {
    const res = await fetch("/api/auth/login", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: values.identifier,
        password: values.password,
      }),
    });

    Swal.close();

    if (res.status !== 200) {
      swal.fire({
        title: "همچین کاربری وجود ندارید !!",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } else {
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

        loginHandler(values, Swal);
      },
    });
  };

  return (
    <>
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "ورود به حساب کاربری",
            href: "/login",
          },
        ]}
        title="ورود به حساب کاربری"
      />

      <div className={styles.login}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <AuthForm isLoginForm={true} onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
