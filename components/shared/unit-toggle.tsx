"use client";

import { Button } from "@/components/ui/button";
import { Thermometer, Wind } from "lucide-react";

interface UnitToggleProps {
  className?: string;
  useImperial: boolean;
  onToggle: (value: boolean) => void;
}

export function UnitToggle({ className, useImperial, onToggle }: UnitToggleProps) {
  const toggleUnits = () => {
    onToggle(!useImperial);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleUnits}
      className={`flex items-center gap-2 ${className}`}
      aria-label={`Switch to ${useImperial ? "metric" : "imperial"} units`}
    >
      {useImperial ? (
        <>
          <Thermometer className="h-4 w-4" />
          <span>°F</span>
        </>
      ) : (
        <>
          <Wind className="h-4 w-4" />
          <span>°C</span>
        </>
      )}
    </Button>
  );
}
