import Container from "@/components/common/Container";

const Privacy = () => {
    return (
        <div className="bg-black-900 min-h-screen text-white pt-28 md:pt-36 pb-24">
            <Container className="md:max-w-[1320px] ">
                {/* 1. Privacy Policy Section */}
                <section className="mb-12 md:mb-16">
                    <h1 className="font-playfair text-2xl sm:text-3xl md:text-[2rem] font-bold text-white mb-6 tracking-tight">
                        Privacy Policy
                    </h1>

                    <div className="font-hanken text-sm sm:text-base text-white font-light leading-relaxed space-y-4 md:space-y-5">
                        <p>At Roseiy Emporium, we value your privacy.</p>

                        <p>
                            We collect only the information necessary to process
                            your orders, provide customer support, and improve
                            your shopping experience. Your personal information
                            will never be sold or shared with third parties
                            except where required to complete your order or
                            comply with legal obligations.
                        </p>

                        <p>
                            We use secure payment systems to protect your
                            information and take reasonable measures to
                            safeguard your personal data.
                        </p>

                        <p>
                            By using our website, you agree to the collection
                            and use of your information in accordance with this
                            Privacy Policy.
                        </p>
                    </div>
                </section>

                {/* 2. Refund & Return Policy Section */}
                <section className="mb-12 md:mb-16">
                    <h2 className="font-playfair text-2xl sm:text-3xl md:text-[2rem] font-bold text-white mb-6 tracking-tight">
                        Refund & Return Policy
                    </h2>

                    <div className="font-hanken text-sm sm:text-base text-white font-light leading-relaxed space-y-4 md:space-y-5">
                        <p>
                            We want every customer to be satisfied with their
                            purchase.
                        </p>

                        <p>
                            Due to the nature of alcoholic beverages, we do not
                            accept returns or exchanges unless:
                        </p>

                        <ul className="list-disc pl-5 space-y-2 my-3 text-white">
                            <li>You received the wrong item.</li>
                            <li>Your order arrived damaged.</li>
                            <li>The product is faulty upon delivery.</li>
                        </ul>

                        <p>
                            If there is an issue with your order, please contact
                            us within 48 hours of receiving your delivery and
                            provide photographs where applicable.
                        </p>

                        <p>
                            Approved refunds will be processed using the
                            original payment method.
                        </p>

                        <p>
                            Please note that products opened after delivery
                            cannot be returned unless they are proven to be
                            faulty.
                        </p>
                    </div>
                </section>

                {/* 3. Terms & Conditions Section */}
                <section>
                    <h2 className="font-playfair text-2xl sm:text-3xl md:text-[2rem] font-bold text-white mb-6 tracking-tight">
                        Terms & Conditions
                    </h2>

                    <div className="font-hanken text-sm sm:text-base text-white font-light leading-relaxed space-y-4 md:space-y-5">
                        <p>
                            By using the Roseiy Emporium website, you agree to
                            the following:
                        </p>

                        <ul className="list-disc pl-5 space-y-2 my-3 text-white">
                            <li>
                                You confirm that you are of legal drinking age
                                in your country or region.
                            </li>
                            <li>All products are subject to availability.</li>
                            <li>Prices may change without prior notice.</li>
                            <li>
                                We reserve the right to cancel any order due to
                                pricing errors, stock availability, or suspected
                                fraudulent activity.
                            </li>
                            <li>Delivery times are estimates and may vary.</li>
                            <li>
                                Customers are responsible for providing accurate
                                delivery information.
                            </li>
                            <li>
                                Roseiy Emporium is not responsible for delays
                                caused by circumstances beyond our control.
                            </li>
                            <li>
                                By placing an order, you agree to comply with
                                all applicable laws relating to the purchase and
                                consumption of alcohol.
                            </li>
                        </ul>
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default Privacy;
