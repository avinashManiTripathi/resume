"use client";

interface UserAvatarProps {
    name: string;
    image?: string;
    size?: "sm" | "md" | "lg";
    status?: "online" | "offline" | "away";
    showStatus?: boolean;
}

const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
};

const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
};

export function UserAvatar({
    name,
    image,
    size = "md",
    status,
    showStatus = false,
}: UserAvatarProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const bgColors = [
        "bg-blue-500",
        "bg-purple-500",
        "bg-green-500",
        "bg-orange-500",
        "bg-red-500",
        "bg-pink-500",
    ];

    const colorIndex = name.charCodeAt(0) % bgColors.length;
    const bgColor = bgColors[colorIndex];

    return (
        <div className="relative inline-block">
            <div
                className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white ${!image ? bgColor : ""} overflow-hidden`}
                title={name}
            >
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    initials
                )}
            </div>
            {showStatus && status && (
                <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[status]}`}
                />
            )}
        </div>
    );
}
