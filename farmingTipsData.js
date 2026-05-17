// farmingTipsData.js — 40 realistic Indian farming tips/articles
// Each article links to a real, publicly accessible farming resource.

var FEATURED_TIP = {
  id: 0,
  title: "Optimizing Water Usage with Low-Cost Drip Systems",
  category: "Irrigation",
  date: "Nov 01, 2024",
  icon: "water_drop",
  excerpt: "Learn how to install and maintain a gravity-fed drip irrigation system using local materials to reduce water consumption by up to 40% while increasing crop quality.",
  articleUrl: "https://vikaspedia.in/agriculture/water-management/drip-irrigation",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZYGIPm5YPnfpSsJVCsOd6JDn23gOsAXXO8Plxk_O7Fiv80sG2MEB47bMdsZFmhwtzWiC5da9ROmZBl_jrxpDT8h4DHo-mL-jI3oeylh_x39lODcdciVcX0fOtSTB4-o2pFKrMjx5fzZoS1Nt1kSVOyQWgYsLcxIc6wq2lyTmol3-0oZApI4IcNz2PbBut9LnsBfkxrINEVm5sc7yDNxLE9KDjgkXVCTjfjqCy1U5tmHEo77a3QL9m3pcNrBmomYrJ_ZUFcy8y0Dub"
};

var FARMING_TIPS = [
  {
    id: 1,
    title: "Sustainable Vermicompost: Turning Farm Waste into Gold",
    category: "Organic Farming",
    date: "Oct 24, 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9WjyYOXTOzAswukc2Ar6NZ64BMDYdihjzScmi0EClk1KB3pL68zeb3d1T3v1X1UQyQSMDQ_1phDqYMHGk1sCyO6Hanl7w0Lm1khoAlqkPj6BAsNMgy8U0JCPcKM9gtgtfv00qPZLWy4mhkDHpovexc_a9nkuAR2MvhaNjsPpczzRdBiC5CyW-pXLKz9gsQlOpH0wi6Wc2wuoF9ExMrqlzpugXzMthu_aCIFsjXSvEbyVpcagL7oMzF329am1fa67X2q-qhb0qFu-W",
    excerpt: "Learn the step-by-step process of creating high-nutrient compost using earthworms and farm residue to eliminate dependency on chemical fertilizers.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/organic-matter/vermicompost"
  },
  {
    id: 2,
    title: "Natural Pest Repellents: The Power of Neem Oil",
    category: "Pest Control",
    date: "Oct 20, 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_7B7rKveheudXNsZm2CBLm0FArSAz6EYOlcO9TXGZ7PdCNTbPb-gUfPP4RAvWE36_h2bmCvwye3SrFsKtoedDf6nSp0DdqT-SQbil6J6QZztf6svPu2kIcBETqXDjfJYId6xbPGMbqjJMs5XxHO6vmeSDR0lkLfrDpvKmndBXUOt5frRyJDoffKiDYZQULQC57yoimptn1f0hXvtTltfAClwGv5sCnndQ35GcZlpGN3NtmRySgllT5higwTA1vK0b4iSG7Ut4WDcz",
    excerpt: "How to prepare and apply organic neem-based solutions to protect vegetables from common pests without using harmful chemical toxins.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/plant-protection/general-information/neem-products-as-pest-repellents"
  },
  {
    id: 3,
    title: "Rainwater Harvesting Techniques for Small Farms",
    category: "Water Conservation",
    date: "Oct 15, 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwVkm-eKX8TePmybG5Gb5QCf2rYPkLSpBVMQZ8_-S6kG0AsQxirlK6dEYpf1JAElqFgZrFkzLkfOULcFsJQ4Ig4ieQEylX89FEl7dtEZ3sxMW1KLYobd6CNyYYYnWuHufJRlz4gGPBMF-62d05WOQAC2wy3CZLCOIB3WNEUFPqcf8xaHGyA4IRnVaIX_oT83mEbgfF5iU6HHZd7I-mn-OOfFOS2gWaCKUQygKG-kq6kw1S4UyXWwM_7n7R_TnQfbGLRJODJiJO1pZ4",
    excerpt: "Simple pit and trench methods to capture monsoon runoff and recharge groundwater levels so crops survive the dry season without bore-well dependency.",
    articleUrl: "https://vikaspedia.in/agriculture/water-management/rainwater-harvesting"
  },
  {
    id: 4,
    title: "Improving Soil pH with Lime and Gypsum Treatments",
    category: "Soil Health",
    date: "Oct 10, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Understand how to test soil acidity and correct it affordably with agricultural lime or gypsum — boosting nutrient uptake and yields by 15–25%.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/soil-testing"
  },
  {
    id: 5,
    title: "Crop Rotation Strategies to Restore Soil Fertility",
    category: "Soil Health",
    date: "Oct 05, 2024",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    excerpt: "A 3-year rotation plan alternating cereals, legumes, and vegetables to naturally replenish nitrogen and break pest cycles without chemical inputs.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/crop-rotation"
  },
  {
    id: 6,
    title: "Drip Irrigation Installation for Vegetable Gardens",
    category: "Irrigation",
    date: "Sep 28, 2024",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80",
    excerpt: "Step-by-step guide to laying low-cost drip tape using 16mm pipes and drippers suitable for tomatoes, onions, and capsicum on 1–5 acre plots.",
    articleUrl: "https://vikaspedia.in/agriculture/water-management/drip-irrigation"
  },
  {
    id: 7,
    title: "Integrated Pest Management (IPM) for Cotton Crops",
    category: "Pest Control",
    date: "Sep 22, 2024",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&q=80",
    excerpt: "Combining pheromone traps, sticky yellow cards, and Trichogramma releases to control bollworm and whitefly in cotton without calendar-based spraying.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/plant-protection/ipm"
  },
  {
    id: 8,
    title: "Green Manuring with Dhaincha and Sunhemp",
    category: "Organic Farming",
    date: "Sep 18, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "How incorporating leguminous green manure crops before paddy transplanting adds 40–60 kg of nitrogen per hectare and suppresses weeds naturally.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/organic-matter/green-manuring"
  },
  {
    id: 9,
    title: "Sprinkler Irrigation for Wheat and Rabi Crops",
    category: "Irrigation",
    date: "Sep 12, 2024",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80",
    excerpt: "How to set sprinkler interval, pressure settings, and timing for winter wheat to save 30% water while maintaining uniform soil moisture across the field.",
    articleUrl: "https://vikaspedia.in/agriculture/water-management/sprinkler-irrigation"
  },
  {
    id: 10,
    title: "Organic Jivamrit Preparation and Application",
    category: "Organic Farming",
    date: "Sep 06, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Traditional recipe using cow dung, cow urine, jaggery, and chickpea flour to create a microbial soil activator proven in Subhash Palekar's zero-budget farming.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/organic-matter/jeevamrutha"
  },
  {
    id: 11,
    title: "Managing Soil Moisture with Mulching Techniques",
    category: "Water Conservation",
    date: "Aug 30, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Plastic, straw, and crop residue mulching methods that reduce evaporation by 50%, control weeds, and maintain steady soil temperature for vegetable crops.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/organic-matter/mulching"
  },
  {
    id: 12,
    title: "Heatwave Protection Strategies for Standing Crops",
    category: "Weather Preparedness",
    date: "Aug 25, 2024",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&q=80",
    excerpt: "Emergency irrigation scheduling, kaolin clay sprays, and shade net deployment to prevent heat stress and crop failure during April–June peak temperatures.",
    articleUrl: "https://vikaspedia.in/agriculture/climate-smart-agriculture/heat-stress-management"
  },
  {
    id: 13,
    title: "Biofertilizers: Rhizobium, PSB, and Azospirillum",
    category: "Organic Farming",
    date: "Aug 20, 2024",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    excerpt: "How to inoculate seeds with nitrogen-fixing and phosphate-solubilizing bacteria to cut urea and DAP usage by 25% while improving nodulation in pulses.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/organic-matter/bio-fertilizers"
  },
  {
    id: 14,
    title: "Seed Treatment Before Sowing: A Complete Checklist",
    category: "Seed Selection",
    date: "Aug 14, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Fungicide, insecticide, and biofertilizer seed dressing protocols for wheat, paddy, soybean, and cotton — improving germination rates by up to 20%.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/integrated-crop-management/seed-treatment"
  },
  {
    id: 15,
    title: "Composting Kitchen and Crop Residue at Home",
    category: "Composting",
    date: "Aug 08, 2024",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    excerpt: "Layer-by-layer aerobic composting method that converts kitchen scraps and crop stalks into ready-to-use compost in 45–60 days with minimal effort.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/organic-matter/compost"
  },
  {
    id: 16,
    title: "Selecting the Right Paddy Variety for Your Region",
    category: "Seed Selection",
    date: "Aug 02, 2024",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&q=80",
    excerpt: "Comparison of HYV, hybrid, and scented paddy varieties (MTU 1010, Pusa Basmati 1509, Swarna) for different soil and rainfall conditions across India.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/cereals-1/paddy/improved-varieties-of-paddy"
  },
  {
    id: 17,
    title: "Monsoon Preparation: Pre-Kharif Field Readiness",
    category: "Weather Preparedness",
    date: "Jul 25, 2024",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80",
    excerpt: "Drainage channel clearing, soil bunding, and input stockpiling checklist to ensure crops are sown within the optimal planting window after first rains.",
    articleUrl: "https://vikaspedia.in/agriculture/climate-smart-agriculture/contingency-crop-planning"
  },
  {
    id: 18,
    title: "Crop Rotation for Soil Nitrogen Balance",
    category: "Crop Rotation",
    date: "Jul 18, 2024",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    excerpt: "Alternating cereal and legume crops in a planned sequence rebuilds organic matter, reduces fertilizer costs, and breaks disease cycles naturally.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/crop-rotation"
  },
  {
    id: 19,
    title: "Fertigation: Delivering Nutrients Through Drip Lines",
    category: "Fertilizer Management",
    date: "Jul 12, 2024",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80",
    excerpt: "How to inject urea, 0:52:34, and micronutrient mixes through drip systems for vegetable and horticultural crops — improving NUE by up to 40%.",
    articleUrl: "https://vikaspedia.in/agriculture/water-management/micro-irrigation/fertigation"
  },
  {
    id: 20,
    title: "Balanced NPK Application for Sugarcane",
    category: "Fertilizer Management",
    date: "Jul 06, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Split-application schedule for nitrogen, phosphorus and potash in sugarcane — with timing tied to ratoon and planting stages for maximum juice quality.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/commercial-crops/sugarcane/management-practices"
  },
  {
    id: 21,
    title: "Low-Cost Greenhouse Farming for Vegetables",
    category: "Sustainable Farming",
    date: "Jun 28, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Building a bamboo and UV plastic tunnel house for under ₹80,000 per acre to grow off-season tomatoes and cucumbers at premium prices.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/protected-cultivation/greenhouse-technology"
  },
  {
    id: 22,
    title: "Dairy Farming: Balancing Green and Dry Fodder",
    category: "Dairy Farming",
    date: "Jun 20, 2024",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&q=80",
    excerpt: "Optimal roughage-to-concentrate ratios for HF and Murrah buffalo to maintain milk fat percentage and reduce feed costs through on-farm fodder cultivation.",
    articleUrl: "https://vikaspedia.in/agriculture/animal-husbandry/cattle-dairy-farming/feeding-of-dairy-cattle"
  },
  {
    id: 23,
    title: "Pheromone Traps for Early Pest Detection",
    category: "Pest Control",
    date: "Jun 14, 2024",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    excerpt: "Setting up pheromone traps at 4–5 per acre for fall armyworm, helicoverpa, and fruit fly monitoring so you spray only when pest pressure crosses the threshold.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/plant-protection/ipm/pest-monitoring"
  },
  {
    id: 24,
    title: "Zero Budget Natural Farming: Core Principles",
    category: "Sustainable Farming",
    date: "Jun 08, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Introduction to Subhash Palekar's ZBNF approach — using local cow-breed inputs, multi-layer cropping, and waaphasa (moisture equilibrium) for cost-free farming.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/integrated-crop-management/zero-budget-natural-farming"
  },
  {
    id: 25,
    title: "Soil Testing at Home Using Simple Kits",
    category: "Soil Health",
    date: "Jun 02, 2024",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80",
    excerpt: "How to use a mini soil test kit for NPK, pH, and organic carbon — and how to interpret results to plan your next crop's fertilizer schedule.",
    articleUrl: "https://soilhealth.dac.gov.in"
  },
  {
    id: 26,
    title: "Frost Protection Techniques for Winter Vegetables",
    category: "Weather Preparedness",
    date: "May 26, 2024",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80",
    excerpt: "Light irrigation before frost nights, smoke screens, and anti-transpirant sprays that protect potato and tomato crops from cold injury in North India.",
    articleUrl: "https://vikaspedia.in/agriculture/climate-smart-agriculture/cold-wave-management"
  },
  {
    id: 27,
    title: "Water-Saving Irrigation Scheduling with Soil Sensors",
    category: "Water Conservation",
    date: "May 20, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Using tensiometers and capacitance probes to trigger irrigation only when soil moisture hits the crop-specific threshold — cutting water use by 35%.",
    articleUrl: "https://vikaspedia.in/agriculture/water-management"
  },
  {
    id: 28,
    title: "Hybrid vs Open-Pollinated Seeds: Making the Right Choice",
    category: "Seed Selection",
    date: "May 14, 2024",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    excerpt: "When to invest in F1 hybrid seeds for higher yield and when to save OPV seeds — a cost-benefit analysis for smallholder farmers across crop types.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/seed-production"
  },
  {
    id: 29,
    title: "Composting Paddy Straw Instead of Burning It",
    category: "Composting",
    date: "May 08, 2024",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&q=80",
    excerpt: "Using Trichoderma and urea to speed-compost rice straw in situ within 25–30 days — eliminating stubble burning and adding organic carbon to soil.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/organic-matter/composting-of-paddy-straw"
  },
  {
    id: 30,
    title: "Cover Crops for Weed Suppression and Soil Cover",
    category: "Sustainable Farming",
    date: "Apr 30, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Sowing cowpea, jowar, or mustard as a cover crop between main crop rows to smother weeds, fix nitrogen, and reduce soil temperature during summer.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/cover-crops"
  },
  {
    id: 31,
    title: "Azolla Cultivation for Low-Cost Livestock Feed",
    category: "Dairy Farming",
    date: "Apr 24, 2024",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    excerpt: "Setting up a 10×2 m Azolla bed for under ₹1,500 that produces 500g of protein-rich feed daily for cows, goats, and poultry without recurring cost.",
    articleUrl: "https://vikaspedia.in/agriculture/animal-husbandry/cattle-dairy-farming/azolla-cultivation"
  },
  {
    id: 32,
    title: "Raised Bed Farming for Waterlogged Fields",
    category: "Soil Health",
    date: "Apr 18, 2024",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80",
    excerpt: "How to create 90 cm wide raised beds with furrows for drainage — enabling year-round vegetable production on fields that previously flooded every monsoon.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/protected-cultivation/raised-bed-cultivation"
  },
  {
    id: 33,
    title: "Micro-Drip for Orchards: Mango and Guava Management",
    category: "Irrigation",
    date: "Apr 12, 2024",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80",
    excerpt: "Placing micro-sprinklers and root-zone drippers at 60 cm depth for mango trees — improving fruit size, reducing alternate bearing, and saving 55% water.",
    articleUrl: "https://vikaspedia.in/agriculture/horticulture/fruits/mango/management-practices"
  },
  {
    id: 34,
    title: "Phosphorus Management in Black Cotton Soils",
    category: "Fertilizer Management",
    date: "Apr 06, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Why phosphorus gets fixed in vertisols and how to use SSP over DAP and apply in furrows near seeds to improve phosphorus use efficiency by 30%.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/fertilizer-management"
  },
  {
    id: 35,
    title: "Biocontrol Agents: Trichoderma for Root Rot",
    category: "Pest Control",
    date: "Mar 30, 2024",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    excerpt: "How to apply Trichoderma viride as soil drench and seed treatment to suppress Fusarium wilt, collar rot, and damping-off in chilli, brinjal, and cotton.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/plant-protection/biological-control"
  },
  {
    id: 36,
    title: "Smart Sowing Dates Using India Meteorological Data",
    category: "Weather Preparedness",
    date: "Mar 24, 2024",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&q=80",
    excerpt: "Using IMD agromet advisories, rainfall probability charts, and district-level agroclimatic zones to plan sowing dates for Kharif and Rabi crops.",
    articleUrl: "https://imd.gov.in/pages/agromet_main.php"
  },
  {
    id: 37,
    title: "Neem Cake: A Dual-Purpose Organic Input",
    category: "Organic Farming",
    date: "Mar 18, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "How to incorporate neem cake at 80–100 kg/acre as a slow-release nitrogen source that simultaneously repels soil nematodes, white grubs, and root borers.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/soil-health/organic-matter/neem-cake"
  },
  {
    id: 38,
    title: "Inter-Cropping Strategies for Maximum Land Productivity",
    category: "Crop Rotation",
    date: "Mar 12, 2024",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80",
    excerpt: "Tested inter-crop combinations — cotton+moong, maize+soybean, sugarcane+onion — that increase net returns per acre by 25–40% without extra land.",
    articleUrl: "https://vikaspedia.in/agriculture/crop-production/integrated-crop-management/intercropping"
  },
  {
    id: 39,
    title: "Greywater Recycling for Kitchen Garden Irrigation",
    category: "Water Conservation",
    date: "Mar 05, 2024",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    excerpt: "Simple gravel-sand filter construction to treat and reuse household greywater for watering leafy vegetables — saving 50 litres per household daily.",
    articleUrl: "https://vikaspedia.in/social-welfare/environment/water/greywater-management"
  },
  {
    id: 40,
    title: "Winter Dairy Management: Keeping Milk Production Steady",
    category: "Dairy Farming",
    date: "Feb 28, 2024",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    excerpt: "Adjusting concentrate rations, providing night shelters, and managing water intake for cattle during December–February to prevent seasonal milk drop.",
    articleUrl: "https://vikaspedia.in/agriculture/animal-husbandry/cattle-dairy-farming/winter-management"
  }
];
