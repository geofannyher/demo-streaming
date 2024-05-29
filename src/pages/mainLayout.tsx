import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getSession } from "../shared/Session";
import { notification } from "antd";

const MainLayout = () => {
  const navigate = useNavigate();
  const landing = location?.pathname == "/";
  const [api] = notification.useNotification();
  const token = getSession();
  const adminPath = location.pathname == "/admin/login";
  useEffect(() => {
    if (!token && !landing) {
      navigate("/admin/login");
    } else if (token && adminPath) {
      navigate("/admin");
    }
  }, [token, landing, api, navigate]);
  return <Outlet />;
};

export default MainLayout;
