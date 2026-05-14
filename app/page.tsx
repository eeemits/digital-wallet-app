import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Wallet, 
  Shield, 
  Zap, 
  Gift, 
  ArrowRight, 
  CreditCard, 
  Smartphone,
  Globe,
  Star,
  CheckCircle2
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Athris</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Trusted by 100,000+ users
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Your money, 
              <span className="text-primary"> reimagined</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty">
              Send, spend, and save with confidence. Athris is the all-in-one digital wallet 
              that makes managing your money simple, secure, and rewarding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="/auth/sign-up">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image / Card Preview */}
          <div className="mt-16 relative">
            <div className="max-w-lg mx-auto">
              <div className="relative">
                {/* Main Card */}
                <div className="rounded-3xl gradient-primary p-8 text-white shadow-2xl shadow-primary/25">
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Wallet className="w-6 h-6" />
                        <span className="font-semibold">Athris</span>
                      </div>
                      <p className="text-sm text-white/70">Virtual Card</p>
                    </div>
                    <CreditCard className="w-10 h-10 text-white/30" />
                  </div>
                  <p className="font-mono text-2xl tracking-wider mb-8">
                    4532 •••• •••• 7821
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-white/60 mb-1">CARD HOLDER</p>
                      <p className="font-medium">JOHN DOE</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/60 mb-1">EXPIRES</p>
                      <p className="font-medium">12/28</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-lg border animate-in fade-in slide-in-from-right-5 duration-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment Received</p>
                      <p className="text-xs text-muted-foreground">+RM 250.00</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-lg border animate-in fade-in slide-in-from-left-5 duration-700 delay-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">500 Points Earned!</p>
                      <p className="text-xs text-muted-foreground">Bronze Member</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need in one wallet
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Athris combines powerful features with beautiful design to give you 
              the best digital banking experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Transfers',
                description: 'Send money to anyone, anywhere, in seconds. No waiting, no hassle.',
                color: 'bg-blue-500'
              },
              {
                icon: Shield,
                title: 'Bank-Grade Security',
                description: 'Your money is protected with state-of-the-art encryption and fraud detection.',
                color: 'bg-green-500'
              },
              {
                icon: CreditCard,
                title: 'Virtual Cards',
                description: 'Create unlimited virtual cards for secure online shopping.',
                color: 'bg-purple-500'
              },
              {
                icon: Gift,
                title: 'Rewards Program',
                description: 'Earn points on every transaction and unlock exclusive benefits.',
                color: 'bg-orange-500'
              },
              {
                icon: Smartphone,
                title: 'AI Assistant',
                description: 'Get instant help and financial insights from Nova, your AI assistant.',
                color: 'bg-pink-500'
              },
              {
                icon: Globe,
                title: 'Multi-Currency',
                description: 'Hold and exchange multiple currencies at competitive rates.',
                color: 'bg-cyan-500'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl gradient-primary p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to take control of your finances?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of users who trust Athris for their everyday transactions. 
              Sign up today and get RM1,000 demo credit to explore.
            </p>
            <Button size="lg" variant="secondary" className="h-12 px-8 text-base" asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">Athris</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2024 Athris. All rights reserved. Demo application.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
