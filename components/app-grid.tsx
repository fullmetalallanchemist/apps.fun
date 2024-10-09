'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface App {
  id: number;
  name: string;
  upvotes: number;
  category: string;
}

interface AppGridProps {
  apps: App[];
  category: string;
  onAppClick: (app: App) => void;
  onUpvote: (appId: number) => void;
  isUpvoted: (appId: number) => boolean;
}

const AppGrid: React.FC<AppGridProps> = ({ apps, category, onAppClick, onUpvote, isUpvoted }) => {
  const filteredApps = category === 'All' ? apps : apps.filter(app => app.category === category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredApps.map(app => (
        <Card key={app.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{app.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Category: {app.category}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center mt-auto">
            <Button
              variant={isUpvoted(app.id) ? "default" : "outline"}
              size="sm"
              onClick={() => onUpvote(app.id)}
              className="flex items-center"
            >
              <ArrowUp className={`mr-2 h-4 w-4 ${isUpvoted(app.id) ? 'text-white' : 'text-gray-500'}`} />
              {app.upvotes}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAppClick(app)}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AppGrid;