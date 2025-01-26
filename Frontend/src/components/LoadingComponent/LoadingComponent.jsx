
const LoadingComponent = () =>{
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm z-10">
          <div className="relative text-center">
            <div className="relative inline-flex">
              {/* Circular loader */}
              <div
                className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
              ></div>
                       
    <div className="absolute inset-0 flex items-center justify-center animate-pulse"
              >
                <img src="favicon.ico" alt="loading icon" className="w-7" />
              </div>
            </div>
            {/* Loading text */}
            <div className="mt-4 text-gray-500 text-lg">
              Your request is being processed. Do not close or refresh the page.
            </div>
          </div>
        </div>
      );
}

export default LoadingComponent