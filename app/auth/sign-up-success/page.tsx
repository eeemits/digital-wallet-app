import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Mail, Wallet, ArrowRight } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">Athris</span>
        </div>

        <Card className="border-0 shadow-xl shadow-black/5 text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription className="text-base">
              We&apos;ve sent you a confirmation link to verify your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground">
              <p>
                Click the link in your email to activate your account and start using Athris. 
                The link will expire in 24 hours.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button asChild className="w-full h-11">
                <Link href="/auth/login">
                  Go to login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive an email?{' '}
                <button className="text-primary font-medium hover:underline">
                  Resend link
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
