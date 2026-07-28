import TitleDecoration from "@/components/common/TitleDecoration";
import {
    donJulioReposadoImg,
    hennessyXoImg,
    claseAzulImg,
} from "@/lib/site_data";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export interface BestSellerProduct {
    id: string;
    name: string;
    category: string;
    volume: string;
    piecesLeft?: number;
    casesLeft?: number;
    price: number;
    image: string;
    title: string;
}

const HorizontalProductCard = ({ product }: { product: BestSellerProduct }) => {
    // Format currency string into Nigerian Naira
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    })
        .format(product.price)
        .replace("NGN", "₦");

    return (
        <div
            // to={`/product/${product?.id}`}
            className="group flex items-center gap-4 sm:gap-6 p-4 rounded-xl transition-all duration-300 mx-auto md:max-w-full  max-w-75 "
        >
            {/* Product? Bottle Image with Shadow Glow Effect */}
            <div className="relative  md:shrink-0 w-32 sm:w-40 h-48 max-w-27.75 md:max-w-40 sm:h-64.5 flex items-center justify-center">
                <img
                    src={product?.image}
                    alt={product?.name}
                    className="max-h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <img src="/icon/line.svg" alt="divider" className=" h-full " />

            {/* Product? Details (Right Side) */}
            <div className="flex flex-col justify-center space-y-2 w-full max-w-33.75 md:max-w-53.25 overflow-hidden transition-all transform  duration-1000">
                {/* Category Tag */}
                <h4 className="text-body-c2 md:text-body-c1 font-semibold tracking-widest text-gold-500 uppercase font-hanken">
                    {product?.category}
                </h4>

                <h2 className="text-hg-c1 md:text-hg-b3 font-semibold tracking-widest text-white uppercase w-full max-w-35 md:max-w-49.5 font-playfair">
                    {product?.title}
                </h2>

                {/* Stock Meta Information */}
                <p className="text-body-c1 text-black-200 font-hanken ">
                    {product?.volume}
                    {product?.piecesLeft &&
                        ` • ${product?.piecesLeft} Pieces Left`}
                    {product?.casesLeft &&
                        ` • ${product?.casesLeft} Cases Left`}
                </p>

                {/* Big Price Tag */}
                <div className="pt-1">
                    <span className="text-gold-500 font-playfair text-2xl sm:text-hg-b2 font-bold tracking-tight">
                        {formattedPrice}
                    </span>
                </div>
                <div className="transition-all transform translate-y-full group-hover:translate-y-0 duration-1000">
                    <Button
                        variant="outline"
                        className={cn(
                            "mt-6 px-8 w-full rounded-sm h-11 md:hidden group-hover:block ",
                        )}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const BestSellers = () => {
    const bestSellers: BestSellerProduct[] = [
        {
            id: "don-julio-reposado",
            name: "Don Julio Reposado",
            category: "Tequila",
            volume: "75cl",
            piecesLeft: 22,
            price: 650000,
            image: donJulioReposadoImg,
            title: "Don Julio Reposado",
        },
        {
            id: "hennessy-xo",
            name: "Hennessy XO",
            category: "Cognac",
            volume: "75cl",
            piecesLeft: 22,
            casesLeft: 5,
            price: 650000,
            image: hennessyXoImg,
            title: "Hennessy \n X.O",
        },
        {
            id: "clase-azul",
            name: "Clase Azul Reposado",
            category: "Tequila",
            volume: "75cl",
            casesLeft: 5,
            price: 650000,
            image: claseAzulImg,
            title: "Clase Azul \n Reposado ",
        },
    ];

    return (
        <section className="w-full bg-black-900 pt-16 md:py-24 border-t border-white/5 ">
            <div className="flex flex-col items-center">
                <div className="w-full max-w-[1600px] mx-auto flex flex-col items-center">
                    {/* Section Title Header */}
                    <TitleDecoration title="Our Best Sellers" />
                    <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-2xl leading-tight">
                        Most Loved By Our Customers
                    </h2>

                    <p className="mt-3 md:mt-4 text-body-c1 md:text-body-b2 max-w-81.75 md:max-w-171 text-center text-neutral-300 font-hanken font-light">
                        Discover the bottles our customers return for time and
                        again, celebrated for their exceptional quality, and
                        unforgettable character.
                    </p>

                    {/* 3-Column Horizontal Card Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-12 md:mt-16">
                        {bestSellers.map((product) => (
                            <HorizontalProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
