import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

interface PdfViewerProps {
    pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    const [numPages, setNumPages] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0); // Initial scale

    const handleLoadSuccess = ({ numPages: pageValue }: { numPages: number }) => {
        setNumPages(pageValue);
    };

    const handleLoadError = (error: Error) => {
        console.error('Error loading PDF:', error);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages || 1));
    };

    const handleZoomIn = () => {
        setScale((prevScale) => prevScale + 0.2); // Adjust the zoom increment as needed
    };

    const handleZoomOut = () => {
        setScale((prevScale) => Math.max(prevScale - 0.2, 0.2)); // Adjust the zoom decrement as needed
    };

    return (
        <div className="w-[100%] overflow-hidden">
            <div className="flex md:flex-row justify-around items-center space-y-4 md:space-y-0 ">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 m-2 ${
                        currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white rounded`}
                >
                    Prev
                </button>
                <span className="text-gray-700 font-bold text-lg md:text-xl m-2">
                     Page {currentPage} of {numPages}
                         </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === numPages}
                    className={`px-3 py-2 m-2 ${
                        currentPage === numPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white rounded`}
                >
                    Next
                </button>
                <button
                    onClick={handleZoomIn}
                    className="px-3 py-2 m-2 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/>
                    </svg>
                </button>
                <button
                    onClick={handleZoomOut}
                    className="px-3 py-2 m-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z"/>
                    </svg>
                </button>
            </div>
            <div className="flex justify-center w-full sm:p-0 page-transition">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={handleLoadSuccess}
                    onLoadError={handleLoadError}
                    className={"overflow-auto"}
                >
                    <Page

                        key={`page_${currentPage}`}
                        pageNumber={currentPage}
                        scale={scale} // Apply the scale to the Page component
                    />
                </Document>
            </div>
            <div className="flex md:flex-row justify-around items-center space-y-4 md:space-y-0 ">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 m-2 ${
                        currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white rounded`}
                >
                    Prev
                </button>
                <span className="text-gray-700 font-bold text-lg md:text-xl m-2">
                     Page {currentPage} of {numPages}
                         </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === numPages}
                    className={`px-3 py-2 m-2 ${
                        currentPage === numPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white rounded`}
                >
                    Next
                </button>
                <button
                    onClick={handleZoomIn}
                    className="px-3 py-2 m-2 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/>
                    </svg>
                </button>
                <button
                    onClick={handleZoomOut}
                    className="px-3 py-2 m-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z"/>
                    </svg>
                </button>
            </div>


        </div>
    );
};

export default PdfViewer;
