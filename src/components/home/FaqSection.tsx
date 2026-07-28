// import Container from "@/components/common/Container";
// import TitleDecoration from "@/components/common/TitleDecoration";
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion";

// interface FaqItem {
//     id: number;
//     question: string;
//     answer: string;
// }

// export const FaqSection = () => {
//     const faqs: FaqItem[] = [
//         {
//             id: 1,
//             question: "Do you sell authentic products?",
//             answer: "Yes. All products sold by Roseiy Emporium are 100% genuine and sourced from trusted suppliers.",
//         },
//         {
//             id: 2,
//             question: "Do you offer delivery?",
//             answer: "Yes, we offer fast and secure doorstep delivery across designated locations. Express handling is also available for urgent orders.",
//         },
//         {
//             id: 3,
//             question: "Can I place an order for a special occasion?",
//             answer: "Absolutely! We cater to corporate gifting, weddings, anniversaries, and personal celebrations with custom gift packaging.",
//         },
//         {
//             id: 4,
//             question: "How do I place an order?",
//             answer: "Simply browse our catalog, add your desired bottles to the cart, and proceed through our quick and secure online checkout.",
//         },
//         {
//             id: 5,
//             question: "What payment methods do you accept?",
//             answer: "We accept debit/credit cards, direct bank transfers, and secure online payment gateways for your convenience.",
//         },
//         {
//             id: 6,
//             question: "Can I cancel my order?",
//             answer: "Orders can be canceled prior to dispatch by contacting our support team promptly with your order reference number.",
//         },
//         {
//             id: 7,
//             question: "Do I need to be over 18 to purchase alcohol?",
//             answer: "Yes. In compliance with statutory regulations, you must be 18 years of age or older to purchase alcoholic beverages from Roseiy Emporium.",
//         },
//     ];

//     return (
//         <section className="w-full bg-black-900 py-16 md:py-24">
//             <Container>
//                 <div className="w-full  mx-auto flex flex-col items-center">
//                     {/* Title Header */}
//                     <div className="mb-10 md:mb-14">
//                         <TitleDecoration title="Frequently Asked Questions" />
//                         <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-104.5 leading-tight ">
//                             Answers, Before You Ask.
//                         </h2>

//                         <p className="mt-3 md:mt-4 text-body-c1 md:text-body-b2 max-w-81.75 md:max-w-171 text-center text-neutral-300 font-hanken font-light">
//                             Find answers to the most common questions about
//                             orders, delivery, payments, returns, and our premium
//                             collection.
//                         </p>
//                     </div>

//                     {/* shadcn Accordion Root Container */}
//                     <Accordion
//                         type="single"
//                         collapsible
//                         defaultValue="item-1"
//                         className="w-full space-y-1 md:space-y-4"
//                     >
//                         {faqs?.map((faq) => (
//                             <AccordionItem
//                                 key={faq.id}
//                                 value={`item-${faq.id}`}
//                                 className="group bg-black-700 border-none shadow-none rounded-lg px-6 py-1 transition-all duration-300"
//                             >
//                                 <AccordionTrigger className="font-hanken text-body-b3 sm:text-body-b2 font-bold text-white hover:text-gold-500 group-data-[state=open]:text-gold-500 [&_svg]:group-data-[state=open]:text-gold-500 no-underline hover:no-underline py-5">
//                                     {faq.id}. {faq.question}
//                                 </AccordionTrigger>

//                                 <AccordionContent className="text-neutral-300 font-hanken text-body-c1 sm:text-body-b3 font-light leading-relaxed pt-1 pb-5">
//                                     {faq.answer}
//                                 </AccordionContent>
//                             </AccordionItem>
//                         ))}
//                     </Accordion>
//                 </div>
//             </Container>
//         </section>
//     );
// };

import { useState } from "react";
import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { ChevronDown } from "lucide-react";

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

export const FaqSection = () => {
    // Keep item 1 open by default
    const [openId, setOpenId] = useState<number | null>(1);

    const faqs: FaqItem[] = [
        {
            id: 1,
            question: "Do you sell authentic products?",
            answer: "Yes. All products sold by Roseiy Emporium are 100% genuine and sourced from trusted suppliers.",
        },
        {
            id: 2,
            question: "Do you offer delivery?",
            answer: "Yes, we offer fast and secure doorstep delivery across designated locations. Express handling is also available for urgent orders.",
        },
        {
            id: 3,
            question: "Can I place an order for a special occasion?",
            answer: "Absolutely! We cater to corporate gifting, weddings, anniversaries, and personal celebrations with custom gift packaging.",
        },
        {
            id: 4,
            question: "How do I place an order?",
            answer: "Simply browse our catalog, add your desired bottles to the cart, and proceed through our quick and secure online checkout.",
        },
        {
            id: 5,
            question: "What payment methods do you accept?",
            answer: "We accept debit/credit cards, direct bank transfers, and secure online payment gateways for your convenience.",
        },
        {
            id: 6,
            question: "Can I cancel my order?",
            answer: "Orders can be canceled prior to dispatch by contacting our support team promptly with your order reference number.",
        },
        {
            id: 7,
            question: "Do I need to be over 18 to purchase alcohol?",
            answer: "Yes. In compliance with statutory regulations, you must be 18 years of age or older to purchase alcoholic beverages from Roseiy Emporium.",
        },
    ];

    const toggleFaq = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="w-full bg-black-900 py-6 md:py-8">
            <Container>
                <div className="w-full mx-auto flex flex-col items-center">
                    {/* Title Header */}
                    <div className="mb-10 md:mb-14 flex flex-col items-center text-center">
                        <TitleDecoration title="Frequently Asked Questions" />

                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-104.5 leading-tight">
                            Answers, Before You Ask.
                        </h2>

                        <p className="mt-3 md:mt-4 text-body-c1 md:text-body-b2 max-w-81.75 md:max-w-171 text-center text-neutral-300 font-hanken font-light">
                            Find answers to the most common questions about
                            orders, delivery, payments, returns, and our premium
                            collection.
                        </p>
                    </div>

                    {/* Custom Accordion Container */}
                    <div className="w-full space-y-2 md:space-y-4">
                        {faqs?.map((faq) => {
                            const isOpen = openId === faq.id;

                            return (
                                <div
                                    key={faq.id}
                                    className="bg-black-700 rounded-lg px-6 overflow-hidden transition-all duration-300"
                                >
                                    {/* Question Header Button */}
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                                    >
                                        <span
                                            className={`font-hanken text-body-b3 sm:text-body-b2 font-bold transition-colors duration-200 ${
                                                isOpen
                                                    ? "text-gold-500"
                                                    : "text-white group-hover:text-gold-500"
                                            }`}
                                        >
                                            {faq.id}. {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`size-5 shrink-0 transition-transform duration-300 ${
                                                isOpen
                                                    ? "rotate-180 text-gold-500"
                                                    : "text-white group-hover:text-gold-500"
                                            }`}
                                        />
                                    </button>

                                    {/* Expandable Answer */}
                                    {isOpen && (
                                        <div className="text-neutral-300 font-hanken text-body-c1 sm:text-body-b3 font-light leading-relaxed pt-1 pb-5 animate-in fade-in-50 duration-200">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};
