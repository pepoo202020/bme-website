"use client";

import { useLanguage } from "@/context/language-context";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type {
  StatisticsSection,
  StatisticsItem,
} from "@/generated/prisma/client";

interface StatisticsSectionWithItems extends StatisticsSection {
  items: StatisticsItem[];
}

interface StatisticsSectionProps {
  statisticsSection?: StatisticsSectionWithItems | null;
}

export function StatisticsSection({
  statisticsSection,
}: StatisticsSectionProps) {
  const { language } = useLanguage();

  if (!statisticsSection) return null;

  const header =
    language === "ar"
      ? statisticsSection.arabic_header
      : statisticsSection.english_header;

  const description =
    language === "ar"
      ? statisticsSection.arabic_description
      : statisticsSection.english_description;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
            {header || "Our Impact"}
          </h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statisticsSection.items.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center p-6 bg-card rounded-xl shadow-sm border border-border"
            >
              <ChartContainer
                config={{}}
                className="mx-auto aspect-square max-h-[250px] w-full min-h-[200px] pb-0"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={[
                      {
                        name: "value",
                        value: stat.percentage,
                        fill: stat.color,
                      },
                      {
                        name: "remaining",
                        value: 100 - stat.percentage,
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
                                {stat.percentage}%
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
              <h3 className="mt-4 text-lg font-semibold text-center text-foreground">
                {language === "ar" ? stat.arabic_title : stat.english_title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
