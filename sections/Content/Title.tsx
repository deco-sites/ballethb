import { clx } from "../../sdk/clx.ts";

export interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment?: "center" | "left";
  colorReverse?: boolean;
}

function Title({ title, description, colorReverse, alignment }: Props) {
  if (!title && !description) {
    return null;
  }

  return (
    <div
      class={clx(
        `flex container flex-col gap-2 mt-7 pb-5 lg:py-0`,
        alignment === "left" ? "text-left" : "text-center",
      )}
    >
      {title && (
        <h2
          class={clx(
            "text-2xl font-bold leading-8 lg:leading-10 lg:text-3xl",
            colorReverse ? "text-black" : "text-black",
          )}
        >
          {title}
        </h2>
      )}
      {description && (
        <h3
          class={clx(
            " text-sm w-[80%] lg:w-[40%] m-auto py-2",
            colorReverse ? "text-primary-content" : "text-base-content",
          )}
        >
          {description}
        </h3>
      )}
    </div>
  );
}

export default Title;
