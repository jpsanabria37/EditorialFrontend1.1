import Dashboard from "../../../layouts/dashboard";
import { useRouter } from "next/router";
import { useState } from "react";
import BackButton from "components/backbutton";
import BotonLink from "components/ButtonLink";

import ReactModal from "react-modal";





export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Cliente/${id}`);
    const data = await res.json();
    console.log(data);
    console.log("hijueputa");
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

function Cliente({cliente , error}){
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <h1>Cliente {cliente.Id}</h1>
      <p>Nombre: {cliente.Nombre}</p>
      <p>Email: {cliente.Email}</p>
    </div>
  );
}


export default Cliente;

/* import Dashboard from "../../../layouts/dashboard";
import { useRouter } from "next/router";
import { useState } from "react";
import BackButton from "components/backbutton";
import BotonLink from "components/ButtonLink";

import ReactModal from "react-modal";

export default function ClienteDetails({ cliente = {} }) {

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

        return router.push("/clientes");
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
                <b>{cliente?.TipoDocumento?.Tipo}:</b> {cliente?.NumeroDocumento}
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
              isLoading={isLoading}
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

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul>
            {cliente?.Vehiculos?.map((vehiculo) => (
              <li key={vehiculo.Id} className="border-t border-gray-200">
                <a
                  href={`/vehiculos/${vehiculo.Id}`}
                  className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-lg leading-5 font-medium text-indigo-600 truncate">
                        {`${vehiculo.Marca} ${vehiculo.Modelo}`}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {vehiculo.anio}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                          <span>{vehiculo.NumeroPlaca}</span>
                        </div>
                        <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 5a1 1 0 112 0v5a1 1 0 11-2 0V5zm4-2a1 1 0 100 2h2a1 1 0 100-2H9zm7.707 1.293a1 1 0 010 1.414L14.414 10l2.293 2.293a1 1 0 11-1.414 1.414L13 11.414l-2.293 2.293a1 1 0 11-1.414-1.414L11.586 10l-2.293-2.293a1 1 0 011.414-1.414L13 8.586l2.293-2.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>color</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm leading-5 sm:mt-0">
                        <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.293-4.293a1 1 0 011.414 0L10 12.586l2.879-2.879a1 1 0 011.414 1.414L11.414 14l2.879 2.879a1 1 0 01-1.414 1.414L10 15.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 14 5.707 11.121a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>kilometraje</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <h2 className="text-2xl font-bold mb-4">Agregar vehículo</h2>
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
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 ml-4 rounded"
                onClick={() => setModalIsOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </form>
        </ReactModal>
      </Dashboard>
    </>
  );
}



export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Cliente/${id}`);
    const data = await res.json();
    console.log(cliente);
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
*/