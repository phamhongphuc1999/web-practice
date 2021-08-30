import { Container } from "@material-ui/core";
import cx from "classnames";
import { forwardRef, useEffect, useState } from "react";
import logo from "../../../../assets/images/logo/nowVn.png";

import * as styles from "./header.module.css";

const Header = forwardRef((ref1, ref2, ref3, ref4) => {
  const [config, setConfig] = useState([]);

  useEffect(() => {
    setConfig([
      { title: "Đăng ký", pathname: ref1 },
      { title: "Tiêu chí lựa chọn", pathname: ref2 },
      { title: "Quy trình đăng ký", pathname: ref3 },
      { title: "Các câu hỏi thường gặp", pathname: ref4 },
    ]);
  }, [ref1, ref2, ref3, ref4]);

  return (
    <div className={styles.containerHeader}>
      <Container>
        <div className={cx(styles.content, "grid grid-cols-12 gap1")}>
          <div className="col-auto w-auto">
            <a href="/">
              <img src={logo} alt="now" />
            </a>
          </div>
          <div className="col-auto"></div>
          <div className="col-start-3 col-end-10 flex">
            {config.map((element, index) => (
              <div
                key={index}
                onClick={() => element.pathname.current.scrollIntoView()}
                className={cx(styles.columnContent, "text-center")}
              >
                {element.title}
              </div>
            ))}
            <div className={cx(styles.columnContent, "text-center")}></div>
          </div>
          <div className="col-span-2 flex items-center justify-end">
            <button className={styles.appBut}>App Tai xe</button>
          </div>
        </div>
      </Container>
    </div>
  );
});

export default Header;
