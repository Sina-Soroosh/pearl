import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import MyAccountMenu from "@/components/modules/MyAccountMenu/MyAccountMenu";
import React from "react";
import styles from "@/styles/templates/MyAccount/EditAccount/Main.module.css";
import EditAccountForm from "@/components/modules/UserPanel/EditAccountForm/EditAccountForm";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function Main({ user }) {
  const router = useRouter();
  const swal = withReactContent(Swal);

  const updateUserHandler = async (values, Swal) => {
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password === "" ? undefined : values.password,
      }),
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal
          .fire({
            title: "اطلاعات با موفقیت تغییر یافت",
            icon: "success",
            confirmButtonText: "رفتن به حساب کاربری",
          })
          .then(() => {
            router.push("/my-account");
          });

        break;
      case 400:
        swal.fire({
          title: "اطلاعات وارد شده اشتباه می باشد !!",
          icon: "error",
          confirmButtonText: "باشه",
        });
        break;
      case 401:
        router.push("/login");
        break;
      case 422:
        swal.fire({
          title: "کاربری قبلا با این ایمیل یا نام کاربری ثبت نام کرده !!",
          icon: "error",
          confirmButtonText: "باشه",
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = async (values) => {
    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        updateUserHandler(values, Swal);
      },
    });
  };

  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "حساب کاربری من", href: "/my-account" },
          {
            id: 2,
            title: "جزییات حساب کاربری",
            href: "/my-account/edit-account",
          },
        ]}
        title="جزییات حساب کاربری"
      />

      <div className={styles.account}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <MyAccountMenu />
            </div>
            <div className="col-md-9">
              <div className={styles.content}>
                <EditAccountForm
                  email={user.email}
                  username={user.username}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
