// Datos de productos para IRON ARCH - Elite Supplements
export const products = [
  {
    id: 1,
    name: "Hyper-Whey Isolate",
    brand: "IRON ARCH ELITE",
    price: 64.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQiwWos2ACiFcql4JmwxW8Fj4aoKpDiyYQLT9yK-6qk-sqnFOpkR7lQW2Nq7dcrHelAgRw_1iZKM6dk6slyjJU5TLfzh9LF8ewZzZwyMI9DQbi4H_X-HU40n6j7EqqQzO1pWOpfII02BD2kU3elB5bGwfoKAobS4X2O5IbPExYIkvgwfqePZ6jyj2sz_NDSnokHItH7ZDlTjlrnvwzCuWulSS-JDbExhzAL_x_-mo59YhmevkcRshQUgsBHTeex1tj2NPYkCeU2EIW",
    description: "Engineered for rapid absorption and maximum muscle protein synthesis. 25g of pure isolate per serving with zero fillers.",
    badge: "15% OFF",
    badgeColor: "bg-[#CCFF00]",
    inStock: true,
    size: "2.2 KG",
    flavors: [
      { name: "Chocolate", color: "#5C4033" },
      { name: "Vanilla", color: "#F3E5AB" },
      { name: "Strawberry", color: "#E91E63" }
    ],
    nutrition: {
      calories: 110,
      protein: "25g",
      carbs: "1g",
      fat: "0.5g",
      sodium: "50mg"
    }
  },
  {
    id: 2,
    name: "Kinetic Ignite Pre",
    brand: "IRON ARCH ELITE",
    price: 49.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBalxxADXB9PFS-N7ZEpsffO58TmKgyxlur-HwYeshhr24XqGbDBVY7fRb0VpiBp6J5gPTb3RyCAc0LPwuNCrqrqU9r0V7zixXegMU85Gs2vecE6lPpXnbvrGxHKK-tz23Np4f93Z4OYepSfw663GxMJcPt3OMAa5PI4HpxOxdK9SouWpeC-QOEAZGV2KrzD7tSOqYq2cL62QhDsPydQ4j8jbDl1OafbjSFUg1DngxJxm4_fjwtVBlH0aE2ZS8oZdhw75JzOcysbeJg",
    description: "Pre-workout formula designed for intense energy and focus. Packed with premium ingredients for maximum performance.",
    badge: null,
    badgeColor: null,
    inStock: true,
    size: "300 G",
    flavors: [
      { name: "Blue Razz", color: "#0066FF" },
      { name: "Fruit Punch", color: "#DC143C" }
    ],
    nutrition: {
      calories: 20,
      protein: "0g",
      carbs: "2g",
      fat: "0g",
      sodium: "100mg"
    }
  },
  {
    id: 3,
    name: "Anabolic Recovery",
    brand: "RAW KINETIC",
    price: 39.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVl4M2Z_nkK17TdwnaUWkJZG1oBYStbZPDOajMCMHsZ2mnqAFE97SLhzjImJj3CenoE4ZeieQJRG7q2ElENKUracaPtsoMvpQRcR0rPChxqHbA_LJ2kITc4FTTaMjDUBzPqRXtaP367Cay3E6eO7G4CR5AbkM9gdM7yM6-uHL0KRlvRscGsAgFM8bz60-xRFiijQM9dRHAJgwdRCwvrJ2ax1eJXQCfe-_ayYW9wRlJZuBImbp7pMWBTL1qlix5dOBlpUzf6O1pwKf6",
    description: "Recovery blend with BCAA and amino acids for optimal post-workout recovery.",
    badge: "OUT OF STOCK",
    badgeColor: "bg-red-600",
    inStock: false,
    size: "120 CAPS",
    flavors: [
      { name: "Unflavored", color: "#FFFFFF" }
    ],
    nutrition: {
      calories: 5,
      protein: "1g",
      carbs: "0g",
      fat: "0g",
      sodium: "20mg"
    }
  },
  {
    id: 4,
    name: "Mono-Force Creatine",
    brand: "IRON ARCH ELITE",
    price: 29.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVbI64ZbQpnLX0pY1YWXuReOS0CLhKyv0EpZGeJSpSgxm7F7c7lAgG161CjAVQyu7igI7EfeU_YHcDRPTt5FdxkvmCZ699FG05ktN_GgE_Y0kqE4SaQElqae30sePdUUuFQWg-qc6PYHYQmg8DTKdnPI2ruYsdkkWletkqjEU0-mxe6g6DWqzF_Jk0kED1tA6hYoUTqhY4nt5c_jMhZC6yysRf7rsX4Yr3zKnonsqNI9vvRkcLBaOIKbNrQ4RPDBUHqbNnZQ-B2pNa",
    description: "Pure creatine monohydrate for increased strength and muscle gains.",
    badge: null,
    badgeColor: null,
    inStock: true,
    size: "500 G",
    flavors: [
      { name: "Pure", color: "#FFFFFF" }
    ],
    nutrition: {
      calories: 0,
      protein: "0g",
      carbs: "0g",
      fat: "0g",
      sodium: "0mg"
    }
  },
  {
    id: 5,
    name: "Full-Spectrum Multi",
    brand: "IRON ARCH ELITE",
    price: 34.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC6cXzUPgCBJX_gC_glREq93NSiFRUfO_8TJjh_E2q3cYLjV-C3PtIYBuZlD5fR2DNMZKOhjpw7jOpMIrYwqu3S3eRidX5dt-XFXJnn9OHlPVkst3x41a97siL8LR9YUQwU6QO5mtNJYSqaFpftBlHG9XkU24UON5NPgAm17M_xKogp00z1RSb_mYNtZYDixjMKb6hw-0E_XRn3TMZvdN7AUAjaLtA8uKVEQlv8hOJzDUA6twkGSZ2-nXp2HB_DVJlEYfnLkoi1yns",
    description: "Complete multivitamin formula with all essential minerals for optimal health.",
    badge: null,
    badgeColor: null,
    inStock: true,
    size: "60 SERVINGS",
    flavors: [],
    nutrition: {
      calories: 10,
      protein: "0g",
      carbs: "2g",
      fat: "0g",
      sodium: "10mg"
    }
  },
  {
    id: 6,
    name: "Steel-Core Shaker",
    brand: "IRON ARCH ELITE",
    price: 24.99,
    originalPrice: null,
    category: "Equipment",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4SWbwbd31uyPQNm3-G2m52ztLjPXOjhchK7zT5NVVTWjHs5WI-E7Q54YWpB6j35Ycf3_jqsFefnsqklLQUHeITf9fdvHV_-O_Dkmow7z0BVwi6CE-dr5mN0dQW0DXydzwnfO99VmWDPhlX9hCwUOdzqMnKiFIfOAghDQD8lXU0xUATK6KAHLsxLt96lxml1A1BzhhK8pX7UyYBbeDXzG0YAljd0e_0JQ_sWjxf47qIh-m1dl0SfK4CbF04ZwycaZWDpr0D1NGeRr6",
    description: "Professional grade stainless steel shaker bottle with secure lid.",
    badge: null,
    badgeColor: null,
    inStock: true,
    size: "750 ML",
    flavors: [
      { name: "Black", color: "#000000" },
      { name: "Silver", color: "#A9A9A9" }
    ],
    nutrition: null
  },
  {
    id: 7,
    name: "Peak Performance Isolate",
    brand: "IRON ARCH ELITE",
    price: 59.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQiwWos2ACiFcql4JmwxW8Fj4aoKpDiyYQLT9yK-6qk-sqnFOpkR7lQW2Nq7dcrHelAgRw_1iZKM6dk6slyjJU5TLfzh9LF8ewZzZwyMI9DQbi4H_X-HU40n6j7EqqQzO1pWOpfII02BD2kU3elB5bGwfoKAobS4X2O5IbPExYIkvgwfqePZ6jyj2sz_NDSnokHItH7ZDlTjlrnvwzCuWulSS-JDbExhzAL_x_-mo59YhmevkcRshQUgsBHTeex1tj2NPYkCeU2EIW",
    description: "Premium whey isolate with fast absorption for superior results.",
    badge: null,
    badgeColor: null,
    inStock: true,
    size: "2.5 KG",
    flavors: [
      { name: "Chocolate", color: "#5C4033" },
      { name: "Vanilla", color: "#F3E5AB" }
    ],
    nutrition: {
      calories: 110,
      protein: "25g",
      carbs: "1g",
      fat: "0.5g",
      sodium: "50mg"
    }
  },
  {
    id: 8,
    name: "Kinetic Boost",
    brand: "IRON ARCH ELITE",
    price: 44.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBalxxADXB9PFS-N7ZEpsffO58TmKgyxlur-HwYeshhr24XqGbDBVY7fRb0VpiBp6J5gPTb3RyCAc0LPwuNCrqrqU9r0V7zixXegMU85Gs2vecE6lPpXnbvrGxHKK-tz23Np4f93Z4OYepSfw663GxMJcPt3OMAa5PI4HpxOxdK9SouWpeC-QOEAZGV2KrzD7tSOqYq2cL62QhDsPydQ4j8jbDl1OafbjSFUg1DngxJxm4_fjwtVBlH0aE2ZS8oZdhw75JzOcysbeJg",
    description: "Energy booster with natural ingredients for sustained performance.",
    badge: null,
    badgeColor: null,
    inStock: true,
    size: "350 G",
    flavors: [
      { name: "Blue Razz", color: "#0066FF" },
      { name: "Tropical", color: "#FFA500" }
    ],
    nutrition: {
      calories: 15,
      protein: "0g",
      carbs: "3g",
      fat: "0g",
      sodium: "80mg"
    }
  },
  {
    id: 9,
    name: "Hydra-Strength",
    brand: "IRON ARCH ELITE",
    price: 32.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVbI64ZbQpnLX0pY1YWXuReOS0CLhKyv0EpZGeJSpSgxm7F7c7lAgG161CjAVQyu7igI7EfeU_YHcDRPTt5FdxkvmCZ699FG05ktN_GgE_Y0kqE4SaQElqae30sePdUUuFQWg-qc6PYHYQmg8DTKdnPI2ruYsdkkWletkqjEU0-mxe6g6DWqzF_Jk0kED1tA6hYoUTqhY4nt5c_jMhZC6yysRf7rsX4Yr3zKnonsqNI9vvRkcLBaOIKbNrQ4RPDBUHqbNnZQ-B2pNa",
    description: "Hydration and electrolyte formula for intense training sessions.",
    badge: null,
    badgeColor: null,
    inStock: true,
    size: "400 G",
    flavors: [
      { name: "Lemon", color: "#FFFF00" },
      { name: "Tropical", color: "#FFA500" }
    ],
    nutrition: {
      calories: 20,
      protein: "0g",
      carbs: "5g",
      fat: "0g",
      sodium: "150mg"
    }
  },
  {
    id: 10,
    name: "Pre-Workout Vol 2",
    brand: "IRON ARCH ELITE",
    price: 45.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQiwWos2ACiFcql4JmwxW8Fj4aoKpDiyYQLT9yK-6qk-sqnFOpkR7lQW2Nq7dcrHelAgRw_1iZKM6dk6slyjJU5TLfzh9LF8ewZzZwyMI9DQbi4H_X-HU40n6j7EqqQzO1pWOpfII02BD2kU3elB5bGwfoKAobS4X2O5IbPExYIkvgwfqePZ6jyj2sz_NDSnokHItH7ZDlTjlrnvwzCuWulSS-JDbExhzAL_x_-mo59YhmevkcRshQUgsBHTeex1tj2NPYkCeU2EIW",
    description: "Advanced pre-workout formula with improved ingredients and flavors.",
    badge: null,
    badgeColor: null,
    inStock: true,
    size: "300 G",
    flavors: [
      { name: "Mango", color: "#FF8C00" },
      { name: "Passion Fruit", color: "#FF1493" }
    ],
    nutrition: {
      calories: 25,
      protein: "0g",
      carbs: "6g",
      fat: "0g",
      sodium: "120mg"
    }
  },
  {
    id: 11,
    name: "Creatine Arch-5",
    brand: "IRON ARCH ELITE",
    price: 54.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBalxxADXB9PFS-N7ZEpsffO58TmKgyxlur-HwYeshhr24XqGbDBVY7fRb0VpiBp6J5gPTb3RyCAc0LPwuNCrqrqU9r0V7zixXegMU85Gs2vecE6lPpXnbvrGxHKK-tz23Np4f93Z4OYepSfw663GxMJcPt3OMAa5PI4HpxOxdK9SouWpeC-QOEAZGV2KrzD7tSOqYq2cL62QhDsPydQ4j8jbDl1OafbjSFUg1DngxJxm4_fjwtVBlH0aE2ZS8oZdhw75JzOcysbeJg",
    description: "Premium blend of 5 types of creatine for maximum effectiveness.",
    badge: null,
    badgeColor: null,
    inStock: true,
    size: "600 G",
    flavors: [
      { name: "Unflavored", color: "#FFFFFF" }
    ],
    nutrition: {
      calories: 0,
      protein: "0g",
      carbs: "0g",
      fat: "0g",
      sodium: "0mg"
    }
  },
  {
    id: 12,
    name: "Ultra Greens Complex",
    brand: "IRON ARCH ELITE",
    price: 59.99,
    originalPrice: null,
    category: "Supplements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVbI64ZbQpnLX0pY1YWXuReOS0CLhKyv0EpZGeJSpSgxm7F7c7lAgG161CjAVQyu7igI7EfeU_YHcDRPTt5FdxkvmCZ699FG05ktN_GgE_Y0kqE4SaQElqae30sePdUUuFQWg-qc6PYHYQmg8DTKdnPI2ruYsdkkWletkqjEU0-mxe6g6DWqzF_Jk0kED1tA6hYoUTqhY4nt5c_jMhZC6yysRf7rsX4Yr3zKnonsqNI9vvRkcLBaOIKbNrQ4RPDBUHqbNnZQ-B2pNa",
    description: "Complete green superfood blend with antioxidants and detox support.",
    badge: null,
    badgeColor: null,
    inStock: true,
    size: "300 G",
    flavors: [
      { name: "Apple", color: "#00AA00" },
      { name: "Tropical", color: "#FFA500" }
    ],
    nutrition: {
      calories: 30,
      protein: "2g",
      carbs: "5g",
      fat: "0.5g",
      sodium: "40mg"
    }
  }
];

export default products;
