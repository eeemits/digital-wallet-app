'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { FunctionComponent } from 'react';


interface NavActiveLinkProps {
    href: string
    title: string
    icon: IconName
}

export const NavActiveLink: FunctionComponent<NavActiveLinkProps> = ({ href, title, icon }: NavActiveLinkProps) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <SidebarMenuButton asChild isActive={isActive} tooltip={title}>
            <Link href={href} prefetch={true}>
                <DynamicIcon name={icon} className="size-4" />
                <span>{title}</span>
            </Link>
        </SidebarMenuButton>
    )
}
