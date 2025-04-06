import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export function ContactPreferenceChart({ data, color }) {
    const chartData = Object.entries(
        data.reduce((acc, member) => {
            const key = member.preferredContact || "unknown";
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {})
    ).map(([key, value]) => ({ name: key, value }));

    return (
        <PieChart width={300} height={250}>
            <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill={color}
                label
            >
                {chartData.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={color} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
}

export function CityBarChart({ data, color }) {
    const chartData = Object.entries(
        data.reduce((acc, member) => {
            const key = member.city || "Unknown";
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {})
    ).map(([name, count]) => ({ name, count }));

    return (
        <BarChart width={400} height={250} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill={color} />
        </BarChart>
    );
}
