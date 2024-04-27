import React, {useState} from "react";
import styles from "@/styles/templates/faq/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import AccordionBox from "@/components/modules/AccordionBox/AccordionBox";
import { Accordion } from "@mui/material";

function Main({ faqs }) {
		  const [expanded, setExpanded] = useState(false);
	
	const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
	
  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "سوالات متداول", href: "/faq" }]}
        title="سوالات متداول"
      />

      <div className={styles.faq}>
        <div className={styles.content}>
            {faqs.map((question) => (
              <AccordionBox key={question._id} {...question} onChange={handleChange} expanded={expanded === question._id} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Main;
