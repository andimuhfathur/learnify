"use client";

const LoaderPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <div className="loader border-16 border-gray-200 border-t-16 border-t-[#ff6b00] border-b-16 border-b-blue-600 rounded-full w-[120px] h-[120px] animate-spin"></div>
            <h2 className="text-2xl font-semibold mb-6">Sabar Ki, Sedang di Proses...</h2>
        </div>
    );
}

export default LoaderPage