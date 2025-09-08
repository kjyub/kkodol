import instance from './client';
import type { Database } from '../../types/supabase';

type KkotalkChatInsert = Database['public']['Tables']['kkotalk_chat']['Insert'];

export const getChatList = async () => {
  const { data, error } = await instance<
    Database['public']['Tables']['kkotalk_chat']['Row']
  >({ url: '/kkotalk_chat', method: 'GET' });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const BATCH_SIZE = 10000; // 한 번에 삽입할 데이터 묶음 크기

export const uploadChatData = async (
  chatData: KkotalkChatInsert[],
  onProgress: (uploadedCount: number, totalCount: number) => void,
) => {
  let totalInsertedCount = 0;
  const totalCount = chatData.length;

  for (let i = 0; i < totalCount; i += BATCH_SIZE) {
    const batch = chatData.slice(i, i + BATCH_SIZE);
    const { data, error } = await instance<
      Database['public']['Tables']['kkotalk_chat']['Row'][]
    >({
      url: '/kkotalk_chat',
      method: 'POST',
      data: batch,
      headers: { Prefer: 'return=representation' },
    });
    console.log(data, error);

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
  const { error } = await instance<
    Database['public']['Tables']['kkotalk_chat']['Row']
  >({ url: '/kkotalk_chat', method: 'DELETE' });
  console.log(error);

  if (error) {
    throw new Error(error.message);
  }
};

export const refreshChatMembers = async () => {
  const { error } = await instance<
    Database['public']['Functions']['refresh_talk_users_mv']['Returns']
  >({ url: '/rpc/refresh_talk_users_mv', method: 'POST' }); // 업로드 배치 끝난 뒤 1회 호출

  if (error) {
    throw new Error(error.message);
  }
};

export const refreshChatCounts = async () => {
  const { error } = await instance<
    Database['public']['Functions']['refresh_mv_user_msg_daily']['Returns']
  >({ url: '/rpc/refresh_mv_user_msg_daily', method: 'POST' });

  if (error) {
    throw new Error(error.message);
  }
};

export const refreshChatTags = async () => {
  const { error } = await instance<
    Database['public']['Functions']['refresh_mv_chat_tags']['Returns']
  >({ url: '/rpc/refresh_mv_chat_tags', method: 'POST' });

  if (error) {
    throw new Error(error.message);
  }
};

export const getChatMembers = async () => {
  const { data, error } = await instance<
    Database['public']['Views']['talk_users_mv']['Row'][]
  >({ url: '/talk_users_mv', method: 'GET' });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getChatCountsByUser = async (
  dateStart?: string,
  dateEnd?: string,
  memberExcludes?: string[],
) => {
  const { data, error } = await instance<
    Database['public']['Functions']['get_user_message_counts']['Returns']
  >({
    url: '/rpc/get_user_message_counts',
    method: 'POST',
    data: {
      date_start: dateStart,
      date_end: dateEnd,
      exclude_users: memberExcludes,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getChatMessages = async ({
  dateStart,
  dateEnd,
  memberExcludes,
  cursorDate,
  cursorId,
  limitRows,
}: {
  cursorDate?: string;
  cursorId?: number;
  limitRows?: number;
  dateStart?: string;
  dateEnd?: string;
  memberExcludes?: string[];
}) => {
  const { data, error } = await instance<
    Database['public']['Functions']['get_chats']['Returns']
  >({
    url: '/rpc/get_chats_paginated',
    method: 'POST',
    data: {
      date_start: dateStart,
      date_end: dateEnd,
      exclude_users: memberExcludes,
      cursor_date: cursorDate,
      cursor_id: cursorId,
      limit_rows: limitRows,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getTagCounts = async () => {
  const { data, error } = await instance<
    Database['public']['Functions']['get_tag_counts']['Returns']
  >({ url: '/rpc/get_tag_counts', method: 'POST' });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getTagMessages = async ({
  dateStart,
  dateEnd,
  memberExcludes,
  cursorDate,
  cursorId,
  limitRows,
  tags,
  mode = 'any',
}: {
  cursorDate?: string;
  cursorId?: number;
  limitRows?: number;
  dateStart?: string;
  dateEnd?: string;
  memberExcludes?: string[];
  tags?: string[];
  mode?: 'any' | 'all';
}) => {
  const { data, error } = await instance<
    Database['public']['Functions']['get_mv_chat_tags_paginated']['Returns']
  >({
    url: '/rpc/get_mv_chat_tags_paginated',
    method: 'POST',
    data: {
      date_start: dateStart,
      date_end: dateEnd,
      exclude_users: memberExcludes,
      cursor_date: cursorDate,
      cursor_id: cursorId,
      limit_rows: limitRows,
      include_tags: tags,
      tags_mode: mode,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
