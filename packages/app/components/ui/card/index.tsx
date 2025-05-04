import { useRef } from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { cn } from 'app/lib/utils.lib';

type Props = {
  title?: string;
  photoUrl?: string | ImageSourcePropType;
  className?: string;
  style?: ViewStyle;
  haveBadge?: boolean;
  badgeText?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function Card({
  title,
  className,
  style,
  photoUrl,
  haveBadge,
  badgeText,
  description,
  children,
}: Props) {
  const cardRef = useRef<View>(null);

  return (
    <View style={[styles.card, style]}>
      <View ref={cardRef} className={className ? cn(className) : undefined}>
        {photoUrl && (
          <View style={styles.imageContainer}>
            <Image
              source={typeof photoUrl === 'string' ? { uri: photoUrl } : photoUrl}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
        <View style={styles.cardBody}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {haveBadge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badgeText}</Text>
              </View>
            )}
          </View>
          <Text style={styles.description}>{description}</Text>
          {children && <View style={styles.childrenContainer}>{children}</View>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    margin: 16,
    backgroundColor: '#ffffff', // Cor sólida para substituir o gradiente
  },
  imageContainer: {
    width: '100%',
    height: 220,
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
  },
  badge: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 22,
  },
  childrenContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
});
