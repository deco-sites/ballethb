interface Props {
  number: number;
  name: string;
}

export default function Button({ number, name }: Props) {
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      aria-label="Converse no WhatsApp"
      alt="Converse no WhatsApp"
      class="btn mt-5 lg:w-[205px] md:w-[140px] border-0 !bg-primary rounded-[25px] py-[14px] text-16 uppercase hover:!brightness-90  duration-300"
    >
      <span
        style="margin-right:0;"
        class="text-sm text-white flex items-center justify-center"
      >
        {name}
      </span>
    </a>
  );
}
