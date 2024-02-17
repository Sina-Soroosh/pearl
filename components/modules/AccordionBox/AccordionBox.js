import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import styles from "@/styles/modules/AccordionBox/AccordionBox.module.css";
import parse from "html-react-parser";

function AccordionBox(props) {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {props.title}
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.body}>{parse(props.body)}</div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AccordionBox;
