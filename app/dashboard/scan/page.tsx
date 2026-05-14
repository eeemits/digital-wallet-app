import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QrCode, Camera, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ScanPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Scan QR</h1>
            <p className="text-muted-foreground">Pay by scanning a QR code</p>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>QR Scanner</CardTitle>
            <CardDescription>Point your camera at a QR code to pay</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-12">
            <div className="size-48 bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed mb-6">
              <div className="text-center">
                <Camera className="size-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Camera Preview</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              QR scanning requires camera access.<br />
              This feature is available in the mobile app.
            </p>
            <div className="flex gap-3">
              <Button>
                <Camera className="size-4 mr-2" />
                Open Camera
              </Button>
              <Button variant="outline">
                <QrCode className="size-4 mr-2" />
                My QR Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
