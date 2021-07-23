import { scroller } from "react-scroll"

export const onScroll = (id) => {
  scroller.scrollTo(id, {
    duration: 500,
    delay: 50,
    offset: -50,
    smooth: "easeInOutQuart"
  });
}
