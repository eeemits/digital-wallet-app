import { View, Text } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { ASSISTANT_NAME } from '@/constants/app';

type NovaChatBubbleProps = {
  role: 'user' | 'assistant';
  content: string;
};

export function NovaChatBubble({ role, content }: NovaChatBubbleProps) {
  const { palette } = useTheme();
  const isUser = role === 'user';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 12,
        paddingHorizontal: 4,
      }}
    >
      {!isUser && (
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: palette.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            marginTop: 4,
          }}
        >
          <Ionicons name="sparkles" size={16} color={palette.primaryForeground} />
        </View>
      )}
      <View
        style={{
          maxWidth: '78%',
          backgroundColor: isUser ? palette.primary : palette.card,
          borderRadius: 18,
          borderBottomRightRadius: isUser ? 4 : 18,
          borderBottomLeftRadius: isUser ? 18 : 4,
          padding: 14,
          borderWidth: isUser ? 0 : 1,
          borderColor: palette.border,
        }}
      >
        {!isUser && (
          <Text style={{ fontSize: 11, fontWeight: '600', color: palette.primary, marginBottom: 4 }}>
            {ASSISTANT_NAME}
          </Text>
        )}
        <Text
          style={{
            fontSize: 15,
            lineHeight: 22,
            color: isUser ? palette.primaryForeground : palette.foreground,
          }}
        >
          {content.replace(/\*\*/g, '')}
        </Text>
      </View>
    </View>
  );
}
