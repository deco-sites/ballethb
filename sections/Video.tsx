import type { VideoWidget as Video } from "apps/admin/widgets.ts";
// import { useDevice } from "deco/hooks/useDevice.ts";

interface Props {
  /**@format - video-uri */
  video?: Video;
}

export default function Video({ video }: Props) {
  //   const device = useDevice();

  if (!video) {
    return null; // Return nothing if there is no video data.
  }

  console.log(video);

  return (
    <div className="flex flex-col items-center m-auto justify-center w-full max-w-[1440px] px-4 pt-20 lg:pb-28">
      <div className="w-full h-auto">
        <iframe
          width="560"
          height="600"
          src={video}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          class="w-full"
          allowFullScreen
        >
        </iframe>
      </div>
    </div>
  );
}
