import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowUp, ImageIcon, User } from "lucide-react";
import ThumbnailData from "./ThumbnailData";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ThumbnailGenerator() {
  const [Userinpt, setUserinpt] = useState<string>("");
  const [RefrenceImg, setRefrenceImg] = useState<any>();
  const [FaceImg, setFaceImg] = useState<any>();
  
  const onHandleFileChange = (field: string, e: any) => {};
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
        <div className="flex gap-4 mb-12 items-center">
          {/* Upload Reference Image */}
          <label
            htmlFor="reference-image"
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent dark:bg-gray-800 dark:text-white">
            <ImageIcon className="w-5 h-5" />
            Reference Image
          </label>
          <Input
            type="file"
            id="reference-image"
            className="hidden"
            onChange={(e) => onHandleFileChange("refrence-image", e)}
          />

          {/* Include Face */}
          <label
            htmlFor="reference-image"
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent dark:bg-gray-800 dark:text-white">
            <User className="w-5 h-5" />
            Reference Image
          </label>
          <Input
            type="file"
            id="include-face"
            className="hidden"
            onChange={(e) => onHandleFileChange("face-image", e)}
          />
        </div>

        {/* Previously Generated Thumbnails */}
        <ThumbnailData />
      </div>
    </div>
  );
}
