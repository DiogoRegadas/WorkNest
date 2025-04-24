import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function TestimonialCard({ texto, nome }) {
    return (
      <div className="p-6 border rounded-xl">
        <p className="italic mb-4">“{texto}”</p>
        <span className="font-semibold">{nome}</span>
      </div>
    );
  }