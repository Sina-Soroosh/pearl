import React from "react";
import styles from "@/styles/templates/MyAccount/EditAddress/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import MyAccountMenu from "@/components/modules/MyAccountMenu/MyAccountMenu";
import CheckoutForm from "@/components/modules/CheckoutForm/CheckoutForm";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function Main({ user, address }) {
  const router = useRouter();
  const swal = withReactContent(Swal);

  const updateAddressHandler = async (values, Swal) => {
    const res = await fetch("/api/address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        province: values.province,
        city: values.city,
        address: values.address,
        postalCode: values.postalCode,
        phone: values.phone,
        email: values.email,
        desc: values.desc,
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

        updateAddressHandler(values, Swal);
      },
    });
  };

  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "حساب کاربری من", href: "/my-account" },
          { id: 2, title: "آدرس صورتحساب", href: "/my-account/edit-address" },
        ]}
        title="آدرس صورتحساب"
      />

      <div className={styles.address}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <MyAccountMenu />
            </div>
            <div className="col-md-9">
              <div className={styles.content}>
                <CheckoutForm
                  isAddress={true}
                  {...address}
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
