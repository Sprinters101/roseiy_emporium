import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

const NavSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="relative flex items-center bg-black/40 rounded-full border px-3.5 py-1.5 w-full max-w-55 focus-within:border-neutral-700 transition-colors ">
            <Search className="size-3 md:size-5 text-gray-400 mr-1 shrink-0" />
            <Input
                type="text"
                placeholder="Search products, brands...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-white w-full border-0 h-6 text-body-c1"
            />
        </div>
    );
};

export default NavSearch;
