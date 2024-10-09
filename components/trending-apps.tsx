import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface App {
  id: number;
  name: string;
  upvotes: number;
  category: string;
}

interface TrendingAppsProps {
  apps: App[];
}

export default function TrendingApps({ apps }: TrendingAppsProps) {
  if (!Array.isArray(apps) || apps.length === 0) {
    return <div>No trending apps available.</div>;
  }

  const sortedApps = [...apps].sort((a, b) => b.upvotes - a.upvotes);
  const kingOfTheHill = sortedApps[0];
  const otherTopApps = sortedApps.slice(1, 4);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Trending Apps</h2>
      {kingOfTheHill && (
        <Card className="mb-4">
          <CardContent>
            <h3 className="text-xl font-semibold">{kingOfTheHill.name}</h3>
            <p>Upvotes: {kingOfTheHill.upvotes}</p>
          </CardContent>
        </Card>
      )}
      {otherTopApps.map((app) => (
        <Card key={app.id} className="mb-2">
          <CardContent>
            <h3 className="text-lg font-semibold">{app.name}</h3>
            <p>Upvotes: {app.upvotes}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}