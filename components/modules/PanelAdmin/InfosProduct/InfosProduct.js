import React from "react";
import styles from "@/styles/modules/PanelAdmin/InfosProduct/InfosProduct.module.css";

function InfosProduct({ value, changeValue }) {
  const addValueHandler = () => {
    changeValue((prevValue) => {
      const newValue = [...prevValue];

      newValue.push({
        _id: crypto.randomUUID(),
        title: "",
        value: "",
      });

      return newValue;
    });
  };

  const removeDetail = (_id) => {
    changeValue((prevValue) => {
      const newValue = prevValue.filter((item) => item._id !== _id);
      return newValue;
    });
  };

  return (
    <div className={styles.infos}>
      <div className={styles.content}>
        {value.map((item, index) => (
          <div className="row align-items-center" key={item._id}>
            <div className={`${styles.input_box} col-md-5`}>
              <label htmlFor={`${item._id}_title`}>
                عنوان <span>*</span>
              </label>
              <input
                type="text"
                id={`${item._id}_title`}
                value={item.title}
                onChange={(e) => {
                  const copyValue = [...value];
                  copyValue[index].title = e.target.value;
                  changeValue(copyValue);
                }}
              />
            </div>
            <div className={`${styles.input_box} col-md-5`}>
              <label htmlFor={`${item._id}value`}>
                مقدار <span>*</span>
              </label>
              <input
                type="text"
                id={`${item._id}value`}
                value={item.value}
                onChange={(e) => {
                  const copyValue = [...value];
                  copyValue[index].value = e.target.value;
                  changeValue(copyValue);
                }}
              />
            </div>
            <div className={`${styles.delete_btn} col-md-2`}>
              <button
                className="btn btn-danger"
                onClick={() => removeDetail(item._id)}
              >
                حذف این اطلاعات
              </button>
            </div>
          </div>
        ))}
        <div className={`${styles.add_btn} col-md-2`}>
          <button className="btn btn-success" onClick={addValueHandler}>
            اضافه کردن اطلاعات
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfosProduct;
