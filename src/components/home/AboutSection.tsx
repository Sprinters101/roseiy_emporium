import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { aboutSplashImg } from "@/lib/site_data";

export const AboutSection = () => {
    return (
        <section className="w-full bg-black-700 pt-16 md:py-24 overflow-hidden">
            <Container>
                <div className="w-full  grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Brand Story Content */}
                    <div className="flex flex-col items-start text-left space-y-4 md:space-y-6">
                        {/* Title Decoration */}
                        <TitleDecoration
                            title="About Roseiy Emporium"
                            className="mx-0"
                        />

                        {/* Primary Headline */}
                        <h2 className="text-white font-playfair text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                            Curated with Purpose.{" "}
                            <br className="hidden sm:inline" />
                            Poured with Excellence
                        </h2>

                        {/* Descriptive Paragraph */}
                        <p className="text-neutral-300 font-hanken text-body-c1 md:text-body-b2 font-light leading-relaxed max-w-138">
                            Welcome to Roseiy Emporium, your trusted destination
                            for premium wines, champagnes, spirits, whiskies,
                            cognacs, and more. We pride ourselves on offering
                            authentic products, exceptional service, and a
                            seamless shopping experience. Whether you’re
                            celebrating a special occasion or simply enjoying
                            the finer things in life, we’re here to help you
                            raise every moment in style.
                        </p>
                    </div>

                    {/* Right Column: Hero Splash Image */}
                    <div className="relative w-full flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-lg lg:max-w-none">
                            <img
                                src={aboutSplashImg}
                                alt="Whiskey toast splash"
                                className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out hover:scale-102"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
