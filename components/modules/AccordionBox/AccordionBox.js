import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import styles from "@/styles/modules/AccordionBox/AccordionBox.module.css";

function AccordionBox() {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          چگونه از فروشگاه آیروس خرید کنیم ؟
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.body}>
            <h2>افزودن محصولات به سبد خرید:</h2>
            <ol>
              <li>
                <p>اطمینان حاصل کنید که شما در وب سایت هستید.</p>
              </li>
              <li>
                <p>
                  در دسته بندی های سایت مرور کنید و محصولات مورد نظر خود را از
                  فروشگاه انتخاب کنید.
                </p>
              </li>
              <li>
                <p>
                  ویژگی ها مثل رنگ و تعداد و … را تعیین کنید و پس از آن روی دکمه
                  “افزودن به سبد خرید” کلیک کنید.
                </p>
              </li>
            </ol>
            <h2>اقدام به پرداخت سفارش:</h2>
            <ul>
              <li>
                <p>
                  هنگامی که مرور می کنید و مواردی را که می خواهید برای خود
                  خریداری کنید را به سبد خود اضافه کنید، روی دکمه “پرداخت” واقع
                  در سمت راست بالای وب سایت کلیک کنید.
                </p>
              </li>
              <li>
                <p>
                  هنگامی که مرور می کنید و مواردی را که می خواهید برای خود
                  خریداری کنید را به سبد خود اضافه کنید، روی دکمه “پرداخت” واقع
                  در سمت راست بالای وب سایت کلیک کنید.
                </p>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AccordionBox;
