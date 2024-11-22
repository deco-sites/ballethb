import { useId } from "../../sdk/useId.ts";
import Icon, { AvailableIcons } from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import { useDevice } from "@deco/deco/hooks";
export interface alert {
  alert: string;
  icon?: AvailableIcons;
}
export interface Props {
  alerts?: alert[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}
function Alert({ interval = 4, alerts = [] }: Props) {
  const id = useId();
  const device = useDevice();
  return (
    <>
      {device === "desktop"
        ? (
          <div id={id} class="page-alert transition duration-500 ease-in-out">
            <ul class="flex items-center py-5 justify-center  w-screen bg-primary text-neutral text-xs lg:text-sm/4">
              {alerts.map((alert, index) => (
                <li
                  key={index}
                  class={`text-neutral flex gap-1 items-center justify-center font-medium lg:h-4 w-1/${alerts.length} px-5 first:border-r-2 first:border-r-neutral `}
                >
                  {alert.icon && (
                    <Icon id={alert.icon} size={16} strokeWidth={16} />
                  )}
                  <span
                    class=" text-center text-xs"
                    dangerouslySetInnerHTML={{ __html: alert.alert }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )
        : (
          <div id={id}>
            <Slider class="carousel carousel-center w-screen gap-6 bg-primary text-secondary-content text-xs">
              {alerts.map((alert, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item flex items-center justify-center"
                >
                  <div class="w-screen px-4 py-2 gap-1 flex items-start justify-center">
                    {alert.icon && (
                      <Icon id={alert.icon} size={16} strokeWidth={16} />
                    )}
                    <span
                      class="text-center flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: alert.alert }}
                    />
                  </div>
                </Slider.Item>
              ))}
            </Slider>

            <Slider.JS rootId={id} interval={interval && interval * 1e3} />
          </div>
        )}
    </>
  );
}
export default Alert;
