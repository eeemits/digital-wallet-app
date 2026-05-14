'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Bell,
  Shield,
  Smartphone,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import type { Profile } from '@/lib/types/database'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface SettingsPageProps {
  user: SupabaseUser
  profile: Profile | null
}

export function SettingsPage({ user, profile }: SettingsPageProps) {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')

  const userInitials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email?.[0].toUpperCase() || 'U'

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName, phone })
        .eq('id', user.id)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Profile
          </CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">Change Photo</Button>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="email"
                  value={user.email || ''}
                  disabled
                  className="bg-muted"
                />
                <Badge variant="secondary" className="flex-shrink-0">
                  <CheckCircle2 className="size-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+60 12 345 6789"
              />
            </div>
            <div className="space-y-2">
              <Label>KYC Status</Label>
              <div className="flex items-center gap-2 h-10">
                <Badge 
                  variant={profile?.kyc_status === 'verified' ? 'default' : 'secondary'}
                  className={profile?.kyc_status === 'verified' ? 'bg-success' : ''}
                >
                  {profile?.kyc_status === 'verified' ? (
                    <><CheckCircle2 className="size-3 mr-1" />Verified</>
                  ) : profile?.kyc_status === 'pending' ? (
                    <><AlertCircle className="size-3 mr-1" />Pending</>
                  ) : (
                    'Not Verified'
                  )}
                </Badge>
                {profile?.kyc_status !== 'verified' && (
                  <Button variant="link" size="sm" className="text-primary p-0 h-auto">
                    Verify Now
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Button onClick={handleSaveProfile} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5" />
            Security
          </CardTitle>
          <CardDescription>Keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                <Smartphone className="size-5" />
              </div>
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Enable
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-muted-foreground">Update your password regularly</p>
            </div>
            <Button variant="outline" size="sm">
              Change
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Active Sessions</p>
              <p className="text-sm text-muted-foreground">Manage your logged in devices</p>
            </div>
            <Button variant="outline" size="sm">
              View
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose what updates you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Transaction alerts, promotions</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="size-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Real-time transaction alerts</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-muted-foreground" />
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Security alerts only</p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark theme</p>
              </div>
            </div>
            <Switch checked={isDark} onCheckedChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card className="border-destructive/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-destructive">Sign Out</p>
              <p className="text-sm text-muted-foreground">Sign out of your account</p>
            </div>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="size-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
