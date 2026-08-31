export interface AddressItem {
    id: string;
    title: string;
    country: string;
    state: string;
    city: string;
    address: string;
    phone: string;
    isDefault?: boolean;
}

export interface AddressFormData {
    country: string;
    state: string;
    city: string;
    address: string;
    phone?: string;
    title?: string;
}

export const COUNTRY_OPTIONS = [
    "Nigeria",
    "United Kingdom",
    "United States",
    "Ghana",
    "Canada",
];

export const NIGERIA_STATES = [
    "Lagos",
    "Abuja (FCT)",
    "Rivers",
    "Oyo",
    "Ogun",
    "Enugu",
    "Delta",
    "Edo",
    "Kano",
    "Anambra",
    "Akwa Ibom",
    "Cross River",
    "Kaduna",
    "Ondo",
    "Imo",
];

export const INITIAL_ADDRESSES: AddressItem[] = [
    {
        id: "addr-1",
        title: "Shipping Address 1",
        country: "Nigeria",
        state: "Lagos",
        city: "Lekki",
        address: "Plot 8 Augustus Alakiya Close, Ogombo, Lekki Lagos",
        phone: "+234 812 345 6789",
        isDefault: false,
    },
    {
        id: "addr-2",
        title: "Shipping Address 2",
        country: "Nigeria",
        state: "Lagos",
        city: "Lekki",
        address: "Plot 8 Augustus Alakiya Close, Ogombo, Lekki Lagos",
        phone: "+234 812 345 6789",
        isDefault: true,
    },
    {
        id: "addr-3",
        title: "Shipping Address 3",
        country: "Nigeria",
        state: "Lagos",
        city: "Lekki",
        address: "Plot 8 Augustus Alakiya Close, Ogombo, Lekki Lagos",
        phone: "+234 812 345 6789",
        isDefault: false,
    },
];
