'use client';

import { useState, useCallback, useEffect } from 'react';
import TrendingApps from '../components/trending-apps';
import SearchBar from '../components/search-bar';
import CategoryFilter from '../components/category-filter';
import AppDetailsPopup from '../components/AppDetailsPopup';
import dynamic from 'next/dynamic';
import React from 'react';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";

const WalletConnectButton = dynamic(
  () => import('../components/solana/wallet-connect-button').then(mod => mod.WalletConnectButton),
  { ssr: false }
);

// Initial apps data
const initialApps: App[] = [
  { id: 1, name: "pump.fun", upvotes: 320, category: "dotfun" },
  { id: 2, name: "drip.haus", upvotes: 285, category: "art" },
  { id: 3, name: "odysee", upvotes: 410, category: "entertainment" },
  { id: 4, name: "crate.place", upvotes: 195, category: "music" },
  { id: 5, name: "sankogamecorp", upvotes: 150, category: "entertainment" },
  { id: 6, name: "Only1", upvotes: 230, category: "entertainment" },
  { id: 7, name: "dscvr.one", upvotes: 175, category: "social" },
  { id: 8, name: "Warpcast", upvotes: 290, category: "social" },
  { id: 9, name: "0xPPL", upvotes: 340, category: "social" },
  { id: 10, name: "friend.tech", upvotes: 200, category: "social" },
  { id: 11, name: "arena.social", upvotes: 280, category: "social" },
  { id: 12, name: "fantasytop", upvotes: 165, category: "dotfun" },
  { id: 13, name: "worldpvp", upvotes: 210, category: "entertainment" },
  { id: 14, name: "frenpet", upvotes: 375, category: "entertainment" },
  { id: 15, name: "ags.fm", upvotes: 255, category: "social" },
];

interface App {
  id: number;
  name: string;
  upvotes: number;
  category: string;
  description?: string;
  logoUrl?: string;
}

export default function HomeContent() {
  const { isSignedIn, user } = useUser();
  const [apps, setApps] = useState<App[]>(initialApps);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [upvotedApps, setUpvotedApps] = useState<Set<number>>(new Set());

  const handleUpvote = useCallback((appId: number) => {
    setApps(prevApps =>
      prevApps.map(app =>
        app.id === appId ? { ...app, upvotes: app.upvotes + (upvotedApps.has(appId) ? -1 : 1) } : app
      )
    );
    setUpvotedApps(prevUpvoted => {
      const newUpvoted = new Set(prevUpvoted);
      if (newUpvoted.has(appId)) {
        newUpvoted.delete(appId);
      } else {
        newUpvoted.add(appId);
      }
      return newUpvoted;
    });
  }, [upvotedApps]);

  const isUpvoted = useCallback((appId: number) => upvotedApps.has(appId), [upvotedApps]);

  const handleCategoryChange = useCallback((category: string) => {
    console.log('Category changed to:', category);
    setSelectedCategory(category);
  }, []);

  const filteredApps = useCallback(() => {
    if (selectedCategory === 'all') {
      return apps;
    }
    return apps.filter(app => app.category === selectedCategory);
  }, [apps, selectedCategory]);

  // Updated AppGrid component
  const AppGrid = () => {
    const appsToShow = filteredApps();
    console.log('Rendering AppGrid with filteredApps:', appsToShow);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appsToShow.map(app => (
          <div key={app.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{app.name}</h3>
              <button 
                onClick={() => handleUpvote(app.id)}
                className={`flex items-center space-x-1 bg-black text-white px-2 py-1 rounded ${
                  isUpvoted(app.id) ? 'opacity-75' : 'opacity-100'
                }`}
              >
                <span className="text-sm">▲</span>
                <span>{app.upvotes}</span>
              </button>
            </div>
            <p>Category: {app.category}</p>
            <div className="mt-2">
              <button 
                onClick={() => setSelectedApp(app)}
                className="px-3 py-1 rounded bg-blue-500 text-white"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full bg-gray-100 py-2 px-4 flex justify-between items-center">
        <span>Welcome to apps.fun</span>
        <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
          Sign In
        </Link>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Apps.fun</h1>
          <div className="flex space-x-4 items-center">
            <Link href="/sign-up" className="bg-blue-500 text-white px-4 py-2 rounded">
              Sign Up
            </Link>
            <Link href="/sign-in" className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
              Sign In
            </Link>
            <WalletConnectButton />
          </div>
        </div>
        
        <h2 className="text-4xl font-bold mb-8">Bootstrap your network and find your early users</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <SearchBar onSearch={() => {}} />
            <CategoryFilter onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
            <AppGrid />
          </div>
          <div className="w-full md:w-1/4">
            <TrendingApps apps={apps} />
          </div>
        </div>
      </div>

      {selectedApp && (
        <AppDetailsPopup 
          app={selectedApp} 
          onClose={() => setSelectedApp(null)}
          onUpvote={handleUpvote}
          isUpvoted={isUpvoted(selectedApp.id)}
        />
      )}
    </main>
  );
}