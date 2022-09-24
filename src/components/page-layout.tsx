import * as React from "react";
import Header from "./header";
import Footer from "./footer";

type Props = {
  mainPhone?: string;
  children?: React.ReactNode;
};

const PageLayout = ({ mainPhone, children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header mainPhone={mainPhone} />
      <div className="border-b-2 border-gray-400"></div>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default PageLayout;
