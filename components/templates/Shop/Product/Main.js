import React, { useState } from "react";
import styles from "@/styles/templates/Shop/Product/Main.module.css";
import { Controlled } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CommentBox from "@/components/modules/CommentBox/CommentBox";
import CreateComment from "@/components/modules/CreateComment/CreateComment";
import ProductCart from "@/components/modules/ProductCart/ProductCart";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function Main(props) {
  const [isZoomImage, setIsZoomImage] = useState(false);
  const [tabsValue, setTabsValue] = React.useState("description");
  const router = useRouter();
  const swal = withReactContent(Swal);

  const changeTabsValueHandler = (event, newValue) => {
    setTabsValue(newValue);
  };
  const zoomImageHandler = () => {
    setIsZoomImage(true);
  };

  const addToCartHandler = async (Swal) => {
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: props.product.shortName }),
    });

    Swal.close();

    if (res.status === 401) {
      swal
        .fire({
          title: "لطفا ابتدا وارد حساب کاربری خود شوید.",
          icon: "error",
          confirmButtonText: "باشه",
        })
        .then(() => {
          router.push("/login");
        });
    } else if (res.status === 404 || res.status === 400) {
      swal.fire({
        title: "ما این محصول را تموم کردیم.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } else if (res.status === 201) {
      swal.fire({
        title: (
          <p style={{ fontSize: "15px" }}>
            محصول با موفقیت به سبد خرید شما اضافه شد
          </p>
        ),
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        icon: "success",
      });
    }
  };

  const onSubmit = () => {
    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        addToCartHandler(Swal);
      },
    });
  };

  return (
    <>
      <div className={styles.product}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className={styles.image_product}>
                <Controlled
                  isZoomed={isZoomImage}
                  onZoomChange={(value) => setIsZoomImage(value)}
                >
                  <img src={props.product.image} alt={props.product.title} />
                  <span className={styles.zoom_icon} onClick={zoomImageHandler}>
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                  </span>
                </Controlled>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.info_product}>
                <div className={styles.title}>
                  <h1>{props.product.title}</h1>
                </div>
                <div className={styles.price}>
                  {props.product.discount === 0 ? (
                    <span>{props.product.price.toLocaleString()} تومان</span>
                  ) : (
                    <>
                      <span>
                        {(
                          props.product.price *
                          ((100 - props.product.discount) / 100)
                        ).toLocaleString()}{" "}
                        تومان
                      </span>{" "}
                      <span className={styles.discount}>
                        {props.product.price.toLocaleString()} تومان
                      </span>
                    </>
                  )}
                </div>

                <div className={styles.desc}>{parse(props.product.desc)}</div>
                {props.product.isAvailable ? (
                  <div className={styles.buttons}>
                    <button className={styles.add_cart} onClick={onSubmit}>
                      افزودن به سبد خرید
                    </button>
                  </div>
                ) : (
                  <div className={styles.unavailable}>
                    <p>
                      در حال حاضر این محصول در انبار موجود نیست و در دسترس نمی
                      باشد.
                    </p>
                  </div>
                )}
                <div className={styles.category}>
                  <span>
                    دسته :{" "}
                    <Link
                      href={`/product-category/${props.product.category.shortName}`}
                    >
                      {props.product.category.title}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className={styles.tabs}>
                <TabContext value={tabsValue}>
                  <Box sx={{ bgcolor: "background.paper" }}>
                    <TabList
                      onChange={changeTabsValueHandler}
                      aria-label="lab API tabs example"
                      textColor="#000"
                      centered
                    >
                      <Tab
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
						  fontFamily : "var(--font)"
                        }}
                        label="توضیحات"
                        value="description"
                      />
                      <Tab
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
						  fontFamily : "var(--font)"
                        }}
                        label="توضیحات تکمیلی"
                        value="details"
                      />
                      <Tab
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
						  fontFamily : "var(--font)"
                        }}
                        label="نظرات"
                        value="comments"
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="description">
                    <div className={styles.description}>
                      {parse(props.product.desc)}
                    </div>
                  </TabPanel>
                  <TabPanel value="details">
                    <table className={styles.details}>
                      <tbody>
                        {props.product.infos.map((info) => (
                          <tr key={info._id}>
                            <th>{info.title}</th>
                            <td>{info.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </TabPanel>
                  <TabPanel value="comments">
                    <div className={styles.comments}>
                      <div className={styles.content}>
                        <CreateComment
                          user={props.user}
                          shortName={props.product.shortName}
                        />
                        {props.comments.map((comment) => (
                          <CommentBox {...comment} key={comment._id} />
                        ))}
                      </div>
                    </div>
                  </TabPanel>
                </TabContext>
              </div>
            </div>
            <div className="col-12">
              {props.relatedProducts.length !== 0 ? (
                <div className={styles.related_products}>
                  <h4>محصولات مرتبط</h4>
                  <div className="row">
                    {props.relatedProducts.map((product) => (
                      <ProductCart key={product._id} {...product} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
