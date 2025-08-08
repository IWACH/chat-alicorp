import { FC } from 'react';

import { Skeleton } from '@/ui/Skeleton';

const ListChatsLoading: FC = () => {
  return (
    <div className="flex-1 overflow-auto p-2 space-y-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-10" />
      ))}
    </div>
  );
};

export default ListChatsLoading;
