import { HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "../components/ui/Icon.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

interface Props {
  /**
   * @format html
   */
  iframeCode?: HTMLWidget;
}

export default function GoogleMaps({
  iframeCode =
    `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.2445072349656!2d-42.80324992428075!3d-5.0640725514265155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x78e3999867a609d:0x1d041b3368963600!2sR.20Parente202683 - FA1tC Teresina 2C 64049-544!5e0!3m2!1spt-BR!2sbr!4v1721593508268!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;width:100%;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
}: Props) {
  const device = useDevice();
  return (
    <div className="flex flex-col items-center m-auto justify-center w-full max-w-[1440px] px-4  pt-20 lg:pb-28">
      <div class=" flex items-start gap-2 justify-center pb-6">
        <Icon id="home_pin" class="" size={device === "desktop" ? 45 : 30} />
        <h2 className="mb-4 uppercase w-48 lg:w-auto text-center sm::text-start text-black text-3xl lg:text-5xl !pb-6 !pt-0 ">
          Ballet Helly Batista
        </h2>
      </div>

      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: iframeCode }}
      />
      <a
        href={"https://www.google.com/maps?ll=-5.064532,-42.801675&z=16&t=m&hl=pt-BR&gl=BR&mapclient=embed&q=R.+Marcos+Parente,+2683+-+F%C3%A1tima+Teresina+-+PI+64049-544"}
        target="_blank"
        className="mt-4 text-gray-600 text-center"
      >
        View larger map
      </a>
    </div>
  );
}
