import { useEffect, useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import video1 from "../../assets/video/Puspa2-Idle.mp4";
import video2 from "../../assets/video/Puspa2-Talk1.mp4";
import video3 from "../../assets/video/Puspa2-Talk2.mp4";
import { supabase } from "../../services/supabase/connection";
import { textToSpeech } from "../../services/api/elevenlabs.services";
import {
  fetchStream,
  updateStreamStatus,
} from "../../services/supabase/switch.services";
import { notification } from "antd";
import { useStore } from "../../context/audioStore";

const DashboardUser = () => {
  const [currentVideo, setCurrentVideo] = useState(video1);
  const [loadingText, setLoadingText] = useState(false);
  const [status, setStatus] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [api, context] = notification.useNotification();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { nama } = useStore();
  const processTheme = async () => {
    setLoadingText(true);
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
      const resVoice: any = await textToSpeech(inputText);
      const mainAudioBlob = new Blob([resVoice?.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(mainAudioBlob);
      setAudioUrl(url);

      const resSettings: any = await fetchStream();
      if (resSettings?.status === 200) {
        const res: any = await updateStreamStatus({
          newStatus: !resSettings?.data?.status,
        });
        if (res?.status === 204) {
          setLoadingText(false);
          setStatus("");
          setInputText("");
        }
      } else {
        setStatus("");
        setInputText("");
      }
    } catch (error) {
      setLoadingText(false);
      setStatus("");
      setInputText("");
      api.error({ message: "error send message" });
    }
  };

  const handleAudioEnded = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioUrl("");
    }
  };
  useEffect(() => {
    const channel = supabase
      .channel("streamsettings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "streamSettings" },
        (payload) => {
          const newData: any = payload.new;

          if (newData.status == true || newData.status == false) {
            setCurrentVideo((prevVideo) =>
              prevVideo === video2 ? video3 : video2
            );
            if (audioRef.current && audioUrl && currentVideo) {
              audioRef.current.play();
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      setCurrentVideo(video1);
    };
  }, [audioUrl]);

  // Panggil processTheme saat tombol "Submit" diklik
  const handleSubmit = () => {
    processTheme();
  };
  console.log(nama, "name");
  return (
    <div className="flex">
      {/* Video Component */}
      {context}
      <div
        className="flex-shrink-0"
        style={{
          width: "calc(100vw - 600px)", // Sesuaikan lebar sesuai kebutuhan
          backgroundColor: "#fcfbfd",
        }}
      >
        <div
          className="content"
          style={{
            width: "calc(100vh * 9 / 16)",
            height: "100vh",
            maxWidth: "1080px",
            maxHeight: "1920px",
            overflow: "hidden",
            position: "relative",
            backgroundColor: "#fcfbfd",
            margin: "0 auto", // Tengahkan elemen secara horizontal
            display: "flex", // Gunakan flexbox
            alignItems: "center", // Tengahkan secara vertikal
            justifyContent: "center", // Tengahkan secara horizontal
          }}
        >
          <div className="flex h-full flex-col items-center justify-center">
            <div>
              {currentVideo && (
                <video
                  key={currentVideo}
                  autoPlay={true}
                  loop={true}
                  muted={true}
                >
                  <source src={currentVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div className="absolute bottom-0 w-full bg-white bg-opacity-50 transition duration-700">
              <div className="p-4">
                {audioUrl && (
                  <audio
                    style={{ display: "none" }}
                    controls
                    ref={audioRef}
                    onEnded={handleAudioEnded}
                  >
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input and Button Component */}
      <div
        className="flex-shrink-0"
        style={{ width: "600px", backgroundColor: "#1f2937" }} // Sesuaikan lebar sesuai kebutuhan
      >
        <div className="container pt-10 mx-auto space-y-4 px-5">
          <div className="grid grid-cols-12 items-center justify-center gap-4 md:gap-0">
            <div className="col-span-12 md:col-span-8 flex justify-center md:justify-start  mb-4 md:mb-0">
              <h1 className="font-semibold text-white text-center md:text-left">
                Avataralabs Streaming
              </h1>
            </div>
          </div>

          <div className="bg-background2 px-5 pb-5 pt-10 rounded-lg space-y-5">
            <div>
              <h1 className="text-xl text-gray-200 font-semibold">
                Input Text
              </h1>
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
                onClick={handleSubmit} // Panggil processTheme saat tombol "Submit" diklik
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

      {/* Audio Element */}
      {audioUrl && (
        <audio
          ref={audioRef} // Menghubungkan ref dengan elemen audio
          onEnded={handleAudioEnded} // Menangani event audio selesai
        >
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default DashboardUser;
