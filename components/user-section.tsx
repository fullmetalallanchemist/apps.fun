import { User, Crown } from 'lucide-react'

export default function UserSection() {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center">
        <div className="bg-gray-200 rounded-full p-2 mr-4">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <span className="font-semibold">USER</span>
      </div>
      <div className="flex items-center">
        <Crown className="w-6 h-6 text-yellow-500 mr-2" />
        <span className="font-bold text-yellow-500">APP123</span>
        <span className="ml-4 text-gray-600">KING OF THE HILL</span>
      </div>
    </div>
  );
}