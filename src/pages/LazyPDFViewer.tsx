// pages/index.tsx

import dynamic from 'next/dynamic';
import React, {useEffect, useState} from "react";
import {Section} from "@/layout/Section";
import {NavbarTwoColumns} from "@/navigation/NavbarTwoColumns";
import {Logo} from "@/templates/Logo";
import Link from "next/link";
import {Background} from "@/background/Background";
import {auth, provider,} from '../config/firebaseConfig';
import {signInWithPopup} from 'firebase/auth';


import ImageSliders from "../components/ImageSliders";


const LazyPDFViewer = dynamic(() => import('../components/PDFViewer'), {ssr: false});

const HomePage: React.FC = () => {

    const pdfFileUrl = '/assets/pdf/Sangola_Sampada_Diwali_2023.pdf';

    const fileName = pdfFileUrl.substring(pdfFileUrl.lastIndexOf("/") + 1);
    const fileNameWithoutExtension = fileName.split(".")[0];
    const [storedUser, setStoredUser] = useState(null);
    const [refresh, setRefresh] = useState(false);


    const getUserFromSessionStorage = () => {
        const storedUserData = sessionStorage.getItem('user');
        if (storedUserData) {
            const user = JSON.parse(storedUserData);

            setStoredUser(user);
            setRefresh(!refresh);
            return user;
        }
        return null;
    };

    const handleGoogleLogin = async () => {

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user) {
                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                };

                window.sessionStorage.setItem('user', JSON.stringify(userData));

                getUserFromSessionStorage();
            }
        } catch (error:any) {
            console.error(error?.message);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setStoredUser(null);
        setRefresh((prevRefresh) => !prevRefresh);
    };

    useEffect(() => {
        getUserFromSessionStorage();
    }, [])

    return (
        <Background color="bg-gray-100">
            <Section yPadding="py-6">
                <NavbarTwoColumns logo={<Logo xl/>}>
                    <li>
                        <Link href="/" className="cursor-pointer hover:bg-black hover:text-white p-2 rounded">
                            Home
                        </Link>
                    </li>
                    {
                        storedUser?.uid ?
                            <li className="cursor-pointer hover:bg-black hover:text-white p-2 rounded"
                                onClick={handleLogout}>
                                Logout
                            </li> :
                            <li className="cursor-pointer hover:bg-black hover:text-white p-2 rounded">
                                Sign In
                            </li>
                    }

                </NavbarTwoColumns>
            </Section>

            {storedUser?.uid ?
                <Section yPadding=" py-6">
                    <p className='pl-2'>PDF पाहण्यासाठी खाली scroll करा .</p>
                    <div className="p-2 ">
                        <ImageSliders />
                    </div>

                    <div>
                        <h1 className="font-bold flex justify-center text-[25px]">{fileNameWithoutExtension}</h1>
                        <LazyPDFViewer key={refresh}
                                       className="w-full flex items-center "
                                       scroll="true"
                                       pdfUrl={pdfFileUrl}
                                       zoom={1.5}/>
                    </div>
                    <div className="p-2">
                        <ImageSliders/>
                    </div>

                </Section>
                :
                <Section>
                    <p>Pdf पाहण्यासाठी लॉगिन करा...</p>
                    <button
                        className="bg-white border border-gray-300 hover:border-gray-400 rounded-lg shadow-md p-3 text-gray-500 items-center font-medium gap-x-3 px-6 text-[20px]  whitespace-nowrap flex items-center cursor-pointer"
                        onClick={handleGoogleLogin}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="15.25"
                            viewBox="0 0 488 512"
                            className="mr-2"
                        >
                            <path
                                fill="#4285F4"
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            />
                        </svg>
                        <p className="text-gray-700">Sign in with Google</p>
                    </button>
                </Section>

            }

        </Background>
    );
};

export default HomePage;