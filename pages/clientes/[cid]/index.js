import Dashboard from "../../../layouts/dashboard";
import { useRouter } from "next/router";
import { useState } from "react";
import BackButton from "components/backbutton";
import BotonLink from "components/ButtonLink";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import ErrorListProperty from "@/components/errorListPropertygeneral";

import Modal from "react-modal";

export async function getServerSideProps(context) {
  try {
    const cid = context.params.cid;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Cliente/${cid}`
    );
    const data = await res.json();
    return {
      props: {
        cliente: data.Data || null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        cliente: null,
      },
    };
  }
}

function ClienteDetails({ cliente = {} }) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [numeroPlaca, setNumeroPlaca] = useState("");
  const [numeroMotor, setNumeroMotor] = useState("");
  const [clienteId, setClienteId] = useState(cliente?.Id);
  const [errors, setErrors] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar este cliente?"
    );
    if (confirmed) {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Cliente/${cliente.Id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        router.push("/clientes");
      }
      setIsLoading(false);
      console.error("Error deleting cliente:", res.status);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Vehiculo`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            clienteId: parseInt(clienteId),
            marca: marca,
            modelo: modelo,
            anio: anio,
            numeroPlaca: numeroPlaca,
            numeroMotor: numeroMotor,
          }),
        }
      );

      if (res.ok) {
        setErrors([]);
        setMarca("");
        setModelo("");
        setAnio("");
        setNumeroPlaca("");
        setNumeroMotor("");

        // Cierra el modal
        setModalIsOpen(false);

        // Recarga la página
        window.location.reload();

        return router.push(`/clientes/${clienteId}`);
      }
      const data = await res.json();
      setErrors(data.errors);
      setSubmitting(false);
    } catch (errors) {}
  }

  return (
    <>
      <Dashboard>
        <BackButton></BackButton>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold mb-4">
            {cliente?.Nombre} {cliente?.Apellido}
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-bold mb-1">Correo electrónico:</p>
              <p>{cliente?.Email}</p>
            </div>
            <div>
              <p className="font-bold mb-1">Teléfono:</p>
              <p>{cliente?.Telefono}</p>
            </div>
            <div>
              <p className="font-bold mb-1">Dirección:</p>
              <p>{cliente?.Direccion}</p>
            </div>
            <div>
              <p className="font-bold mb-1">Documento:</p>
              <p>
                <b>{cliente?.TipoDocumento?.Tipo}:</b>{" "}
                {cliente?.NumeroDocumento}
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">Edad:</p>
              <p>{cliente?.Edad}</p>
            </div>
          </div>
          <div className="mt-6">
            <BotonLink
              href={`${cliente?.Id}/actualizar`}
              className="mr-4"
              isLoading={isLoading.toString()}
            >
              Editar
            </BotonLink>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 ml-4 rounded"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Procesando ...
                </>
              ) : (
                "Eliminar"
              )}
            </button>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setModalIsOpen(true)}
              className="bg-green-900 inline-block px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              Agregar vehículo
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr className="text-left bg-gray-200">
                  <th className="px-4 py-2">Marca</th>
                  <th className="px-4 py-2">Modelo</th>
                  <th className="px-4 py-2">Año</th>
                  <th className="px-4 py-2">Número de placa</th>
                  <th className="px-4 py-2">Número de motor</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {cliente?.Vehiculos?.map((vehiculo) => (
                  <tr key={vehiculo.Id}>
                    <td className="border px-4 py-2">{vehiculo.Marca}</td>
                    <td className="border px-4 py-2">{vehiculo.Modelo}</td>
                    <td className="border px-4 py-2">{vehiculo.Anio}</td>
                    <td className="border px-4 py-2">{vehiculo.NumeroPlaca}</td>
                    <td className="border px-4 py-2">{vehiculo.NumeroMotor}</td>
                    <td className="border px-4 py-2"> <Link href={`/vehiculos/${vehiculo.Id}`}>
                    <HiPencilAlt />
                  </Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <div className="flex justify-around">
            <div></div>
            <div>
              {" "}
              <h2 className="text-2xl font-bold mb-4">Agregar vehículo</h2>
            </div>
            <div>
              {" "}
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 ml-4 rounded"
                onClick={() => setModalIsOpen(false)}
              >
                X
              </button>
            </div>
          </div>

          <form
            className="my-14 mx-auto max-w-3xl space-y-6 px-4"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="...">
                <input
                  className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                  id="grid-marca"
                  type="text"
                  onChange={(e) => setMarca(e.target.value)}
                  value={marca}
                  disabled={submitting}
                  placeholder="Marca"
                />
                {errors.Marca && <ErrorListProperty errors={errors.Marca} />}
              </div>
              <div className="...">
                <input
                  className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                  id="grid-modelo"
                  type="text"
                  onChange={(e) => setModelo(e.target.value)}
                  value={modelo}
                  disabled={submitting}
                  placeholder="Modelo"
                />
                {errors.Modelo && <ErrorListProperty errors={errors.Modelo} />}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="...">
                <input
                  className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                  id="grid-anio"
                  type="text"
                  onChange={(e) => setAnio(e.target.value)}
                  value={anio}
                  disabled={submitting}
                  placeholder="Año"
                />
                {errors.Anio && <ErrorListProperty errors={errors.Anio} />}
              </div>
              <div className="...">
                <input
                  className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                  id="grid-numeroPlaca"
                  type="text"
                  onChange={(e) => setNumeroPlaca(e.target.value)}
                  value={numeroPlaca}
                  disabled={submitting}
                  placeholder="Número placa"
                />
                {errors.NumeroPlaca && (
                  <ErrorListProperty errors={errors.NumeroPlaca} />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                  id="grid-numeroMotor"
                  type="text"
                  onChange={(e) => setNumeroMotor(e.target.value)}
                  value={numeroMotor}
                  disabled={submitting}
                  placeholder="Número motor"
                />
                {errors.NumeroMotor && (
                  <ErrorListProperty errors={errors.NumeroMotor} />
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                {submitting ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Procesando ...
                  </>
                ) : (
                  "Enviar"
                )}
              </button>
            </div>
          </form>
        </Modal>
      </Dashboard>
    </>
  );
}

export default ClienteDetails;
