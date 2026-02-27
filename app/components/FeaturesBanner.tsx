"use client";

import { Clock, Shield, Heart } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Samme dag",
    description: "Rask levering når du trenger det",
  },
  {
    icon: Shield,
    title: "Trygg transport",
    description: "Vi behandler varene dine med omhu",
  },
  {
    icon: Heart,
    title: "100% sporbart",
    description: "Følg pakken din i sanntid",
  },
];

export default function FeaturesBanner() {
  return (
    <div className="w-full bg-blue-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-purple-600 rounded-lg p-3 flex-shrink-0">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-white stroke-2" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/90">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
