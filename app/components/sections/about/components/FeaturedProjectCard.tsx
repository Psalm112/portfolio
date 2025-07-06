import React from "react";

interface FeaturedProjectCardProps {
  color: string; // 'cyan', 'purple', 'green', etc.
  title: string;
  description: string;
}

const colorMap: Record<string, string> = {
  cyan: "bg-cyan-400",
  purple: "bg-purple-400",
  green: "bg-green-400",
};

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  color,
  title,
  description,
}) => (
  <div className="flex items-start space-x-4">
    <div
      className={`w-2 h-2 ${
        colorMap[color] || "bg-gray-400"
      } rounded-full mt-2 flex-shrink-0`}
    />
    <div>
      <h4
        className={`font-jetbrains font-semibold text-sm uppercase tracking-wide ${
          colorMap[color] || "text-gray-400"
        }`}
      >
        {title}
      </h4>
      <p className="font-inter text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default React.memo(FeaturedProjectCard);
