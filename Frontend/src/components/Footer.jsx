import toast from "react-hot-toast";

function Footer() {
  return (
    <footer
      className="w-full mt-20 py-8 transition-all duration-300 border-y border-primary/20 bg-base-200/50 flex flex-col items-center"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-sm p-3 md:text-base text-base-content/50 font-medium tracking-wide">
            © 2026 | EntrancePrep | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;