interface Props {
  /**
   * @description SEO text content for search engines (not visible to users)
   * @format rich-text
   */
  seoText?: string;
}

export default function SeoTextCustom(
  {
    seoText =
      "Default SEO text for search engines. Replace this with your keyword-rich content.",
  }: Props,
) {
  return (
    <div
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: "0",
      }}
    >
      {seoText}
    </div>
  );
}
