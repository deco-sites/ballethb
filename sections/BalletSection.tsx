import type { Color, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "../components/ui/Button.tsx";

export interface Props {
  image?: ImageWidget;

  // @description ex: #DDDCDC
  colorTitle?: Color;

  // @format rich-text
  title?: string;

  // @description ex: #DDDCDC
  colorSubTitle?: Color;

  // @format rich-text
  subTitle?: string;

  colorDescription?: Color;

  // @format rich-text
  description?: string;

  imagePosition?: "left" | "right";

  /**@title Endereço de link */
  href?: string;

  button?: {
    name: string;
    number: number;
  };
}

export default function BalletDreamSection({
  button,
  image,
  imagePosition,
  href = "/sobre-nos",
  colorTitle = "#DDDCDC",
  colorSubTitle = "#00000",
  colorDescription = "#00000",
  title = "Ballet is my dream",
  subTitle = "  Ballet My Dream",
  description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna a bibendum bibendum, augue magna tincidunt enim, eget ultricies magna augue eget est.",
}: Props) {
  return (
    <div
      class={`w-full max-w-[1440px] m-auto flex flex-col-reverse justify-center items-center mb-32 gap-8 ${
        imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
      } items-center justify-center space-y-8 md:space-y-0 md:space-x-12 p-8`}
    >
      <div class="w-full flex items-center justify-center md:w-1/2">
        <Image
          src={image ||
            "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/6fe9404a-f69c-472a-b521-78f6c1f87326"}
          alt="Ballet Dancers"
          width={400}
          height={400}
          class="rounded-lg shadow-md"
        />
      </div>
      <div class="flex flex-col items-center lg:items-start px-5 lg:px-0 md:w-1/2">
        <span
          class="w-full md:w-1/2 text-center text-3xl lg:text-sxl md:text-left pb-4"
          style={{ color: colorTitle }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <span
          class="uppercase text-center lg:text-start text-black text-3xl lg:text-5xl pb-6"
          dangerouslySetInnerHTML={{ __html: subTitle }}
          style={{ color: colorSubTitle }}
        />
        <div class="w-36 h-[1px] bg-black mb-4"></div>
        <span
          class="text-xs text-center  leading-5 lg:leading-6 "
          dangerouslySetInnerHTML={{ __html: description }}
          style={{ color: colorDescription }}
        />

        <a
          href={href}
          class=" text-black  hover:brightness-90 uppercase text-xs font-medium mt-10 underline"
        >
          Leia Mais
        </a>

        {button && <Button name={button.name} number={button.number} />}
      </div>
    </div>
  );
}
