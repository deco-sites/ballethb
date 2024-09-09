import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Event {
  date: string;
  title: string;
  description?: string;
}

export interface Props {
  title: string;
  description?: string; // @format textarea
  image?: ImageWidget;
  events: Event[];
  /**
   * @format color-input
   */
  primaryColor?: string;
  /**
   * @format color-input
   */
  secondaryColor?: string;
}

export default function Calendar({
  title = "Calendário",
  description = "Confira os próximos eventos",
  image =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/6fe9404a-f69c-472a-b521-78f6c1f87326",
  events = [],
  primaryColor = "#1E40AF",
  secondaryColor = "#60A5FA",
}: Props) {
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="container mx-auto p-4">
      <h2
        className="text-4xl font-bold mb-4 text-center"
        style={{ color: primaryColor }}
      >
        {title}
      </h2>

      {description && <p className="text-center text-lg mb-8">{description}</p>}

      {image && (
        <div className="flex justify-center mb-8">
          <Image
            src={image}
            alt={title}
            width={800}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      )}

      <div className="grid grid-cols-7 gap-4 bg-blue-100 p-4 rounded-lg shadow">
        {weekdays.map((day, index) => (
          <div
            key={index}
            className="text-center font-bold"
            style={{ color: secondaryColor }}
          >
            {day}
          </div>
        ))}

        {events.map((event, index) => (
          <div key={index} className="p-2 rounded bg-white shadow">
            <p className="font-bold text-blue-800">{event.title}</p>
            <p className="text-sm text-gray-600">{event.date}</p>
            {event.description && (
              <p className="text-xs mt-1 text-gray-500">{event.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
