'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ArrowLeft,
  Send,
  Sparkles,
  User,
  Wallet,
  TrendingUp,
  PiggyBank,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'

interface NovaAssistantProps {
  userId: string
}

const suggestedPrompts = [
  { icon: Wallet, text: "What's my current balance?" },
  { icon: TrendingUp, text: 'Show my spending summary' },
  { icon: PiggyBank, text: 'Give me some savings tips' },
]

export function NovaAssistant({ userId }: NovaAssistantProps) {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: {
          messages,
          id,
          userId,
        },
      }),
    }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  const handleSuggestedPrompt = (text: string) => {
    if (isLoading) return
    sendMessage({ text })
  }

  const getMessageText = (message: typeof messages[0]) => {
    return message.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('') || ''
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b bg-card">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Avatar className="size-10 bg-gradient-to-br from-primary to-accent">
            <AvatarFallback className="bg-transparent text-white">
              <Sparkles className="size-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-foreground">Nova</h1>
            <p className="text-xs text-muted-foreground">Your AI Financial Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="size-20 rounded-full gradient-primary flex items-center justify-center">
                  <Sparkles className="size-10 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">Hi, I&apos;m Nova!</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                I&apos;m your personal financial assistant. Ask me anything about your finances, 
                spending patterns, or get personalized tips to save more.
              </p>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-3">Try asking me:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedPrompt(prompt.text)}
                      className="gap-2"
                    >
                      <prompt.icon className="size-4" />
                      {prompt.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="size-8 flex-shrink-0 bg-gradient-to-br from-primary to-accent">
                    <AvatarFallback className="bg-transparent text-white text-xs">
                      <Sparkles className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <Card
                  className={`max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground border-0'
                      : 'bg-card'
                  }`}
                >
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-wrap">{getMessageText(message)}</p>
                  </CardContent>
                </Card>
                {message.role === 'user' && (
                  <Avatar className="size-8 flex-shrink-0">
                    <AvatarFallback className="bg-muted">
                      <User className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
          
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3 justify-start">
              <Avatar className="size-8 flex-shrink-0 bg-gradient-to-br from-primary to-accent">
                <AvatarFallback className="bg-transparent text-white text-xs">
                  <Sparkles className="size-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-card">
                <CardContent className="p-3 flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Nova is thinking...</span>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-card p-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Nova anything about your finances..."
              disabled={isLoading}
              className="h-11"
            />
            <Button type="submit" size="icon" className="h-11 w-11" disabled={!input.trim() || isLoading}>
              <Send className="size-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
