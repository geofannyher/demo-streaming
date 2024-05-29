import { supabase } from "./connection";

export const updateStreamStatus = async ({ newStatus }: any) => {
  try {
    const data = await supabase
      .from("streamSettings")
      .update({ status: newStatus })
      .eq("id", 1);

    return data;
  } catch (error) {
    return error;
  }
};

export const fetchStream = async () => {
  try {
    const data = await supabase
      .from("streamSettings")
      .select("id, status")
      .eq("id", 1)
      .single();
    return data;
  } catch (error) {
    return error;
  }
};
