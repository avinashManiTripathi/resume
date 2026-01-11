
interface TitleProps {
    normalText: string;
    highlightText?: string;
    className?: string;
    highlightClassName?: string;
}

export const Title = ({ normalText, highlightText, className, highlightClassName }: TitleProps) => {
    return <h1
        className={`text-5xl mx-auto font-extrabold text-gray-900 mb-6 ${className}`}
    >
        {normalText}{" "}
        <span className={`bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${highlightClassName}`}>
            {highlightText}
        </span>
    </h1>

};

