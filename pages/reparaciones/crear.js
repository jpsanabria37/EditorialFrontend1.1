import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../../layouts/dashboard";
import BackButton from "components/backbutton";

export async function getServerSideProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/CategoriaVehiculo`,
    {
      method: "GET",
      headers: {
        accept: "text/plain",
      },
    }
  );
  const data = await response.json();

  const cvehiculos = data.Data;

  return {
    props: {
      cvehiculos,
    },
  };
}

export default function ReparacionForm({ cvehiculos }) {
  const [category, setCategory] = useState(""); // estado de la categoría de vehículo
  const [services, setServices] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [vehiculos, setVehiculos] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [comentarios, setComentarios] = useState("");

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Función para obtener los servicios según la categoría de vehículo
    const fetchServices = async () => {
      //const result = await getServiceByCategory(category); // llamar a la función que obtiene los servicios de la API
      // setServices(result); // actualizar el estado con los servicios obtenidos
    };
    if (category) {
      fetchServices(); // llamar a la función si hay una categoría seleccionada
    }
  }, [category]); // actualizar los servicios cada vez que cambie la categoría

  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // actualizar el estado de la categoría de vehículo
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Vehiculo/Parametros?NumeroPlaca=${searchText}`
      );
      setVehiculos(response.data.Data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.error(error);
    }
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar el formulario con los datos de selectedVehicle
  };

  return (
    <Dashboard>
      <BackButton />

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-left">
          <div>
            <div>
              <form onSubmit={handleSearch} className="w-full max-w-lg mb-4">
                <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Buscar vehículo por número de placa"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    disabled={submitting}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
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
            </div>
          </div>

          <div className="max-w-lg w-full bg-white shadow-md overflow-hidden sm:rounded-lg mb-4">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Resultados de búsqueda
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Haga clic en un resultado para ver los detalles.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {vehiculos.length > 0 &&
                  vehiculos?.map((vehiculo) => (
                    <a
                      key={vehiculo.Id}
                      onClick={() => handleSelectVehicle(vehiculo)}
                      className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                          {vehiculo.NumeroPlaca}
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900">
                          {vehiculo.Marca} {vehiculo.Modelo}
                        </dd>
                      </div>
                    </a>
                  ))}
              </dl>
            </div>
          </div>
        </div>
        {selectedVehicle && (
          <>
            <div className="max-w-7xl mx-auto py-3 sm:px-6 lg:px-8">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedVehicle.Cliente?.Nombre}{" "}
                    {selectedVehicle.Cliente?.Apellido}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md shadow">
                      <h3 className="text-lg font-bold mb-2">
                        Detalles del vehículo
                      </h3>
                      <p className="font-bold mb-1">Marca:</p>
                      <p>{selectedVehicle.Marca}</p>
                      <p className="font-bold mb-1">Modelo:</p>
                      <p>{selectedVehicle.Modelo}</p>
                      <p className="font-bold mb-1">Año:</p>
                      <p>{selectedVehicle.Anio}</p>
                      <p className="font-bold mb-1">Placa:</p>
                      <p>{selectedVehicle.NumeroPlaca}</p>
                      <p className="font-bold mb-1">Número de motor:</p>
                      <p>{selectedVehicle.NumeroMotor}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md shadow">
                      <h3 className="text-lg font-bold mb-2">
                        Detalles del propietario
                      </h3>
                      <p className="font-bold mb-1">Nombre completo:</p>
                      <p>
                        {selectedVehicle.Cliente?.Nombre}{" "}
                        {selectedVehicle.Cliente?.Apellido}
                      </p>
                      <p className="font-bold mb-1">Correo electrónico:</p>
                      <p>{selectedVehicle.Cliente?.Email}</p>
                      <p className="font-bold mb-1">Teléfono:</p>
                      <p>{selectedVehicle.Cliente?.Telefono}</p>
                      <p className="font-bold mb-1">Dirección:</p>
                      <p>{selectedVehicle.Cliente?.Direccion}</p>
                      <p className="font-bold mb-1">Documento:</p>
                      <p>
                        <b>{selectedVehicle.Cliente?.TipoDocumento?.Tipo}:</b>{" "}
                        {selectedVehicle.Cliente?.NumeroDocumento}
                      </p>
                      <p className="font-bold mb-1">Edad:</p>
                      <p>{selectedVehicle.Cliente?.Edad}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto py-3 sm:px-6 lg:px-8">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-2">Reparación</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="mb-4">
                        <label htmlFor="fechaInicio">Fecha de inicio:</label>
                        <input
                          id="fechaInicio"
                          type="date"
                          value={fechaInicio}
                          onChange={(e) => setFechaInicio(e.target.value)}
                          className="border border-gray-300 p-2 rounded-lg"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="fechaFin">Fecha de fin:</label>
                        <input
                          id="fechaFin"
                          type="date"
                          value={fechaFin}
                          onChange={(e) => setFechaFin(e.target.value)}
                          className="border border-gray-300 p-2 rounded-lg"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="comentarios">Comentarios:</label>
                        <textarea
                          id="comentarios"
                          value={comentarios}
                          onChange={(e) => setComentarios(e.target.value)}
                          className="border border-gray-300 p-2 rounded-lg"
                        />
                      </div>

                      <select
                        className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                        value={category}
                        onChange={handleCategoryChange}
                      >
                        {/* opciones para la categoría de vehículo */}
                        {cvehiculos.map((option) => (
                          <option key={option.Id} value={option.Id}>
                            {option.Nombre}
                          </option>
                        ))}
                      </select>

                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Crear reparación
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Dashboard>
  );
}
