import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Footer } from './Footer';
import { Hero } from './Hero';


const Base = () => {

   return (

        <div className="text-gray-600 antialiased">
            <Meta title={AppConfig.title} description={AppConfig.description}/>
            <Hero/>
            {/* <VerticalFeatures />*/}
            {/* <Banner />*/}

            <Footer/>
        </div>
    )
};

export { Base };
