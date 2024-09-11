import { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../../sdk/useId.ts";
import { clx } from "../../sdk/clx.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Slider from "./Slider.tsx";
import Icon from "./Icon.tsx";
import { useScript } from "deco/hooks/useScript.ts";

/**
 * @title title
 */
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

  button?: {
    name: string;
    number: number;
  };
}

export interface Props {
  bannerGrid: BannerCardProps;
}

export default function BannerCard(
  { bannerGrid, lcp }: Props & { lcp?: boolean },
) {
  const id = useId();

  const { cards, layout, button } = bannerGrid;

  if (!cards || cards.length === 0) {
    return null;
  }

  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  const onload = () => {
    document.addEventListener("DOMContentLoaded", function () {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInLeft");
            observer.unobserve(entry.target); // Para de observar após a animação ser aplicada
          }
        });
      });

      const target = document.querySelector(".triggerSection div");
      if (target) {
        observer.observe(target);
      }
    });
  };

  return (
    <div class="triggerSection w-full max-w-[1440px] m-auto mb-20 lg:mb-28 flex flex-col items-center justify-center gap-6 lg:my-8 font-soleil lg:px-4 overflow-hidden animate-fadeInLeft">
      <div class="w-full">
        <div
          id={id}
          class={clx(
            "grid relative  lg:h-auto",
            "grid-cols-[24px_1fr_24px] grid-rows-[1fr_48px_1fr]",
            "px-0 w-full overflow-hidden",
          )}
        >
          <Slider class="carousel sm:carousel-end row-span-full">
            {cards?.map((card, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item px-1",
                  slideDesktop[
                    layout?.numberOfSliders?.desktop ?? 3
                  ],
                  slideMobile[
                    layout?.numberOfSliders?.mobile ?? 1
                  ],
                )}
              >
                <a
                  href={card.href ?? "#"}
                  aria-label={card.alt}
                  class=" block overflow-y-hidden w-full max-w-[413px]  "
                >
                  <Picture
                    preload={lcp}
                    class="flex items-center relative justify-center overflow-hidden "
                  >
                    <Source
                      media="(max-width: 767px)"
                      fetchPriority={lcp ? "high" : "auto"}
                      src={card.image}
                      width={412}
                      height={660}
                    />
                    <Source
                      media="(min-width: 768px)"
                      fetchPriority={lcp ? "high" : "auto"}
                      src={card.image}
                      width={413}
                      height={275}
                    />
                    <img
                      class="w-full h-full max-w-[413px] max-h-[275px] hover:scale-125 transition-all duration-700 object-contain"
                      loading={lcp ? "eager" : "lazy"}
                      src={card.image}
                      alt={card.alt}
                    />

                    <div class="absolute left-0 bottom-4 flex flex-col justify-center gap-1 bg-white w-48 h-[75px]">
                      <div class="pl-4">
                        <h2 class="text-base font-bold text-black">
                          {card.title}
                        </h2>

                        <p class="text-base">
                          {card.subTitle}
                        </p>
                      </div>
                    </div>
                  </Picture>
                </a>
              </Slider.Item>
            ))}
          </Slider>

          <div class="col-start-1 col-span-1 row-start-2 row-span-1 z-10 self-center relative">
            <Slider.PrevButton class="sm:flex disabled:invisible btn !bg-primary absolute  left-2 shadow-xl !border-primary !text-white btn-sm btn-circle no-animation">
              <Icon
                id="chevron-right"
                class="rotate-180"
                size={24}
              />
            </Slider.PrevButton>
          </div>

          <div class="col-start-3 col-span-1 row-start-2 row-span-1 z-10 self-center relative ">
            <Slider.NextButton class=" sm:flex disabled:invisible btn w-8 h-8 absolute right-1  shadow-xl !bg-primary !border-primary !text-white btn-sm btn-circle no-animation">
              <Icon id="chevron-right" size={24} />
            </Slider.NextButton>
          </div>
        </div>
        <Slider.JS rootId={id} />
      </div>

      {button && (
        <a
          href={`https://wa.me/${button.number}`}
          target="_blank"
          aria-label="Converse no WhatsApp"
          alt="Solicite um aula expeimental"
          class="btn mt-5 lg:w-[296px] md:w-[140px] border-0 !bg-primary rounded-[25px] py-[14px] text-16 uppercase hover:!brightness-90  duration-300"
        >
          <span
            style="margin-right:0;"
            class="text-sm text-white flex items-center justify-center"
          >
            {button.name}
          </span>
        </a>
      )}

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onload),
        }}
      />
    </div>
  );
}
