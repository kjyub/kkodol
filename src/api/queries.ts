import { supabase } from './client';

// 카카오톡 CSV 데이터 형식에 맞춘 타입
interface ChatMessage {
  date: string;
  user_name: string;
  message: string;
}

// This is just an example, adjust it to your actual table and data structure
export const getChatList = async () => {
  const { data, error } = await supabase.from('chats').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const BATCH_SIZE = 10000; // 한 번에 삽입할 데이터 묶음 크기

export const uploadChatData = async (
  chatData: ChatMessage[],
  onProgress: (uploadedCount: number, totalCount: number) => void,
) => {
  let totalInsertedCount = 0;
  const totalCount = chatData.length;

  for (let i = 0; i < totalCount; i += BATCH_SIZE) {
    const batch = chatData.slice(i, i + BATCH_SIZE);
    const { data, error } = await supabase
      .from('kkotalk_chat')
      .insert(batch)
      .select();

    if (error) {
      console.error(`Batch ${i / BATCH_SIZE + 1} failed:`, error);
      throw new Error(
        `데이터 업로드 중 오류가 발생했습니다 (배치: ${i / BATCH_SIZE + 1}). 메시지: ${error.message}`,
      );
    }

    if (data) {
      totalInsertedCount += data.length;
      onProgress(totalInsertedCount, totalCount); // 진행 상황 콜백 호출
      await new Promise(requestAnimationFrame);
    }
  }

  return totalInsertedCount;
};

export const clearChatData = async () => {
  const { error } = await supabase.from('kkotalk_chat').delete().neq('id', 0);

  if (error) {
    throw new Error(error.message);
  }
};

export const refreshChatMembers = async () => {
  const { error } = await supabase.rpc('refresh_talk_users_mv'); // 업로드 배치 끝난 뒤 1회 호출

  if (error) {
    throw new Error(error.message);
  }
};
