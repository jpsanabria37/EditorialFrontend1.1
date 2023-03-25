import Footer from "./footer";
import Modal from 'react-modal';

Modal.setAppElement('#root');
const content = ({ children }) => {
  return (
    <>
      <div className="flex h-screen w-full flex-col pl-24" id="root">
        <main className="flex-grow bg-gray-100 p-8">{children}</main>
        <Footer></Footer>
      </div>
    </>
  );
};

export default content;
