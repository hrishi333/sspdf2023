
import Link from 'next/link';
import {Background} from '../background/Background';
import {Button} from '../button/Button';
import {HeroOneButton} from '../hero/HeroOneButton';
import {Section} from '../layout/Section';
import {NavbarTwoColumns} from '../navigation/NavbarTwoColumns';
import {Logo} from './Logo';
import ImageSliders from "../components/ImageSliders";
import React from "react";

const Hero = () => (
    <Background color="bg-gray-100">
        <Section yPadding="py-6">
            <NavbarTwoColumns logo={<Logo xl/>}>
                <li>
                    <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
                        about
                    </Link>
                </li>
                <li>
                    <Link  href="/LazyPDFViewer">Sign in</Link>
                </li>
            </NavbarTwoColumns>
        </Section>

        <Section yPadding="pt-20 pb-32">
            <HeroOneButton
                title={
                    <>
                        {'साप्ताहिक सांगोला संपदा \n'}
                        <span className="text-primary-500">३७ वा दीपावली विशेषांक २०२३</span>
                    </>
                }
                description="दर्जेदार कथा, कविता , लेख , व्यंगचित्रे , आणि विविध परिपूर्ण साहित्याने भरलेला दिवाळी अंक !"
                button={
                    <Link href="/LazyPDFViewer">
                        <Button xl>Read PDF</Button>
                    </Link>
                }
            />
        </Section>
        <div className="p-2">
            <ImageSliders/>
        </div>
    </Background>
);

export {Hero};
