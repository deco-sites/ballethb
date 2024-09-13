import { type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import { useScript } from "deco/hooks/useScript.ts";

/**
 * @titleBy alt
 */
interface Banner {
  mobile: ImageWidget;
  desktop?: ImageWidget;

  /** @description Image alt texts */
  alt: string;

  /** @description Adicione um link */
  href: string;
}

interface Props extends SectionHeaderProps {
  /**
   * @maxItems 4
   * @minItems 4
   */
  banners?: Banner[];

  button?: {
    name: string;
    number: number;
  };
}

function Banner({ mobile, desktop, alt, href }: Banner) {
  return (
    <a href={href} class="overflow-hidden">
      <Picture>
        <Source
          width={190}
          height={190}
          media="(max-width: 767px)"
          src={mobile}
        />
        <Source
          width={640}
          height={420}
          media="(min-width: 768px)"
          src={desktop || mobile}
        />
        <img
          width={640}
          class="w-full h-full object-cover hover:scale-150 transition-all duration-700"
          src={mobile}
          alt={alt}
          decoding="async"
          loading="lazy"
        />
      </Picture>
    </a>
  );
}

export default function Gallery({
  button,
  title,
  cta,
  banners = [
    {
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
      alt: "Fashion",
      href: "/",
    },
    {
      alt: "Fashion",
      href: "/",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/1125d938-89ff-4aae-a354-63d4241394a6",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/1125d938-89ff-4aae-a354-63d4241394a6",
    },
    {
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/dd1e2acb-ff80-49f9-8f56-1deac3b7a42d",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/dd1e2acb-ff80-49f9-8f56-1deac3b7a42d",
      href: "/",
      alt: "Fashion",
    },
    {
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/0b85ba2d-48b1-4f5b-b619-7f4a7f50b455",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/0b85ba2d-48b1-4f5b-b619-7f4a7f50b455",
      alt: "Fashion",
      href: "/",
    },
  ],
}: Props) {
  const onload = () => {
    document.addEventListener("DOMContentLoaded", function () {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            observer.unobserve(entry.target); // Para de observar após a animação ser aplicada
          }
        });
      });

      const target = document.querySelector(".imageGallery");
      if (target) {
        observer.observe(target);
      }
    });
  };

  return (
    <Section.Container class="imageGallery w-full items-center flex-col justify-center max-w-[1440px] m-auto">
      <Section.Header title={title} cta={cta} />

      <ul class="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 px-5 sm:px-0">
        {banners.map((item) => (
          <li class="overflow-hidden">
            <Banner {...item} />
          </li>
        ))}
      </ul>

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
            class="text-sm text-black flex items-center justify-center"
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
    </Section.Container>
  );
}
