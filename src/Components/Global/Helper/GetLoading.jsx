import { Loader } from 'lucide-react'
import React from 'react'

export default function GetLoading() {
    return <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg"
        onClick={(e) => { e.stopPropagation() }}>
        <Loader className="h-6 w-6 text-[var(--text-primary)] animate-spin" />
    </div>
}
