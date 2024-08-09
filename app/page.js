import Image from "next/image";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Navbar from './components/Navbar';
import Docs from './components/Docs';
import Footer from './components/Footer';

export default function page() {
  return (
    <>
    <Navbar />
    <Home/>
    <Chat/>
    <Docs />
    <Footer />
    </>
  );
}
