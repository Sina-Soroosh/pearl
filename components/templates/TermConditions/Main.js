import AccordionBox from "@/components/modules/AccordionBox/AccordionBox";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import React , {useState} from "react";
import styles from "@/styles/templates/TermConditions/Main.module.css";
import SupportBox from "@/components/modules/SupportBox/SupportBox";
import { Accordion } from "@mui/material";

function Main({ rules }) {
	  const [expanded, setExpanded] = useState(false);
	
	const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
	
  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "قوانین و مقررات", href: "/term-conditions" }]}
        title="قوانین و مقررات"
      />

      <div className={styles.term_conditions}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.accordions}>
                {rules.map((rule) => (
                  <AccordionBox {...rule} key={rule._id} onChange={handleChange} expanded={expanded === rule._id} />
                ))}
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
