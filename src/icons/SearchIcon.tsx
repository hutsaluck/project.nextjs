type SearchIconProps = {
    className?: string,
}

export const SearchIcon = ({ className, ...props }: SearchIconProps) => {
    const defaultClasses = "lucide lucide-search";
    const combinedClasses = className ? `${defaultClasses} ${className}` : defaultClasses;

    return (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={combinedClasses}
                {...props}
            >
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.3-4.3"/>
            </svg>
        </div>
    );
};
