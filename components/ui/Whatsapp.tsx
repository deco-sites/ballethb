import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  phone?: string;
  target?: "_blank" | "_self";
}

function WhatsApp({ phone, target = "_blank" }: Props) {
  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
      target={target}
      class="fixed bottom-6 right-6 z-40"
      aria-label="Chat on WhatsApp"
    >
      <button
        class="bg-[#CB9C98] text-white p-2 rounded-full shadow-lg animate-vibrate"
        aria-label="Chat on WhatsApp"
      >
        <Icon id="WhatsApp" class="text-white" size={32} stroke="0.01" />
      </button>
    </a>
  );
}

export default WhatsApp;
