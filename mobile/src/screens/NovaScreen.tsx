import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { NovaChatBubble } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useNPCStore } from '@/store/npc.store';
import { getNovaDemoResponse } from '@/api/nova';
import { ASSISTANT_NAME } from '@/constants/app';
import type { NPCMessage } from '@/types';

const suggestedPrompts = [
  "What's my current balance?",
  'Where did I spend the most this week?',
  'Help me save RM500 this month',
  'Summarize my subscriptions',
  'Can I afford a RM800 purchase?',
  'Why was a transaction flagged?',
];

export function NovaScreen() {
  const { palette } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [input, setInput] = useState('');
  const { messages, isTyping, addMessage, setTyping } = useNPCStore();
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        role: 'assistant',
        content: `Hi! I'm ${ASSISTANT_NAME}, your Athris financial companion. Ask me about your balance, spending, savings, or anything money-related.`,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  const send = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: NPCMessage = {
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };
    addMessage(userMsg);
    setInput('');
    setTyping(true);

    try {
      const reply = getNovaDemoResponse(text);
      await new Promise<void>((resolve) => setTimeout(resolve, 600 + Math.random() * 400));
      addMessage({
        role: 'assistant',
        content: reply,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setTyping(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: palette.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <ScreenHeader
        title={ASSISTANT_NAME}
        subtitle="Your financial companion"
        rightAction={
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: palette.primary, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="sparkles" size={20} color={palette.primaryForeground} />
          </View>
        }
      />

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, i) => (
          <NovaChatBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 44 }}>
            <Text style={{ color: palette.mutedForeground, fontSize: 14 }}>{ASSISTANT_NAME} is thinking...</Text>
          </View>
        )}

        {messages.length <= 1 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {suggestedPrompts.map((prompt) => (
              <Pressable
                key={prompt}
                onPress={() => send(prompt)}
                style={{
                  backgroundColor: palette.secondary,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: palette.border,
                }}
              >
                <Text style={{ fontSize: 13, color: palette.foreground }}>{prompt}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          borderTopWidth: 1,
          borderTopColor: palette.border,
          backgroundColor: palette.card,
          gap: 10,
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={`Ask ${ASSISTANT_NAME}...`}
          placeholderTextColor={palette.mutedForeground}
          style={{
            flex: 1,
            backgroundColor: palette.background,
            borderRadius: 24,
            paddingHorizontal: 18,
            paddingVertical: 12,
            fontSize: 16,
            color: palette.foreground,
            borderWidth: 1,
            borderColor: palette.border,
          }}
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
        />
        <Pressable
          onPress={() => send(input)}
          disabled={!input.trim() || isTyping}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: input.trim() ? palette.primary : palette.muted,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="send" size={20} color={input.trim() ? palette.primaryForeground : palette.mutedForeground} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
