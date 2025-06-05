"use client";

import React from "react";

export default function HelloWorldSection() {
  return (
    <div>
      {/* Full width global container */}
      <div className="min-h-screen w-full bg-background">
        {/* Top component content */}
        <div className="flex h-[24rem] flex-col justify-center text-center font-sans text-2xl text-foreground">
          <p>Hello world!</p>
          <p className="text-lg text-muted-foreground">
            React template by Riku
          </p>
        </div>
      </div>
      {/* Responsive component container */}
      <div className="container">{/* Your components */}</div>
    </div>
  );
}
