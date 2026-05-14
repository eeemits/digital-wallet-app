import { Loader2, Sparkles } from 'lucide-react'

export default function AssistantLoading() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] gap-4">
            <div className="size-16 rounded-full gradient-primary flex items-center justify-center">
                <Sparkles className="size-8 text-white" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                <span className="text-sm">Loading Nova...</span>
            </div>
        </div>
    )
}
