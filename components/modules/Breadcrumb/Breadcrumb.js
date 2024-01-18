import React from "react";
import styles from "@/styles/modules/Breadcrumb/Breadcrumb.module.css";
import Link from "next/link";

function Breadcrumb({ title, links }) {
  return (
    <>
      <div className={styles.breadcrumb}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <ul className={styles.links}>
            <li>
              <Link href="/">Pearl</Link>
            </li>
            {links.map((link) => (
              <li key={link.id}>
                <Link href={link.href}>
                  {" "}
                  {">"} {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Breadcrumb;
