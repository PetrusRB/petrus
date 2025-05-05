import { useCallback, useMemo, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import Card from 'app/components/ui/card';
import { MotiView } from 'moti';
import { memo } from 'react';
import { useIsMobile } from 'app/hooks/useIsMobile';

// Feature data with enhanced descriptions
const features = [
  {
    id: '1',
    title: 'Moderação Avançada',
    description:
      'Controle seu servidor com ferramentas poderosas: banimentos, silenciamentos e avisos personalizáveis.',
    icon: '🛡️',
  },
  {
    id: '2',
    title: 'Música Premium',
    description:
      'Toque playlists do Spotify, YouTube e mais, com áudio cristalino e controles intuitivos.',
    icon: '🎧',
  },
  {
    id: '3',
    title: 'Diversão Garantida',
    description:
      'Envolva sua comunidade com jogos, memes e comandos interativos que todos adoram.',
    icon: '😂',
  },
  {
    id: '4',
    title: 'Automação Inteligente',
    description:
      'Automatize boas-vindas, regras e tarefas repetitivas para um servidor sempre organizado.',
    icon: '🤖',
  },
];

// Feature card component
const FeatureCard = memo(
  ({ item, isLast, isMobile }: { item: typeof features[0]; isLast: boolean; isMobile: boolean }) => (
    <Pressable
      onPress={() => {}}
      style={({ pressed }) => [
        styles.card,
        { width: isMobile ? '100%' : 260 },
        Platform.OS === 'web' ? { transition: 'transform 0.2s, box-shadow 0.2s' } : {},
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
      ]}
      accessible
      accessibilityLabel={`Feature: ${item.title}`}
    >
      <Card style={styles.cardInner}>
        <MotiView
          from={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            scale: {
              type: 'timing',
              duration: 900,
              loop: true
            }
          }}
        >
          <Text style={styles.cardIcon}>{item.icon}</Text>
        </MotiView>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </Card>
      {!isLast && (
        <View style={isMobile ? styles.cardDividerMobile : styles.cardDividerDesktop} />
      )}
    </Pressable>
  )
);

// Features section component
const Features = () => {
  const isMobile = useIsMobile();

  const renderFeature = useCallback(
    (item: typeof features[0], index: number) => (
      <FeatureCard
        key={item.id}
        item={item}
        isLast={index === features.length - 1}
        isMobile={isMobile}
      />
    ),
    [isMobile]
  );

  return (
    <View
      style={[
        styles.featuresContainer,
        { flexDirection: isMobile ? 'column' : 'row', flexWrap: isMobile ? 'nowrap' : 'wrap' },
      ]}
    >
      {features.map((item, index) => renderFeature(item, index))}
    </View>
  );
};

// Styles for Features
const styles = StyleSheet.create({
  featuresContainer: {
    width: '100%',
    maxWidth: 1200, // Max width for desktop
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
    marginRight: 16,
    ...(Platform.OS === 'web' && {
      ':hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  cardInner: {
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    background: 'linear-gradient(145deg, #FFFFFF, #F1F5F9)', // Subtle gradient
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 12,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  cardDividerDesktop: {
    width: 1,
    height: '60%',
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  cardDividerMobile: {
    width: '80%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
    alignSelf: 'center',
  },
});

export default memo(Features);