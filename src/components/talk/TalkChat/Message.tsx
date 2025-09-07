import type { Database } from '@/types/supabase';
import { formatDateTime } from '@/utils/format';

export default function TalkChatMessage({
  message,
}: {
  message: Database['public']['Tables']['kkotalk_chat']['Row'];
}) {
  return (
    <div className="rounded-lg bg-stone-200/50 px-3 py-2 hover:bg-stone-200/80 dark:bg-stone-800 hover:dark:bg-stone-800/70">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-stone-800 dark:text-stone-200">
          {message.user_name}
        </p>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {formatDateTime(message.date)}
        </p>
      </div>
      <p className="wrap-break-word text-stone-700 dark:text-stone-300">
        {message.message}
      </p>
    </div>
  );
}
