"use client";
import React from 'react';
import { useLoading } from '@/app/(contexts)/LoadingContext';
import { Lock } from 'lucide-react';

export const Loading = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 space-y-4">
      <Lock className="text-white h-16 w-16" />
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      <p className="text-white text-lg">GateKeeper</p>
    </div>
  );
};
