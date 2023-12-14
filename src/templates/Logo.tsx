import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  return (
    <span className={`inline-flex items-center text-gray-900 ${fontStyle}`}>
         <img
             src={'/assets/images/pen_icon.svg'}
             alt="main Icon"
             className="w-[3rem]"
         />

      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
