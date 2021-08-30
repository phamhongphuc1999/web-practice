import { useEffect, useState } from "react";

export const useScroll = (scrollRef, count) => {
  const [limit, setLimit] = useState(0);
  const [isMove, setMove] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    if (scrollRef != null) setLimit(scrollRef.current.clientHeight - 180);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRef, count]);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > limit) setMove(true);
    else setMove(false);
  };

  return { limit, isMove };
};
