import { useState } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const route = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Account/authenticate`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (res.ok) {
        const data = await res.json();
        // Guardar la cookie en el navegador
        document.cookie = `access_token=${data.Data.JWToken}`;

        setCredentials({
          email: "",
          password: "",
        });
        setError("");
        return route.push("/");
      } else {
        setSubmitting(false);
        const data = await res.json();
        setError(data.Data);
      }
    } catch (error) {
      setSubmitting(false);
      setError(error);
      // Mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#879ab5]">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
          <h1 className="text-4xl font-semibold text-center">AmiSoft</h1>
          <div className="mt-8">
            {error.length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <ul>{error}</ul>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <label className="text-lg font-medium">
                  Correo Electrónico:
                </label>
                <input
                  name="email"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  type="email"
                  required={true}
                  onChange={handleChange}
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="text-lg font-medium">Contraseña:</label>
                <input
                  name="password"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  type="password"
                  required={true}
                  onChange={handleChange}
                  disabled={submitting}
                />
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  href="../dashboard"
                  className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg mb-6"
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
                    "Iniciar Sesión"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden relative lg:flex w-1/2 items-center justify-center h-full bg-[#3f485b]"></div>
    </div>
  );
};

export default LoginPage;
