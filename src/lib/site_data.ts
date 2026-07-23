import type { Product } from "@/config/types";

export const logo =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784380094/Roseiy_Emporium_Logo_2_zdlboe.png";
export const activeNavImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784400550/navUder_dw5zhf.png";

export const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Shop", href: "/catalog" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
];
// hero section
export const heroBg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784496510/image_43_buvvmk.png";
export const heroBg2 =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784497637/hero_drink_mzkc2u.png";
export const heroBgMobile =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784788437/mobilehereo_lkqweh.png";

// decorative divider

export const decorativeDivider =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784469193/decorative_Divider_1_dsqk09.png";
export const badgeOrnament =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784546318/badge_ardoment_hwzvqz.png";

export const hennessyLogo =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784784438/image_23_kj73da.png";
export const chamdorLogo =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784784581/image_25_rclwv6.png";
export const evaLogo = "/assets/brands/eva.png";
export const johnnieWalkerLogo =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784784640/image_24_jwixdb.png";

export const brandDivider =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784784710/Group_1_qjk9jy.png";
export const topFlourishOrnament =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784762751/Group_wfssz0.png";

// category grid

export const categoryHeaderDivider =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784791945/Group_2_gistev.png";

export const champagneImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784792766/champange_bukmp4.png";
export const sweetwineImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784802773/Image_qs1ex3.png";
export const whiskeyImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784802920/Image_1_nsdp2h.png";
export const cognacImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784803007/Image_2_xcjlsy.png";
export const tequilaImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784803138/Image_3_jcvz6e.png";
export const rumImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784803194/Image_4_z8kfyz.png";

export const products: Product[] = [
    {
        id: "1",
        name: "Moet & Chandon Imperial Brut",
        category: "Beer",
        volume: "500ml",
        piecesLeft: 12,
        casesLeft: 5,
        price: 350,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813213/p_1_pndwco.png",
        isFeatured: true,
    },
    {
        id: "2",
        name: "Craft Pilsner Can",
        category: "Beer",
        volume: "330ml",
        piecesLeft: 8,
        casesLeft: 3,
        price: 280,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813213/p_2_wyfdyq.png",
    },
    {
        id: "3",
        name: "Premium Lager Bottle",
        category: "Beer",
        volume: "600ml",
        piecesLeft: 0,
        casesLeft: 0,
        price: 420,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_3_bmhinc.png",
    },
    {
        id: "4",
        name: "Artisan Stout Can",
        category: "Beer",
        volume: "330ml",
        piecesLeft: 20,
        casesLeft: 10,
        price: 380,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_4_ga8oeh.png",
    },
    {
        id: "5",
        name: "Vintage Aged Whiskey",
        category: "Whiskey",
        volume: "750ml",
        piecesLeft: 15,
        casesLeft: 4,
        price: 1250,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_5_ohp3t7.png",
        isFeatured: true,
    },
    {
        id: "6",
        name: "Prestige Grand Cognac",
        category: "Cognac",
        volume: "700ml",
        piecesLeft: 6,
        casesLeft: 2,
        price: 1800,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_6_eph9tv.png",
    },
    {
        id: "7",
        name: "Imperial Brut Champagne",
        category: "Champagne",
        volume: "750ml",
        piecesLeft: 10,
        casesLeft: 3,
        price: 1450,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_7_bsy5mg.png",
        isFeatured: true,
    },
    {
        id: "8",
        name: "Reposado Gold Tequila",
        category: "Tequila",
        volume: "750ml",
        piecesLeft: 14,
        casesLeft: 6,
        price: 980,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_8_zk4ynx.png",
    },
];

export const categories = [
    {
        title: "Champagne",
        image: champagneImg,
        href: "/catalog?category=champagne",
    },
    {
        title: "Sweetwine",
        image: sweetwineImg,
        href: "/catalog?category=sweetwine",
    },
    {
        title: "Whiskey",
        image: whiskeyImg,
        href: "/catalog?category=whiskey",
    },
    { title: "Cognac", image: cognacImg, href: "/catalog?category=cognac" },
    {
        title: "Tequila",
        image: tequilaImg,
        href: "/catalog?category=tequila",
    },
    { title: "Rum", image: rumImg, href: "/catalog?category=rum" },
];

export const glenfiddichLogo = "/icon/I_1.svg";
export const domPerignonLogo = "/icon/I_2.svg";
export const veuveClicquotLogo = "/icon/I_3.svg";
export const moetLogo = "/icon/I_4.svg";

export const donJulioLogo = "/icon/I_5.svg";
export const claseAzulLogo = "/icon/I_6.svg";
export const tequilaLogo = "/icon/I_7.svg";
