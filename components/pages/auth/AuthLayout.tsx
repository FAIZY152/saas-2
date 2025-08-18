"use client";

import type React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AuthLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function AuthLayout({ isOpen, onClose, children }: AuthLayoutProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white p-0 overflow-hidden">
        <div className="p-8 space-y-6">
          {/* Logo and Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-semibold text-purple-400">
                TubeViral AI
              </span>
            </div>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
