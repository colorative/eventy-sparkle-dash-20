
export const roles = ["Startup", "Venture Capital", "Investor", "Corporate", "Accelerator", "Press", "Student"];
export const industries = ["AI/ML", "SaaS", "FinTech", "HealthTech", "E-commerce", "EdTech", "Mobility", "DeepTech"];
export const primaryFunctions = ["Scaling", "Consulting", "Financing", "Accelerator", "Incubator", "Product", "Engineering", "Marketing"];

export interface Interest {
  id: string;
  label: string;
  category: "Profile" | "Startup Stage" | "Investment";
}

export const interests: Interest[] = [
  // Profile interests (20+)
  { id: "ai", label: "Artificial Intelligence", category: "Profile" },
  { id: "ml", label: "Machine Learning", category: "Profile" },
  { id: "robotics", label: "Robotics", category: "Profile" },
  { id: "blockchain", label: "Blockchain", category: "Profile" },
  { id: "iot", label: "Internet of Things", category: "Profile" },
  { id: "cybersecurity", label: "Cybersecurity", category: "Profile" },
  { id: "cloud-computing", label: "Cloud Computing", category: "Profile" },
  { id: "big-data", label: "Big Data", category: "Profile" },
  { id: "data-science", label: "Data Science", category: "Profile" },
  { id: "analytics", label: "Analytics", category: "Profile" },
  { id: "automation", label: "Automation", category: "Profile" },
  { id: "ar-vr", label: "AR/VR", category: "Profile" },
  { id: "quantum-computing", label: "Quantum Computing", category: "Profile" },
  { id: "5g", label: "5G Technology", category: "Profile" },
  { id: "edge-computing", label: "Edge Computing", category: "Profile" },
  { id: "computer-vision", label: "Computer Vision", category: "Profile" },
  { id: "nlp", label: "Natural Language Processing", category: "Profile" },
  { id: "neural-networks", label: "Neural Networks", category: "Profile" },
  { id: "deep-learning", label: "Deep Learning", category: "Profile" },
  { id: "devops", label: "DevOps", category: "Profile" },
  { id: "microservices", label: "Microservices", category: "Profile" },
  { id: "apis", label: "APIs", category: "Profile" },
  { id: "mobile-dev", label: "Mobile Development", category: "Profile" },
  { id: "web-dev", label: "Web Development", category: "Profile" },
  
  // Startup Stage
  { id: "pre-seed", label: "Pre-seed", category: "Startup Stage" },
  { id: "seed", label: "Seed", category: "Startup Stage" },
  { id: "series-a", label: "Series A", category: "Startup Stage" },
  { id: "series-b", label: "Series B+", category: "Startup Stage" },
  
  // Investment (3 more without modal)
  { id: "invest-in", label: "Invest In", category: "Investment" },
  { id: "get-invest", label: "Get Investment", category: "Investment" },
  { id: "angel-investing", label: "Angel Investing", category: "Investment" },
  { id: "vc-funding", label: "VC Funding", category: "Investment" },
  { id: "crowdfunding", label: "Crowdfunding", category: "Investment" },
  { id: "grants", label: "Grants", category: "Investment" },
];

export const countries = {
  "Continents": ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"],
  "Countries": [
    "🇺🇸 United States", "🇬🇧 United Kingdom", "🇩🇪 Germany", "🇨🇦 Canada", "🇫🇷 France", 
    "🇯🇵 Japan", "🇨🇳 China", "🇮🇳 India", "🇧🇷 Brazil", "🇦🇺 Australia", "🇮🇹 Italy", 
    "🇪🇸 Spain", "🇳🇱 Netherlands", "🇸🇪 Sweden", "🇨🇭 Switzerland", "🇰🇷 South Korea", 
    "🇸🇬 Singapore", "🇷🇺 Russia", "🇲🇽 Mexico", "🇦🇷 Argentina", "🇿🇦 South Africa", 
    "🇳🇬 Nigeria", "🇪🇬 Egypt", "🇰🇪 Kenya", "🇹🇭 Thailand", "🇻🇳 Vietnam", "🇮🇩 Indonesia", 
    "🇵🇭 Philippines", "🇲🇾 Malaysia", "🇳🇿 New Zealand", "🇳🇴 Norway", "🇩🇰 Denmark", 
    "🇫🇮 Finland", "🇧🇪 Belgium", "🇦🇹 Austria", "🇵🇹 Portugal", "🇮🇪 Ireland", "🇮🇱 Israel", 
    "🇦🇪 UAE", "🇸🇦 Saudi Arabia", "🇹🇷 Turkey", "🇵🇱 Poland", "🇨🇿 Czech Republic", 
    "🇭🇺 Hungary", "🇷🇴 Romania", "🇬🇷 Greece", "🇭🇰 Hong Kong", "🇹🇼 Taiwan", "🇨🇱 Chile", 
    "🇵🇪 Peru", "🇨🇴 Colombia", "🇻🇪 Venezuela", "🇪🇨 Ecuador", "🇺🇾 Uruguay"
  ],
};
