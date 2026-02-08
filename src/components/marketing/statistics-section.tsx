"use client";

import { useLanguage } from "@/context/language-context";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const stats = [
  {
    key: "ingredients",
    label: { en: "Natural Ingredients", ar: "مكونات طبيعية" },
    value: 80,
    fill: "#4ade80", // Green-400
  },
  {
    key: "satisfaction",
    label: { en: "Customer Satisfaction", ar: "رضا العملاء" },
    value: 95,
    fill: "#facc15", // Yellow-400
  },
  {
    key: "effectiveness",
    label: { en: "Effectiveness", ar: "فعالية" },
    value: 90,
    fill: "#60a5fa", // Blue-400
  },
  {
    key: "safety",
    label: { en: "Safety", ar: "أمان" },
    value: 99,
    fill: "#f87171", // Red-400
  },
];

const chartConfig = {
  ingredients: {
    label: "Ingredients",
    color: "#4ade80",
  },
  satisfaction: {
    label: "Satisfaction",
    color: "#facc15",
  },
  effectiveness: {
    label: "Effectiveness",
    color: "#60a5fa",
  },
  safety: {
    label: "Safety",
    color: "#f87171",
  },
} satisfies ChartConfig;

export function StatisticsSection() {
  const { t, language } = useLanguage();

  const getLabel = (stat: (typeof stats)[0]) =>
    language === "ar" ? stat.label.ar : stat.label.en;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
            {t("section.statsTitle") ||
              (language === "ar" ? "أرقامنا تتحدث" : "Our Impact in Numbers")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("section.statsDesc") ||
              (language === "ar"
                ? "نحن نفخر بجودة وفعالية منتجاتنا. إليك بعض الإحصائيات الرئيسية التي تعكس التزامنا بالتميز."
                : "We pride ourselves on the quality and effectiveness of our products. Here are some key statistics that reflect our commitment to excellence.")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="flex flex-col items-center justify-center p-6 bg-card rounded-xl shadow-sm border border-border"
            >
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px] w-full min-h-[200px] pb-0"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={[
                      { name: stat.key, value: stat.value, fill: stat.fill },
                      {
                        name: "remaining",
                        value: 100 - stat.value,
                        fill: "var(--muted)",
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="central"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {stat.value.toLocaleString()}%
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground text-xs"
                              ></tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
              <h3 className="mt-4 text-lg font-semibold text-center text-foreground">
                {getLabel(stat)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
