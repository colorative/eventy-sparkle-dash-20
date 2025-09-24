
import React from "react";
import { Users, Package, Tag } from "lucide-react";

interface EmptyStateProps {
  type: "attendees" | "products" | "services";
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const config = {
    attendees: {
      icon: <Users className="h-6 w-6 text-gray-400" />,
      title: "No attendees found",
      description: "No attendees match your current search criteria. Try adjusting your filters or search terms."
    },
    products: {
      icon: <Package className="h-6 w-6 text-gray-400" />,
      title: "No products found",
      description: "No products match your current search criteria. Try adjusting your filters or search terms."
    },
    services: {
      icon: <Tag className="h-6 w-6 text-gray-400" />,
      title: "No services found",
      description: "No services match your current search criteria. Try adjusting your filters or search terms."
    }
  };

  const { icon, title, description } = config[type];

  return (
    <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
      <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-1 dark:text-white">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">{description}</p>
    </div>
  );
};
