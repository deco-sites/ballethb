import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import WhatsApp from "../components/ui/Whatsapp.tsx";
import Icon, { SocialIcons } from "../components/ui/Icon.tsx";

export interface Image {
  src: ImageWidget;
}

export interface SocialItem {
  label: SocialIcons
  link: string;
}


interface FooterProps {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format rich-text
   * @description The address of the business
   */
  address?: string;
  /**
   * @description The phone number of the business
   */
  phone?: string;
  /**
   * @description The opening hours of the business
   */
  hours?: string;
  /**
   * @widget images
   * @description The Instagram feed images
   */
  instagramImages?: Image[];
  /**
   * @format rich-text
   * @description The latest news titles
   */
  news?: HTMLWidget;

  logo?: ImageWidget;

  social?: SocialItem[];
}

export default function Footer({
  title = "CONTACT & FOLLOW US",
  social, 
  address = "186 North Collins Street, Chicago",
  phone = "(847)704-4427",
  hours = "Mon - Sat 8:00 - 19:00",
  instagramImages,
  logo,
}: FooterProps) {
  return (
    <footer
      class="bg-primary text-neutral flex flex-col mt-20 lg:mt-0"
      id="#contato"
    >
      <div class="container mx-auto py-8  px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col">
            <h3 class="text-lg font-bold mb-4">
              <span type="module" dangerouslySetInnerHTML={{ __html: title }} />
            </h3>
            <span type="module" dangerouslySetInnerHTML={{ __html: address }} />
            <span type="module" dangerouslySetInnerHTML={{ __html: phone }} />
            <span type="module" dangerouslySetInnerHTML={{ __html: hours }} />
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">INSTAGRAM</h3>
            <div class="grid grid-cols-3 max-w-80">
              {instagramImages && instagramImages.map((image, key) => (
                <Image
                  key={key}
                  alt={`ballet-instagram-${key}`}
                  src={image.src}
                  width={100}
                  height={100}
                  class="object-cover w-full"
                />
              ))}
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">Rede Social</h3>
            <ul class="flex gap-4">
          {social && social.length >  0 &&   social.map((item) => (
              <li>
                <a href={item.link} alt={item.label} >
                    <Icon width={24} height={23} id={item.label} class="w-8 h-[31px] lg:w-6 lg:h-[23px] 2xl:w-[32px] 2xl:h-[31px]" />
                </a>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
      <div class="border-t border-base-200 flex items-center gap-1 justify-center text-xs">
        <span>
          © 2024 Ballet Helly Batista
        </span>
        <span>
          {logo && (
            <Image
              width={50}
              height={50}
              src={logo}
              alt="logo ballet Helly Batista"
              class=" object-contain"
            />
          )}
        </span>
      </div>
      <WhatsApp phone={phone} />
    </footer>
  );
}
