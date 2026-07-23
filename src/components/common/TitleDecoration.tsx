import { badgeOrnament } from "@/lib/site_data";

const TitleDecoration = ({ title }) => {
    return (
        <div className="w-fit  max-w-4xl mx-auto  md:space-y-6">
            {/* Premium Tag Capsule */}
            <div
                className="inline-flex items-center gap-2 gradient-text  px-1 md:px-5 py-1 md:py-2"
                style={{
                    backdropFilter: "blur(6px)",
                }}
            >
                <img
                    src={badgeOrnament}
                    alt=""
                    className="h-4.25 w-auto object-contain opacity-70"
                />
                <span className="text-[0.8125rem] font-playfair md:text-hg-c1 tracking-[0.15em] font-medium text-white ">
                    {title}
                </span>
                <img
                    src={badgeOrnament}
                    alt=""
                    className="h-4.25 w-auto object-contain scale-x-[-1] opacity-70"
                />
            </div>
        </div>
    );
};

export default TitleDecoration;
