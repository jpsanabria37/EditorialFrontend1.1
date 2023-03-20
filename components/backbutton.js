import { useRouter } from "next/router";
import { MdArrowBack } from "react-icons/md";

const BackButton = () => {
  const history = useRouter();

  const handleClick = () => {
    history.back();
  };

  return (
    <button
      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={handleClick}
    >
      <MdArrowBack className="h-4 w-4 mr-2" />
      Volver
    </button>
  );
};

export default BackButton;
