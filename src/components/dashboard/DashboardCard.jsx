import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ title, value }) {
    return (
        <Card className="w-full shadow-md">
            <CardContent className="p-4">
                <h4 className="text-sm text-gray-500">{title}</h4>
                <p className="text-2xl font-semibold">{value}</p>
            </CardContent>
        </Card>
    );
}
