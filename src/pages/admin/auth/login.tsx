import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { notification } from "antd";
import { saveSession } from "../../../shared/Session";

const LoginAdmin = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [api, context] = notification.useNotification();
  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const pass = import.meta.env.VITE_APP_PASS_ADMIN;
    if (event.target[0]?.value == pass) {
      navigate("/admin");
      saveSession("operator");
      setLoading(false);
      setTimeout(() => {
        api.success({ icon: "success", message: "login berhasil" });
      }, 1000);
    } else {
      setLoading(false);
      api.error({ icon: "error", message: "password salah" });
    }
  };
  return (
    <>
      {context}
      <div className="h-[100dvh]">
        <div className="flex h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-second">
              Masuk Admin
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-second">
                    Password Admin
                  </label>
                </div>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-second px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hoverBtn transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? "loading..." : "Masuk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
