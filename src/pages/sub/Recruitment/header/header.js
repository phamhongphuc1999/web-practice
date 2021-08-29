import { Container } from "@material-ui/core";
import cx from "classnames";
import logo from "../../../../assets/images/logo/nowVn.png";

import * as styles from "./header.module.css";

const switchConfig = [
  { title: "Đăng ký", pathname: "#register" },
  { title: "Tiêu chí lựa chọn", pathname: "#criteria" },
  { title: "Quy trình đăng ký", pathname: "#process" },
  { title: "Các câu hỏi thường gặp", pathname: "#question" },
];

const Header = () => {
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
            {switchConfig.map((element, index) => (
              <div
                key={index}
                className={cx(styles.columnContent, "text-center")}
              >
                <a href={element.pathname}>{element.title}</a>
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
};

export default Header;
