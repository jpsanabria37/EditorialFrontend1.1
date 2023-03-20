import Link from "next/link";

function BotonLink(props) {
  const { href, className, children, isLoading } = props;

  return (
    <Link href={href}>
      <button
        className={`inline-block px-4 py-2 text-white bg-blue-500 rounded-md ${className}`}
        disable={isLoading}
      >
        {children}
      </button>
    </Link>
  );
}

export default BotonLink;
