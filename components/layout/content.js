import Footer from "./footer";
const content = ({ children }) => {
  return (
    <>
      <div className="flex h-screen w-full flex-col pl-24">
        <main className="flex-grow bg-gray-100 p-8">{children}</main>
        <Footer></Footer>
      </div>
    </>
  );
};

export default content;
