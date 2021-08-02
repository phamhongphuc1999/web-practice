import React, { useEffect, useRef, useState } from 'react'
import { FRESH } from '../assets/config/constant'
import MainFresh from '../components/fresh/MainFresh'
import NowSearch from '../components/shared/pages/NowSearch'
import cx from 'classnames'

import * as styles from '../assets/css/shared/page.module.css'

const categoryList = [
  'all', 'vege', 'fruit', 'meat', 'seafood', 'vegetable', 'rice', 'canned', 'spice'
]

const Fresh = () => {
  const scrollRef = useRef(null)
  const [limit, setLimit] = useState(0)
  const [isMove, setMove] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
  }, [])

  useEffect(() => {
    if (scrollRef != null) {
      const temp = scrollRef.current.clientHeight - (window.screen.height - 90)
      setLimit(temp)
    }
  }, [scrollRef])

  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll > limit) setMove(true);
    else setMove(false)
  }

  return (
    <>
      <div className={cx(styles.nowBanner, { [styles.moveBanner]: isMove, [styles.fixedBanner]: !isMove })}
        style={isMove ? { top: limit } : {}}>
        <NowSearch
          move={[isMove, setMove]}
          categoryList={categoryList}
          type={FRESH}
        />
      </div>
      <MainFresh ref={scrollRef} className="float-right" />
    </>
  )
}

export default Fresh
