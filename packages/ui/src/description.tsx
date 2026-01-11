export const Description = ({ description, className = '' }: { description: string; className?: string }) => {

    const classNames = `text-md text-gray-600 max-w-3xl ${className}`;
    return <p className={classNames}>
        {description}
    </p>
};