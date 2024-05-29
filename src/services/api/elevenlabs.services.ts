import axios from "axios";

export const textToSpeech = async (text: string) => {
  try {
    const result = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/xM0TBYBF0vSckov9kDQy",
      {
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.95,
          style: 0.15,
          use_speaker_boost: true,
        },
      },
      {
        headers: {
          accept: "audio/mpeg",
          "xi-api-key": "17dd999e77442c6c7e1e7733e6dd7af2",
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    return result;
  } catch (error) {
    return error;
  }
};
