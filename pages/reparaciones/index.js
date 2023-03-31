import Dashboard from "../../layouts/dashboard";
import Link from "next/link";
export default function ListadoReparaciones() {
  return (
    <>
      <Dashboard>
        <Link href={"/reparaciones/crear"}>
          <button className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg mb-6">
            Reparacion
          </button>
        </Link>
      </Dashboard>
    </>
  );
}
