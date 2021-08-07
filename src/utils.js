import { scroller } from "react-scroll";

export const onScroll = (id) => {
  scroller.scrollTo(id, {
    duration: 500,
    delay: 50,
    offset: -50,
    smooth: "easeInOutQuart",
  });
};

export const GetItem = (key) => {
  return localStorage.getItem(key);
};

export const SetItem = (key, value) => {
  localStorage.setItem(key, value);
};
