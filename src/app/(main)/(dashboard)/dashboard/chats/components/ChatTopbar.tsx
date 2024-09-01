import { fetchArtisan } from "@/actions/fetch/fetchArtisan";
import ArtisanNotAvailableModal from "@/components/modals/ArtisanNotAvailableModal";
import { debugLog, fallbackImage, fullName } from "@/functions/helpers";
import { useLastSeen, useTypingDetector } from "@/hooks";
import { useUserStore } from "@/state";
import { paths, wse } from "@/utils";
import { UserDetails } from "@/utils/types/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { Socket } from "socket.io-client";

/* eslint-disable @next/next/no-img-element */
export type ChatTopbarProps = {
  guest: UserDetails;
  socket: Socket;
};

export function ChatTopbar({ guest, socket }: ChatTopbarProps) {
  const { data: artisan, isLoading: artisanLoading } = useQuery({
    queryKey: ["fetch_artisan", guest._id],
    queryFn: () =>
      fetchArtisan({ isPublic: true, throwsError: false, params: guest._id }),
  });

  const { push } = useRouter();
  const fullname = useMemo(
    () => fullName(guest.firstName, guest.lastName),
    [guest],
  );
  const [typing, setTyping] = useState(false);
  const lastSeen = useLastSeen(guest._id);

  // hadle when a guest is typing
  useEffect(() => {
    // if(socket.connected){
    socket.on(
      wse.started_typing,
      (res: { senderId: string; receiverId: string }) => {
        if (res.senderId == guest._id) setTyping(true);
      },
    );
    socket.on(
      wse.stopped_typing,
      (res: { senderId: string; receiverId: string }) => {
        if (res.senderId == guest._id) setTyping(false);
      },
    );
    // }

    return () => {
      socket.off(wse.started_typing);
      socket.off(wse.stopped_typing);
    };
  }, [socket, guest]);

  return (
    <header className="flex items-center justify-between border-b border-black-50 px-4 py-2">
      <div className="flex gap-2">
        <img
          onClick={() => push(paths.singleArtisan(guest._id))}
          src={fallbackImage(guest.image)}
          alt={fullname}
          title={`Conversation with ${fullname}`}
          className="profile-img avatar aspect-square size-12 flex-shrink-0 rounded-full object-cover"
        />
        <div className="w-full flex-shrink">
          <Link
            href={paths.singleArtisan(guest._id)}
            className="line-clamp-1 font-semibold"
          >
            {fullname}
          </Link>
          <p className="line-clamp-2 flex items-center gap-3 overflow-ellipsis text-label text-black-300">
            <span>{lastSeen}</span>
            <span>{typing && "| typing..."}</span>
          </p>
        </div>
      </div>
      {!artisanLoading && artisan && artisan !== "error" && (
        <ArtisanNotAvailableModal {...artisan}>
          <div className="max-w-[152px]">
            <Link
              href={"tel:" + artisan.phoneNumber}
              className="btn-primary-border px-4"
            >
              <FiPhone />
              <span className="max-md:hidden">Show Contact</span>
            </Link>
          </div>
        </ArtisanNotAvailableModal>
      )}
    </header>
  );
}
