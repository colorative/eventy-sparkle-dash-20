import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { LabelList, Pie, PieChart, Bar, BarChart, XAxis, YAxis, Cell } from "recharts";
import { TrendingUp, Users, Scan, CreditCard, UserPlus } from "lucide-react";

const leadsByPriorityData = [
  { priority: "Hot", count: 25, fill: "hsl(var(--color-1))" },
  { priority: "Warm", count: 45, fill: "hsl(var(--color-2))" },
  { priority: "Cold", count: 30, fill: "hsl(var(--color-3))" },
  { priority: "Uncategorized", count: 12, fill: "hsl(var(--color-4))" },
];

const leadsBySourceData = [
  { source: "QR Scan", count: 38, fill: "hsl(var(--color-1))" },
  { source: "Business Card", count: 44, fill: "hsl(var(--color-2))" },
  { source: "Added Manually", count: 30, fill: "hsl(var(--color-3))" },
];

const teamMembersData = [
  { name: "John Smith", leads: 35 },
  { name: "Sarah Wilson", leads: 28 },
  { name: "Mike Johnson", leads: 22 },
  { name: "Emily Davis", leads: 19 },
  { name: "David Chen", leads: 16 },
].sort((a, b) => b.leads - a.leads);

const priorityChartConfig = {
  count: {
    label: "Leads",
  },
  Hot: {
    label: "Hot",
    color: "hsl(var(--color-1))",
  },
  Warm: {
    label: "Warm", 
    color: "hsl(var(--color-2))",
  },
  Cold: {
    label: "Cold",
    color: "hsl(var(--color-3))",
  },
  Uncategorized: {
    label: "Uncategorized",
    color: "hsl(var(--color-4))",
  },
} satisfies ChartConfig;

const sourceChartConfig = {
  count: {
    label: "Leads",
  },
  "QR Scan": {
    label: "QR Scan",
    color: "hsl(var(--color-1))",
  },
  "Business Card": {
    label: "Business Card", 
    color: "hsl(var(--color-2))",
  },
  "Added Manually": {
    label: "Added Manually",
    color: "hsl(var(--color-3))",
  },
} satisfies ChartConfig;

const CustomGradientBar = (
  props: React.SVGProps<SVGRectElement> & { dataKey?: string }
) => {
  const { fill, x, y, width, height, dataKey } = props;

  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="none"
        fill={`url(#gradient-multiple-bar-pattern-${dataKey})`}
      />
      <rect x={x} y={y} width={width} height={2} stroke="none" fill={fill} />
      <defs>
        <linearGradient
          id={`gradient-multiple-bar-pattern-${dataKey}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={fill} stopOpacity={0.5} />
          <stop offset="100%" stopColor={fill} stopOpacity={0} />
        </linearGradient>
      </defs>
    </>
  );
};

export const LeadsAnalytics: React.FC = () => {
  const totalLeads = leadsByPriorityData.reduce((sum, item) => sum + item.count, 0);
  const totalTeamLeads = teamMembersData.reduce((sum, member) => sum + member.leads, 0);

  return (
    <div className="w-80 bg-background border-l p-4 space-y-6 overflow-y-auto">
      <div>
        
        {/* Leads by Priority Chart */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Leads by Priority</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-3">
            <ChartContainer
              config={priorityChartConfig}
              className="mx-auto aspect-square max-h-[200px]"
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="count" hideLabel />}
                />
                <Pie
                  data={leadsByPriorityData}
                  dataKey="count"
                  nameKey="priority"
                  innerRadius={30}
                  radius={80}
                  cornerRadius={8}
                  paddingAngle={4}
                >
                  <LabelList
                    dataKey="count"
                    stroke="none"
                    fontSize={12}
                    fontWeight={500}
                    fill="white"
                    formatter={(value: number) => value.toString()}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
            {/* Legend */}
            <div className="mt-4 space-y-2 pb-2">
              {leadsByPriorityData.map((item) => (
                <div key={item.priority} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="font-medium">{item.priority}</span>
                  <span className="text-muted-foreground">- {item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources Chart */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Lead Sources</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={sourceChartConfig} className="mx-auto h-[150px] w-full">
              <BarChart 
                accessibilityLayer 
                data={leadsBySourceData} 
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                barCategoryGap="20%"
              >
                <XAxis
                  dataKey="source"
                  axisLine={false}
                  tickLine={false}
                  tick={false}
                />
                <YAxis type="number" axisLine={false} tickLine={false} tick={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" hideLabel />}
                />
                <Bar
                  dataKey="count"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                >
                  {leadsBySourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
            {/* Legend */}
            <div className="mt-2 space-y-2 pb-4">
              {leadsBySourceData.map((item) => (
                <div key={item.source} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="font-medium">{item.source === "Added Manually" ? "Manually Added" : item.source === "QR Scan" ? "QR" : item.source}</span>
                  <span className="text-muted-foreground">- {item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembersData.map((member) => (
                <div key={member.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{member.name}</span>
                  <span className="text-sm font-semibold text-primary">{member.leads}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};