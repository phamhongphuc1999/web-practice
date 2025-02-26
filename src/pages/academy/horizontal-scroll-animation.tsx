import Dog1Img from 'src/assets/images/dogs/dog1.jpeg';
import Dog2Img from 'src/assets/images/dogs/dog2.jpeg';
import Dog3Img from 'src/assets/images/dogs/dog3.jpeg';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function HorizontalScrollAnimation() {
  const { t } = useLocalTranslate();

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('academy'), link: ROUTE.ACADEMY },
          { label: t('academy-item.horizontal-scroll'), isRemain: true },
        ]}
      />
      <div className="horizontal-scroll-animation">
        <div className="horizontal-scroll-animation-wrapper">
          <figure>
            <img src={Dog1Img} alt="dog1" />
          </figure>
          <figure>
            <img src={Dog2Img} alt="dog2" />
          </figure>
          <figure>
            <img src={Dog3Img} alt="dog3" />
          </figure>
        </div>
        <section>
          <div className="section-container">
            <div className="content">
              <h2>Section1</h2>
              <p>Section description</p>
            </div>
          </div>
        </section>
        <section>
          <div className="section-container">
            <div className="content">
              <h2>Section2</h2>
              <p>Section description</p>
            </div>
          </div>
        </section>
        <section>
          <div className="section-container">
            <div className="content">
              <h2>Section3</h2>
              <p>Section description</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
