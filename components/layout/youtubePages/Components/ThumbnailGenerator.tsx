import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowUp, ImageIcon, User } from "lucide-react";

export default function ThumbnailGenerator() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Thumbnail Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Turn any video into a click magnet with thumbnails that grab
            attention and drive views. Our AI YouTube Thumbnail maker creates
            professional designs instantly - no design skills needed.
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <div className="relative">
            <Textarea
              placeholder="Enter your youtube video title or description"
              className="min-h-[120px] pr-16 text-base resize-none border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-gray-300 dark:focus:border-gray-500"
            />
            <Button
              size="icon"
              className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-10 h-10">
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Toggle Options */}
        <div className="flex gap-4 mb-12">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent dark:bg-gray-800 dark:text-white">
            <ImageIcon className="w-5 h-5" />
            Reference Image
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent dark:bg-gray-800 dark:text-white">
            <User className="w-5 h-5" />
            Include Face
          </Button>
        </div>

        {/* Previously Generated Thumbnails */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Previously Generated Thumbnails
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {/* Thumbnail 1 */}
            <Card className="overflow-hidden border-0 shadow-sm dark:bg-gray-800">
              <div className="aspect-video bg-gradient-to-r from-red-500 to-orange-500 relative flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-xs font-bold mb-1">TUBEGURUJI</div>
                  <div className="text-lg font-black">AI REACT PROJECTS</div>
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full"></div>
              </div>
            </Card>

            {/* Thumbnail 2 */}
            <Card className="overflow-hidden border-0 shadow-sm dark:bg-gray-800">
              <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-sm font-bold mb-1">AI</div>
                  <div className="text-xs">React Projects</div>
                </div>
                <div className="absolute bottom-2 right-2 text-white text-xs">
                  react
                </div>
              </div>
            </Card>

            {/* Thumbnail 3 */}
            <Card className="overflow-hidden border-0 shadow-sm dark:bg-gray-800">
              <div className="aspect-video bg-gradient-to-r from-yellow-400 to-orange-500 relative flex items-center justify-center">
                <div className="text-black text-center p-4">
                  <div className="text-xs font-bold mb-1">TUBEGURUJI</div>
                  <div className="text-lg font-black">THUMBNAIL DESIGN</div>
                </div>
              </div>
            </Card>

            {/* Thumbnail 4 */}
            <Card className="overflow-hidden border-0 shadow-sm dark:bg-gray-800">
              <div className="aspect-video bg-gradient-to-r from-red-600 to-orange-500 relative flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-sm font-bold mb-1">MASTER</div>
                  <div className="text-xs">THUMBNAIL</div>
                  <div className="text-lg font-black">THE DESIGN</div>
                </div>
                <div className="absolute top-2 right-2 w-12 h-12 bg-white rounded-full"></div>
              </div>
            </Card>

            {/* Thumbnail 5 */}
            <Card className="overflow-hidden border-0 shadow-sm dark:bg-gray-800">
              <div className="aspect-video bg-gradient-to-r from-red-500 to-yellow-400 relative flex items-center justify-center">
                <div className="text-black text-center p-4">
                  <div className="text-xs font-bold mb-1">YOUTUBE</div>
                  <div className="text-lg font-black">AI</div>
                </div>
              </div>
            </Card>

            {/* Thumbnail 6 */}
            <Card className="overflow-hidden border-0 shadow-sm dark:bg-gray-800">
              <div className="aspect-video bg-red-600 relative flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-sm font-bold mb-1">BUILD &</div>
                  <div className="text-lg font-black">DEPLOY</div>
                </div>
              </div>
            </Card>

            {/* Thumbnail 7 */}
            <Card className="overflow-hidden border-0 shadow-sm dark:bg-gray-800">
              <div className="aspect-video bg-teal-600 relative flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-sm font-bold">Build & Deploy</div>
                </div>
              </div>
            </Card>

            {/* Thumbnail 8 */}
            <Card className="overflow-hidden border-0 shadow-sm dark:bg-gray-800">
              <div className="aspect-video bg-gray-700 relative flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-sm font-bold">YouTube Analytics</div>
                </div>
                <div className="absolute top-1 right-1 w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">N</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
