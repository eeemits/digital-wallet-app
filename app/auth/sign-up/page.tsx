'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Wallet, ArrowRight, CheckCircle2, Gift, Zap, Shield } from 'lucide-react'

export default function SignUpPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Wallet className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">Athris</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-balance">
            Start your financial journey today.
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of users who trust Athris for their everyday transactions.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">RM1,000 Demo Credit</p>
                <p className="text-sm text-white/70">Start exploring immediately</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Instant Setup</p>
                <p className="text-sm text-white/70">Ready in under 2 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Bank-grade Security</p>
                <p className="text-sm text-white/70">Your funds are always safe</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Athris</span>
          </div>

          <Card className="border-0 shadow-xl shadow-black/5">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold">Create account</CardTitle>
              <CardDescription>
                Get started with your free Athris wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Min. 6 characters"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  {error && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                  
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>By signing up, you agree to our Terms of Service and Privacy Policy</span>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-11 text-base font-medium mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Creating account...'
                    ) : (
                      <>
                        Create account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">
                    Already have an account?{' '}
                  </span>
                  <Link
                    href="/auth/login"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
