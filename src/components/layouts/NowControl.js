import React, { useEffect, useRef } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { BsChevronUp } from 'react-icons/bs'
import { GiVineFlower } from 'react-icons/gi'
import { DiApple } from 'react-icons/di'
import { AiFillAndroid } from 'react-icons/ai'
import BaseTooltip from '../shared/BaseTooltip'
import { useTranslation } from 'react-i18next'
import { onScroll } from '../../utils'

const NowControl = () => {
  const { t } = useTranslation()
  const controlRef = useRef()

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
  }, [controlRef])

  const listenToScroll = () => {
    if (controlRef) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      if (winScroll > 215) controlRef.current.style.transform = 'translateY(0)'
      else controlRef.current.style.transform = 'translateY(100%)'
    }
  }

  return (
    <ButtonGroup
      ref={controlRef}
      orientation="vertical"
      className="fixed right-0 bottom-0 transition duration-500"
      style={{ background: '#c2c2c2', borderRadius: '0', transform: 'translateY(100%)' }}
    >
      <Button style={{ borderRadius: '0', width: '40px', padding: '0' }} onClick={() => onScroll('content')}>
        <BaseTooltip placement="left" title={t('control.backToTop')}>
          <div className="px-3 py-2">
            <BsChevronUp className="font-extrabold text-xl" />
          </div>
        </BaseTooltip>
      </Button>
      <Button style={{ borderRadius: '0', width: '40px', padding: '0' }}
        onClick={() => window.open("http://localhost:4000/tuyen-dung", "_blank")}>
        <BaseTooltip placement="left" title={t('control.register')}>
          <div className="px-3 py-2">
            <GiVineFlower className="font-extrabold text-xl" />
          </div>
        </BaseTooltip>
      </Button>
      <Button style={{ borderRadius: '0', width: '40px', padding: '0' }}
        onClick={() => window.open("https://apps.apple.com/us/app/deliverynow/id1137866760", "_blank")}>
        <BaseTooltip placement="left" title={t('control.ios')}>
          <div className="px-3 py-2">
            <DiApple className="font-extrabold text-xl" />
          </div>
        </BaseTooltip>
      </Button>
      <Button style={{ borderRadius: '0', width: '40px', padding: '0' }}
        onClick={() => window.open("https://play.google.com/store/apps/details?id=com.deliverynow", "_blank")}>
        <BaseTooltip placement="left" title={t('control.android')}>
          <div className="px-3 py-2">
            <AiFillAndroid className="font-extrabold text-xl" />
          </div>
        </BaseTooltip>
      </Button>
    </ButtonGroup>
  )
}

export default NowControl
