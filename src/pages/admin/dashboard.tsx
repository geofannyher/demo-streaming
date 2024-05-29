import { notification } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { chatSend } from "../../services/api/chat.services";
import { getSession } from "../../shared/Session";
import {
  fetchStream,
  updateStreamStatus,
} from "../../services/supabase/switch.services";
const DashboardAdmin = () => {
  const [loadingText, setloadingText] = useState(false);
  const [status, setStatus] = useState("");
  const [inputText, setInputText] = useState("");
  const [api, context] = notification.useNotification();
  const id = getSession();
  const processTheme = async () => {
    setloadingText(true);
    setStatus("proccess");
    try {
      // const res: any = await chatSend({
      //   id: id ? id : "",
      //   message: inputText,
      //   model: "gpt-4o",
      //   star: "mamat_gen",
      //   is_rag: "false",
      // });
      // console.log(res?.data?.data);
      const resSettings: any = await fetchStream();
      if (resSettings?.status === 200) {
        const res: any = await updateStreamStatus({
          newStatus: !resSettings?.data?.status,
        });
        if (res?.status === 204) {
          setloadingText(false);
          setStatus("");
          api.success({ message: "berhasil kirim" });
        }
      } else {
        setStatus("");
      }
    } catch (error) {
      setloadingText(false);
      setStatus("");
      api.error({ message: "error send message" });
    }
  };

  return (
    <div className="h-[100dvh] bg-gradient-to-r from-slate-950 to-slate-800">
      {context}
      <div className="container pt-10 mx-auto space-y-4">
        <div className="grid grid-cols-12 items-center justify-center gap-4 md:gap-0">
          <div className="col-span-12 md:col-span-4 flex justify-center md:justify-start mb-4 md:mb-0">
            <h1 className="font-semibold text-white text-center md:text-left">
              Avataralabs Streaming
            </h1>
          </div>
        </div>

        <div className="bg-background2 px-5 pb-5 pt-10 rounded-lg space-y-5">
          <div>
            <h1 className="text-xl text-gray-200 font-semibold">Input Text</h1>
            <textarea
              disabled={loadingText}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Input Text here.."
              className="border-2 w-full p-4 font-semibold border-black text-sm rounded-md h-28"
            />
          </div>
          <div>
            <button
              disabled={loadingText || !inputText}
              onClick={processTheme}
              className={`text-white w-full bg-second ${
                loadingText || !inputText
                  ? "bg-text cursor-not-allowed"
                  : "hover:bg-text hover:text-white"
              } transition duration-500 text-sm font-semibold px-4 py-2 rounded-md`}
            >
              {loadingText ? (
                <div className="flex gap-4 justify-center items-center">
                  <LoadingOutlined />
                  {status}
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
