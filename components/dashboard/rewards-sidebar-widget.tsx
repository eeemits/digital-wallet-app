import { Sparkles } from 'lucide-react'
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import type { Rewards } from '@/lib/types/database'

export function RewardsSidebarWidget({ rewards }: { rewards: Rewards }) {
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <div className="mx-2 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-3 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="size-4 text-primary" />
                        <span className="text-xs font-medium text-primary capitalize">
                            {rewards.tier} Member
                        </span>
                    </div>
                    <div className="text-lg font-bold text-foreground">
                        {rewards.points_balance.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Reward Points</div>
                </div>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
