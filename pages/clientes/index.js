import Link from "next/link";
import Dashboard from "../../layouts/dashboard";
import { HiPencilAlt } from "react-icons/hi";

export default function ListadoClientes({ clientes }) {
  return (
    <Dashboard>
      <Link href={"/clientes/crear"}>
        <button className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg mb-6">
          Nuevo cliente
        </button>
      </Link>
      <div className=" hidden overflow-auto rounded-xl shadow md:block">
        <table className="w-full hover:cursor-auto">
          <thead className="border-b-2 border-gray-200 bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">
                Nombre
              </th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">
                Apellido
              </th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">
                Documento
              </th>
              <th className="w-36 p-3 text-left text-sm font-semibold tracking-wide">
                No. Documento
              </th>
              <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clientes?.map((cliente) => (
              <tr key={cliente.Id}>
                <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                  {cliente.Nombre}
                </td>

                <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                  {cliente.Apellido}
                </td>

                <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                  {cliente.TipoDocumento?.Tipo}
                </td>

                <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                  {cliente.NumeroDocumento}
                </td>
                <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                  <Link href={`/clientes/${cliente.Id}`}>
                    <HiPencilAlt />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden ">
        {clientes?.map((cliente) => (
          <div
            key={cliente.Id}
            className="space-y-3 rounded-lg bg-white p-4 shadow"
          >
            <div className="flex items-center space-x-2 text-sm">
              <div className="whitespace-nowrap text-sm text-gray-600">
                {cliente.Nombre}
              </div>
              <div className="whitespace-nowrap text-sm text-gray-600"></div>
            </div>
            <div className="whitespace-nowrap text-sm text-gray-600"></div>
            <div className="whitespace-nowrap text-sm text-black"></div>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Cliente`
  );
  const data = await res.json();
  const clientes = data.Data || [];
  return { props: { clientes } };
};
