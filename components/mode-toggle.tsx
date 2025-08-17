"use client"

import { Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    return (
        <Button variant="ghost" size="icon" className="h-9 w-9" disabled>
            <Moon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Dark mode enabled</span>
        </Button>
    )
}
