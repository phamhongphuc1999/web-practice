import { Container } from '@mui/material';
import { CssNavLink } from 'src/components/utils';
import { AppReferenceConfig } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function Footer() {
  const { t } = useLocalTranslate();

  return (
    <div className="bg-[#292929] p-[2rem]">
      <Container maxWidth="lg" className="mt-[2rem] flex flex-wrap justify-between gap-[2rem]">
        {Object.values(AppReferenceConfig).map((item) => {
          return (
            <div
              key={item.id}
              className="w-[calc(50%-16px)] md:w-[calc(20%-32px)] md:border-r-[1px] md:border-r-[#3F3F3F]"
            >
              <p className="text-[20px] font-[600] text-[#FFFFFF] uppercase">{t(item.title)}</p>
              {item.items && (
                <div className="mt-[1.5rem] flex flex-col items-start">
                  {item.items.map((info, index) => {
                    return (
                      <CssNavLink key={`ok${index}`} to={info.link}>
                        <p className="mt-[1rem] font-[500] text-[#8D9097]">{t(info.title)}</p>
                      </CssNavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </Container>
    </div>
  );
}
