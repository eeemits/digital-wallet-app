import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertCircle, Wallet, ArrowLeft } from 'lucide-react'

export default function AuthErrorPage() {
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
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
            <CardDescription className="text-base">
              Something went wrong during authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground">
              <p>
                The authentication link may have expired or was already used. 
                Please try signing in again or create a new account.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full h-11">
                <Link href="/auth/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to login
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full h-11">
                <Link href="/auth/sign-up">
                  Create new account
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
