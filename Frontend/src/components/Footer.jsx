function Footer() {
  return (
    <footer
      className={`bottom-0 py-8 transition-all duration-300 w-[100%] mt-[80px] pl-[50px] sm:pl-[0px]
             bg-gray-300 border-2 border-l-0 border-r-0 border-gray-400 flex flex-col 
        `}>
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col items-center justify-center">
                <div className="text-center ">
                    <p className="text-gray-600 text-sm md:text-base">
                        © 2025 Your Project Name. All rights reserved.
                    </p>
                </div>
        </div>
    </footer>
  );
}

export default Footer;
