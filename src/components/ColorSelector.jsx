import { Button } from "@/components/ui/button";

export default function ColorSelector({ onSelectColor }) {

    const colors = ["#3b82f6", "#10b981", "#f97316", "#ef4444"];

    return (
        <div className="flex gap-2">
            {colors.map((color) => (
                <Button
                    key={color}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 p-0 rounded-full"
                    onClick={() => onSelectColor(color)}
                />
            ))}
        </div>
    );
}

