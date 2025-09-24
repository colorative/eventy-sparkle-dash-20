
export interface MapArea {
  id: string;
  name: string;
  type: 'booth' | 'room' | 'lounge' | 'catering' | 'hall';
  description: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const floorMapAreas: MapArea[] = [
  // Booths (numbered areas)
  { id: 'booth-3', name: 'Showcase Lounge 3', type: 'lounge', description: 'Premium showcase and networking area', coordinates: { x: 64, y: 241, width: 140, height: 240 } },
  { id: 'booth-17', name: 'Booth 17', type: 'booth', description: 'Technology solutions provider', coordinates: { x: 183, y: 384, width: 30, height: 30 } },
  { id: 'booth-18', name: 'Booth 18', type: 'booth', description: 'Software development company', coordinates: { x: 215, y: 384, width: 30, height: 30 } },
  { id: 'booth-16', name: 'Booth 16', type: 'booth', description: 'Digital marketing agency', coordinates: { x: 183, y: 416, width: 30, height: 30 } },
  { id: 'booth-19', name: 'Booth 19', type: 'booth', description: 'Cloud services provider', coordinates: { x: 215, y: 416, width: 30, height: 30 } },
  { id: 'booth-13', name: 'Booth 13', type: 'booth', description: 'AI technology startup', coordinates: { x: 183, y: 500, width: 30, height: 30 } },
  { id: 'booth-14', name: 'Booth 14', type: 'booth', description: 'Data analytics firm', coordinates: { x: 215, y: 500, width: 30, height: 30 } },
  { id: 'booth-12', name: 'Booth 12', type: 'booth', description: 'Cybersecurity solutions', coordinates: { x: 183, y: 532, width: 30, height: 30 } },
  { id: 'booth-15', name: 'Booth 15', type: 'booth', description: 'Mobile app development', coordinates: { x: 215, y: 532, width: 30, height: 30 } },
  { id: 'booth-9', name: 'Booth 9', type: 'booth', description: 'IoT solutions provider', coordinates: { x: 183, y: 616, width: 30, height: 30 } },
  { id: 'booth-10', name: 'Booth 10', type: 'booth', description: 'Blockchain technology', coordinates: { x: 215, y: 616, width: 30, height: 30 } },
  { id: 'booth-8', name: 'Booth 8', type: 'booth', description: 'VR/AR development', coordinates: { x: 183, y: 648, width: 30, height: 30 } },
  { id: 'booth-11', name: 'Booth 11', type: 'booth', description: 'Machine learning platform', coordinates: { x: 215, y: 648, width: 30, height: 30 } },
  { id: 'booth-5', name: 'Booth 5', type: 'booth', description: 'Fintech solutions', coordinates: { x: 183, y: 764, width: 30, height: 30 } },
  { id: 'booth-6', name: 'Booth 6', type: 'booth', description: 'E-commerce platform', coordinates: { x: 215, y: 764, width: 30, height: 30 } },
  { id: 'booth-4', name: 'Booth 4', type: 'booth', description: 'Healthcare technology', coordinates: { x: 183, y: 796, width: 30, height: 30 } },
  { id: 'booth-7', name: 'Booth 7', type: 'booth', description: 'EdTech solutions', coordinates: { x: 215, y: 796, width: 30, height: 30 } },
  
  // Conference and Exhibition areas
  { id: 'conference-room-1', name: 'Conference Room 1', type: 'room', description: 'Main conference and presentation space', coordinates: { x: 401, y: 344, width: 183, height: 132 } },
  { id: 'exhibition-hall', name: 'Exhibition Hall', type: 'hall', description: 'Main exhibition and demo area', coordinates: { x: 356, y: 570, width: 218, height: 188 } },
  
  // Right side booths
  { id: 'booth-45', name: 'Booth 45', type: 'booth', description: 'Green technology solutions', coordinates: { x: 646, y: 448, width: 30, height: 30 } },
  { id: 'booth-46', name: 'Booth 46', type: 'booth', description: 'Renewable energy systems', coordinates: { x: 678, y: 448, width: 30, height: 30 } },
  { id: 'booth-44', name: 'Booth 44', type: 'booth', description: 'Smart city solutions', coordinates: { x: 646, y: 480, width: 30, height: 30 } },
  { id: 'booth-43', name: 'Booth 43', type: 'booth', description: 'Transportation technology', coordinates: { x: 678, y: 480, width: 30, height: 30 } },
  
  // Lounges
  { id: 'lounge-f', name: 'Lounge F', type: 'lounge', description: 'Networking and refreshment area', coordinates: { x: 646, y: 344, width: 78, height: 48 } },
  { id: 'showcase-lounge', name: 'Showcase Lounge', type: 'lounge', description: 'Premium product showcase area', coordinates: { x: 724, y: 344, width: 148, height: 48 } },
  { id: 'lounge-e', name: 'Lounge E', type: 'lounge', description: 'Quiet meeting space', coordinates: { x: 646, y: 648, width: 78, height: 48 } },
  
  // Speakers Hub
  { id: 'speakers-hub', name: 'Speakers Hub', type: 'room', description: 'Speaker preparation and green room', coordinates: { x: 646, y: 874, width: 177, height: 72 } },
  
  // Bottom booths
  { id: 'booth-24', name: 'Booth 24', type: 'booth', description: 'Industry 4.0 solutions', coordinates: { x: 327, y: 997, width: 30, height: 30 } },
  { id: 'booth-25', name: 'Booth 25', type: 'booth', description: 'Automation technology', coordinates: { x: 359, y: 997, width: 30, height: 30 } },
  { id: 'booth-26', name: 'Booth 26', type: 'booth', description: 'Robotics solutions', coordinates: { x: 391, y: 997, width: 30, height: 30 } },
  { id: 'booth-27', name: 'Booth 27', type: 'booth', description: 'Manufacturing tech', coordinates: { x: 423, y: 997, width: 30, height: 30 } },
  { id: 'booth-28', name: 'Booth 28', type: 'booth', description: 'Supply chain solutions', coordinates: { x: 554, y: 997, width: 30, height: 30 } },
  { id: 'booth-29', name: 'Booth 29', type: 'booth', description: 'Logistics technology', coordinates: { x: 586, y: 997, width: 30, height: 30 } },
  { id: 'booth-30', name: 'Booth 30', type: 'booth', description: 'Warehouse automation', coordinates: { x: 618, y: 997, width: 30, height: 30 } },
];
