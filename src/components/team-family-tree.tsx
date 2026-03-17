import React from 'react';
import Image from 'next/image';
import membersData from '@/data/members.json';

// Define the member interface
interface Member {
  name: string;
  batch: string;
  image: string;
}

// Clean data: remove invalid entries like "Img"
const validMembers = membersData.filter((m: Member) => m.name.toLowerCase() !== 'img');

// Define batch hierarchy (sort order: older batches first, then newer, then unknown)
const batchOrder = [
  "2018-2022",
  "2022-2026",
  "2023-2027",
  "2024-2028",
  "2025-2029",
  "Unknown"
];

const batchLabels: Record<string, string> = {
  "2018-2022": "Alumni (2018 - 2022)",
  "2022-2026": "Seniors (Batch 2022 - 2026)",
  "2023-2027": "Pre-Finals (Batch 2023 - 2027)",
  "2024-2028": "Sophomores (Batch 2024 - 2028)",
  "2025-2029": "Freshers (Batch 2025 - 2029)",
  "Unknown": "Other Members"
};

// Group members by batch
const groupedMembers: Record<string, Member[]> = {};
validMembers.forEach(member => {
  if (!groupedMembers[member.batch]) {
    groupedMembers[member.batch] = [];
  }
  groupedMembers[member.batch].push(member);
});

// Sort members within each batch alphabetically
Object.keys(groupedMembers).forEach(batch => {
  groupedMembers[batch].sort((a, b) => a.name.localeCompare(b.name));
});

export function TeamFamilyTree() {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-16 space-y-16">
      
      {/* Hierarchy Flow */}
      <div className="w-full max-w-6xl mx-auto flex flex-col space-y-16 relative before:absolute before:inset-0 before:ml-auto before:mr-auto before:w-0.5 before:bg-primary/20 before:-z-10 before:top-8 before:bottom-8">
        
        {batchOrder.map((batch) => {
          const members = groupedMembers[batch];
          if (!members || members.length === 0) return null;
          
          return (
            <div key={batch} className="flex flex-col items-center group">
              {/* Batch Label / Connector Node */}
              <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold text-lg sm:text-xl shadow-lg mb-8 relative z-10">
                {batchLabels[batch] || batch}
              </div>
              
              {/* Members Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 bg-card/50 backdrop-blur border shadow-xl p-8 rounded-2xl relative z-10 w-full">
                {members.map((member) => (
                  <div key={member.name} className="flex flex-col items-center text-center space-y-3">
                    {/* Passport Photo Styling */}
                    <div className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 rounded-md overflow-hidden shadow-md border-2 border-primary/10 relative transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:border-primary/40 bg-muted">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base leading-tight">{member.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}
