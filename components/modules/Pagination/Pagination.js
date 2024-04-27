import React, { useEffect, useState } from "react";
import styles from "@/styles/modules/Pagination/Pagination.module.css";
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({ lastPage }) {
  const router = useRouter();
  const { query, pathname } = router;
  const [pageActive, setPageActive] = useState(1);

  useEffect(() => {
    setPageActive(query.page || 1);
  }, [query]);

  const changePage = (page) => {
    let newAddress = pathname + "?";

    for (const [key, value] of Object.entries(query)) {
      if (key !== "page") {
        newAddress += `${key}=${value}&`;
      }
    }

    newAddress += `page=${page}`;

    router.push(newAddress);
  };

  return (
    <>
      <ul className={styles.pagination}>
        {+pageActive !== 1 && (
          <li
            className={styles.prev_page}
            onClick={() => changePage(pageActive - 1)}
          >
            <span>
              <IoIosArrowBack />
            </span>
          </li>
        )}
        {Array(lastPage)
          .fill(0)
          .map((page, index) => (
            <li
              key={index}
              className={+pageActive === index + 1 && styles.active}
              onClick={() => changePage(index + 1)}
            >
              <span>{index + 1}</span>
            </li>
          ))}

        {+pageActive !== lastPage && (
          <li
            className={styles.next_page}
            onClick={() => changePage(+pageActive + 1)}
          >
            <span>
              <IoIosArrowForward />
            </span>
          </li>
        )}
      </ul>
    </>
  );
}

export default Pagination;
