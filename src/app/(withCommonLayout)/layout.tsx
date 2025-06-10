
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="min-h-screen">
    <Navbar/>
    <div className="max-w-[1600px] mx-auto min-h-[700px]">

    {children}
    </div>
    <Footer/>

    </div>;
};

export default Layout;
