'use client';

import { CircleSlash2 } from "lucide-react";

export default function Spinner() {
    return (
        <div className="flex justify-center items-center h-16">
            <CircleSlash2 className="w-8 h-8 text-white animate-spin" />
        </div>
    );
}
