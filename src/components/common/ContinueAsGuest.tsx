import { Link } from "react-router";

const ContinueAsGuest = () => {
    return (
        <div className="">
            <div className="flex items-center justify-between gap-2">
                <div className="w-[34%] h-px bg-[#666]" />
                <span className="text-[#666] text-sm font-normal">Or</span>
                <div className="w-[34%] h-px bg-[#666]" />
            </div>

            <Link
                to="/shop"
                className="mt-2 block text-center w-full text-[0.8125rem] gradient-text "
            >
                Continue as Guest
            </Link>
        </div>
    );
};

export default ContinueAsGuest;
