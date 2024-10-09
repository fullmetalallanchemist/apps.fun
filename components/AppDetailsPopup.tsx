import { Button } from "@/components/ui/button";
import { ArrowUp, Share2, MessageSquare, BookmarkPlus } from "lucide-react";

interface App {
  id: number;
  name: string;
  upvotes: number;
  category: string;
  description?: string;
  logoUrl?: string;
}

interface AppDetailsPopupProps {
  app: App;
  onClose: () => void;
  onUpvote: (appId: number) => void;
  isUpvoted: boolean;
}

export default function AppDetailsPopup({ app, onClose, onUpvote, isUpvoted }: AppDetailsPopupProps) {
  if (!app) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <div className="flex items-start mb-4">
          {app.logoUrl && (
            <img src={app.logoUrl} alt={`${app.name} logo`} className="w-16 h-16 rounded-full mr-4" />
          )}
          <div className="flex-grow">
            <h2 className="text-2xl font-bold">{app.name}</h2>
            <p className="text-gray-600">Create your own anime series</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        
        <div className="mb-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {app.category}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            GitHub
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            Entertainment
          </span>
        </div>
        
        <p className="text-gray-700 mb-4">
          {app.description || "Kōdan is a tool to build your own anime using your mind & your keyboard."}
        </p>
        
        <div className="flex items-center space-x-4 mb-4">
          <Button 
            variant={isUpvoted ? "default" : "outline"}
            size="sm"
            onClick={() => onUpvote(app.id)}
            className="flex items-center"
          >
            <ArrowUp className={`mr-2 h-4 w-4 ${isUpvoted ? 'text-white' : 'text-gray-500'}`} />
            {app.upvotes}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Discuss
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <BookmarkPlus className="mr-2 h-4 w-4" />
            Collect
          </Button>
        </div>
        
        <div className="flex -space-x-2 overflow-hidden">
          {/* Placeholder for user avatars */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="inline-block h-8 w-8 rounded-full bg-gray-300 border-2 border-white"></div>
          ))}
        </div>
      </div>
    </div>
  );
}