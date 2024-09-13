import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import BannerCard from "../../components/ui/BannerCard.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;

  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    label: string;
    /** @formt html */
    title?: string;
    /** @formt html */
    subTitle?: string;
    /** @formt html */
    description?: string;
  };
}

export interface Card {
  image: ImageWidget;
  alt: string;

  href: string;

  title: string;
  subTitle: string;
}

export interface BannerCardProps {
  cards: Card[];
  title?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    showArrows?: boolean;
  };
}

export interface Props {
  images?: Banner[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;

  showArrow?: boolean;

  showDotz?: boolean;

  layout?: {
    bannerGrid?: BannerCardProps;
  };
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;
  const params = { promotion_name: image.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  const viewPromotionEvent = useSendEvent({
    on: "view",
    event: { name: "view_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative block overflow-y-hidden w-full lg:w"
    >
      {action && (
        <div
          class={clx(
            "absolute h-full w-full top-0 left-0",
            "flex flex-col justify-center items-center",
            "px-5 sm:px-0",
            "sm:left-40 sm:items-start sm:max-w-96",
          )}
        >
          <span class=" text-[3.4rem] lg:text-7xl font-bold text-base-100">
            {action.title}
          </span>
          <span class="font-normal text-base text-base-100 pt-4 pb-12">
            {action.subTitle}
          </span>
          <button
            class="btn hover:!bg-primary !border-primary text-primary hover:text-white bg-base-100"
            aria-label={action.label}
          >
            {action.label}
          </button>
        </div>
      )}

      <Picture preload={lcp} {...viewPromotionEvent}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={412}
          height={660}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={600}
        />
        <img
          class=" object-contain w-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Carousel(
  { images = [], preload, interval, showArrow, layout, showDotz }: Props,
) {
  const id = useId();
  const device = useDevice();
  return (
    <div
      id={id}
      class={clx(
        "grid lg:mb-32",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[32px_1fr_32px] min-h-[660px]",
        "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
        "w-screen  overflow-x-clip relative lg:mt-14",
      )}
    >
      <div class="col-span-full row-span-full">
        <Slider class="carousel carousel-center w-full gap-6">
          {images.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem image={image} lcp={index === 0 && preload} />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      {showArrow && (
        <>
          <div class="hidden sm:flex items-center justify-center z-10 col-start-1 row-start-2">
            <Slider.PrevButton
              class="btn btn-neutral !bg-primary  !text-white btn-outline !border-primary btn-circle no-animation btn-sm"
              disabled={false}
            >
              <Icon id="chevron-right" class="rotate-180" />
            </Slider.PrevButton>
          </div>

          <div class="hidden sm:flex items-center justify-center z-10 col-start-3 row-start-2">
            <Slider.NextButton
              class="btn btn-neutral btn-outline btn-circle no-animation btn-sm !bg-primary !border-primary  !text-white"
              disabled={false}
            >
              <Icon id="chevron-right" />
            </Slider.NextButton>
          </div>
        </>
      )}

      {showDotz && (
        <ul
          class={clx(
            "col-span-full row-start-4 z-10",
            "carousel justify-center gap-3",
          )}
        >
          {images.map((_, index) => (
            <li class="carousel-item">
              <Slider.Dot
                index={index}
                class={clx(
                  "bg-primary  h-3 w-3 no-animation rounded-full",
                  "disabled:w-8 disabled:bg-primary disabled:opacity-50 transition-[width]",
                )}
              >
              </Slider.Dot>
            </li>
          ))}
        </ul>
      )}

      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />

      {layout?.bannerGrid && device === "desktop" && (
        <BannerCard bannerGrid={layout?.bannerGrid} />
      )}
    </div>
  );
}

export default Carousel;
