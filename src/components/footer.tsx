import * as React from "react";

const Footer = () => {

  var currentTime = new Date()
  var year = currentTime.getFullYear()
  
  return (
    <footer className="centered-container bg-gray-100">
      <div className="py-10 grid gap-y-5 flex-none lg:grid-cols-2 xl:justify-around">
        <div className="grid grid-cols-2 lg:gap-x-5">
          <div className="logo">
            <a href="https://localocker.com/">
              <img
                className=""
                src="https://cdn.fs.brandfolder.com/cache=expiry:604800/deY3VGFpSjC761Abjbfc"
                width="100"
                height="100"
              />
            </a>
          </div>

          <div>
            <div className="grid gap-y-2 lg:grid-cols-2">
              <div>
                <div>
                  <a href="https://localocker.com/terms/" className="hover:text-ll-red">[Terms]</a>
                </div>
                <div>
                  <a href="https://localocker.com/privacy/" className="hover:text-ll-red">[Privacy]</a>
                </div>
              </div>

              <div className="logos mt-2 flex space-x-3">
                <a href="https://ndlr.cc/huGgl58uJ" target="_blank" rel="noopener noreferrer" className="mr-2">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a href="https://www.instagram.com/mylocalocker/" target="_blank"
                  rel="noopener noreferrer">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>


        <div className="">
          <div className="email font-semibold">
            <a href="mailto:reserve@localocker.com">reserve@localocker.com</a>
          </div>
          <div className="telephones flex flex-col">
            <a href="tel:+1 (646) 713-0937"><i>[mainPhone] <sub>(call)</sub></i></a><a
              href="sms:+1 (646) 849-2749"><i>[supportPhone] <sub>(text)</sub></i></a>
          </div>
        </div>

        <div>
          <p><strong>© {year} [xxxxx] </strong></p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

