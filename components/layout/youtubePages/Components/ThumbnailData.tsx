import { Card } from "@/components/ui/card";

const thumbnails = [
  {
    title: "AI REACT PROJECTS",
    subtitle: "TUBEGURUJI",
    textColor: "text-white",
    gradient: "bg-gradient-to-r from-red-500 to-orange-500",
    badge: true,
  },
  {
    title: "React Projects",
    subtitle: "AI",
    textColor: "text-white",
    gradient: "bg-gray-900",
    footer: "react",
  },
  {
    title: "THUMBNAIL DESIGN",
    subtitle: "TUBEGURUJI",
    textColor: "text-black",
    gradient: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
  {
    title: "THE DESIGN",
    subtitle: "MASTER THUMBNAIL",
    textColor: "text-white",
    gradient: "bg-gradient-to-r from-red-600 to-orange-500",
    badge: true,
  },
  {
    title: "AI",
    subtitle: "YOUTUBE",
    textColor: "text-black",
    gradient: "bg-gradient-to-r from-red-500 to-yellow-400",
  },
  {
    title: "DEPLOY",
    subtitle: "BUILD &",
    textColor: "text-white",
    gradient: "bg-red-600",
  },
  {
    title: "Build & Deploy",
    textColor: "text-white",
    gradient: "bg-teal-600",
  },
  {
    title: "YouTube Analytics",
    textColor: "text-white",
    gradient: "bg-gray-700",
    badgeText: "N",
  },
];

export default function ThumbnailData() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Previously Generated Thumbnails
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full">
        {thumbnails.map((thumb, index) => (
          <Card
            key={index}
            className="overflow-hidden border-0 shadow-md rounded-2xl dark:bg-gray-800 hover:scale-105 transition-transform">
            <div
              className={`aspect-video relative flex items-center justify-center ${thumb.gradient}`}>
              {/* Random image overlay */}
              <img
                src={`https://picsum.photos/400/200?random=${index + 1}`}
                alt="thumbnail bg"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />

              <div
                className={`${thumb.textColor} text-center p-4 relative z-10`}>
                {thumb.subtitle && (
                  <div className="text-xs font-bold mb-1">{thumb.subtitle}</div>
                )}
                <div className="text-lg font-black">{thumb.title}</div>
              </div>

              {thumb.badge && (
                <div className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow" />
              )}

              {thumb.footer && (
                <div className="absolute bottom-2 right-2 text-white text-xs">
                  {thumb.footer}
                </div>
              )}

              {thumb.badgeText && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-xs text-white">
                  {thumb.badgeText}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
