import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/useSection.ts";
import Alert from "../../components/header/Alert.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem from "../../components/header/NavItem.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import { useScript } from "deco/hooks/useScript.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface alert {
  alert: string;
  icon?: AvailableIcons;
}

export interface SectionProps {
  alerts?: alert[];

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /**
   * @title Searchbar
   * @description Searchbar configuration
   */

  /** @title Logo */
  logo: Logo;

  /** @hide true */
  variant?: "initial" | "menu";
}

function onLoad() {
  const alertElement = document.querySelector(".page-alert") as HTMLElement;
  const handleScroll = () => {
    if (window.scrollY > 100) {
      if (alertElement) {
        alertElement.style.display = "none";
      }
    } else {
      if (alertElement) {
        alertElement.style.display = "block";
      }
    }
  };
  globalThis.addEventListener("scroll", handleScroll);

  globalThis.addEventListener("beforeunload", () => {
    globalThis.removeEventListener("scroll", handleScroll);
  });
}

type Props = Omit<SectionProps, "alert" | "variant">;

const Desktop = (
  { navItems, logo }: Props,
) => (
  <>
    <div class="flex flex-col gap-4 py-4 w-full 3xl:max-w-7xl  m-auto px-4 ">
      <div class="grid grid-cols-2 place-items-center pl-5">
        <div class="place-self-start w-full items-center">
          <a href="/" aria-label="Store logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 100}
            />
          </a>
        </div>

        <div class="flex justify-end items-center text-base-300 w-full pr-5">
          <ul class="flex gap-14 items-center">
            {navItems?.slice(0, 4).map((item) => <NavItem item={item} />)}
          </ul>
          <div>
            {/* ship to */}
          </div>
        </div>
      </div>
    </div>
  </>
);

const Mobile = ({ logo }: Props) => (
  <>
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
          <div
            id={SIDEMENU_CONTAINER_ID}
            class="h-full flex items-center justify-center"
            style={{ minWidth: "100vw" }}
          >
            <span class="loading loading-spinner" />
          </div>
        </Drawer.Aside>
      }
    />

    <div
      class="grid grid-cols-2  w-screen px-4 scroll-smooth "
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
      }}
    >
      <div class="flex justify-start items-center w-full">
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-start"
            style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}
      </div>

      <div class="flex justify-end items-center w-full">
        <label
          for={SIDEMENU_DRAWER_ID}
          class="btn btn-square btn-sm btn-ghost flex "
          aria-label="open menu"
          hx-target={`#${SIDEMENU_CONTAINER_ID}`}
          hx-swap="outerHTML"
          hx-trigger="click once"
          hx-get={useSection({ props: { variant: "menu" } })}
        >
          <Icon id="hamburger" class="" />
        </label>
      </div>
    </div>
  </>
);

function Header({
  alerts = [],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();

  return (
    <header
      style={{
        height: device === "desktop"
          ? HEADER_HEIGHT_DESKTOP
          : HEADER_HEIGHT_MOBILE,
      }}
      class="shadow-header"
    >
      <div class="bg-base-100 fixed w-full z-40 shadow-header">
        {alerts.length > 0 && <Alert alerts={alerts} />}
        {device === "desktop"
          ? <Desktop logo={logo} {...props} />
          : <Mobile logo={logo} {...props} />}
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
      />
    </header>
  );
}

export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }

  return <Header {...props} />;
}
