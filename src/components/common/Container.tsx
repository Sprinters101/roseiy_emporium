import { cn } from "@/lib/utils";

const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                `2xl:container mx-auto px-4 md:px-7.5 lg:px-15`,
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Container;
