import React from "react";
import { Link } from "react-router";

export const AuthFooter: React.FC = () => {
    return (
        <div className="text-xs sm:text-sm text-white font-hanken text-center mt-8 px-4 leading-relaxed max-w-82.25">
            By continuing you agree to Roseiy Emporium’s{" "}
            <Link
                to="/terms"
                className="gradient-text font-semibold hover:underline"
            >
                Terms and Conditions
            </Link>{" "}
            &amp;{" "}
            <Link
                to="/privacy"
                className="gradient-text font-semibold hover:underline"
            >
                Privacy Policy
            </Link>
        </div>
    );
};

export default AuthFooter;
