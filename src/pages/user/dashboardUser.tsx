import { useEffect, useState } from "react";
import video1 from "../../assets/video/Puspa2-Idle.mp4";
import video2 from "../../assets/video/Puspa2-Talk1.mp4";
import video3 from "../../assets/video/Puspa2-Talk2.mp4";
import { supabase } from "../../services/supabase/connection";

const DashboardUser = () => {
  const [currentVideo, setCurrentVideo] = useState("");
  const videos = [video1, video2, video3];

  const getRandomVideo = () => {
    let randomIndex;
    const currentIndex = videos.indexOf(currentVideo);
    const lenVideos = videos.length;

    do {
      randomIndex = Math.floor(Math.random() * lenVideos);
    } while (randomIndex === currentIndex);

    setCurrentVideo(videos[randomIndex]);
  };

  useEffect(() => {
    getRandomVideo();

    const channel = supabase
      .channel("streamsettings-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "streamsettings" },
        (payload) => {
          const newData = payload.new;
          if (newData.value === true) {
            // ganti sesuai dengan kolom yang tepat pada tabel streamsettings
            setCurrentVideo(video2);
          } else {
            getRandomVideo();
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center overflow-hidden bg-white"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#fcfbfd" }}
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
        }}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div>
            {currentVideo && (
              <video autoPlay={true} loop={true} muted={true}>
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className="absolute bottom-0 w-full bg-white bg-opacity-50 transition duration-700">
            <div className="p-4">
              <p className="text-md text-center text-[#6C2B85] laptop:text-xl kiosk:text-3xl">
                Halo, saya Puspa, saya adalah Customer Service Officer Virtual
                anda, saya siap membantu anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
