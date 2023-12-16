import { Carousel } from 'antd';
import React from 'react';

const ImageSliders: React.FC = () => {
  const images: string[] = [
    '/assets/images/advt/cover_page.jpeg',
    '/assets/images/advt/advt4.jpeg',
    '/assets/images/advt/advt2.jpeg',
    '/assets/images/advt/advt3.jpeg',
    '/assets/images/advt/advt5.jpeg',
    '/assets/images/advt/advt6.jpeg',
    '/assets/images/advt/advt7.jpeg',
    '/assets/images/advt/advt8.jpeg',
    '/assets/images/advt/advt9.jpeg',
    '/assets/images/advt/advt10.jpeg',
    '/assets/images/advt/advt11.jpeg',
    '/assets/images/advt/advt12.jpeg',
    '/assets/images/advt/advt13.jpeg',
    '/assets/images/advt/advt14.jpeg',
  ];

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    height: 'max-content',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  /* const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    }; */

  return (
    <div className="mx-auto mt-10 max-w-screen-lg">
      <Carousel autoplay={true} infinite={true} autoplaySpeed={6000}>
        {images.map((image, index) => (
          <div key={index} className="w-[400px]">
            <img src={image} alt={`Slide ${index}`} style={contentStyle} />

          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSliders;
