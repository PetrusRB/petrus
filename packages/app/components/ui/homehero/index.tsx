import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { BlurImage } from 'app/design/image';
import { SafeAreaView } from 'moti';
import { MotiView } from 'moti';
import Features from '../features';

// Main hero component with bot info and features section
const HomeHero = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Floating bot image */}
        <MotiView
          from={{ translateY: 0 }}
          animate={{ translateY: [-10, 10] }}
          transition={{
            translateY: {
              type: 'timing',
              duration: 2000,
              repeat: -1, // Use -1 instead of Infinity for repeat
              repeatReverse: true
            }
          }}
          style={styles.imageWrapper}
        >
          <Pressable
            style={({ pressed }) => [
              styles.imageContainer,
              Platform.OS === 'web' ? { transition: 'transform 0.3s, box-shadow 0.3s' } : {},
              pressed && { transform: [{ scale: 0.95 }], shadowOpacity: 0.2 },
            ]}
            accessible
            accessibilityLabel="Bot image"
          >
            <BlurImage
              uri="/round-petrus.png" // Replace with actual image path
              blurhash="/round-petrus-50.png" // Replace with actual blurhash
              width={120}
              height={120}
              style={styles.image}
            />
          </Pressable>
        </MotiView>

        {/* Bot title */}
        <Text style={styles.title}>Petrus</Text>

        {/* Bot description */}
        <Text style={styles.subtitle}>
          Seu bot completo para moderação 🛡️, música 🎧 e diversão 😂 no Discord! Organize, anime e proteja seu servidor com comandos rápidos e fáceis. 🚀
        </Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Features section */}
        <Features />
      </View>
    </SafeAreaView>
  );
};

// Styles for HomeHero
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageWrapper: {
    marginBottom: 20,
  },
  imageContainer: {
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      ':hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 0 20px rgba(255, 200, 23, 0.8)',
      },
    }),
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#FFC817',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
    ...(Platform.OS === 'web' && {
      transition: 'color 0.3s, text-shadow 0.3s',
      ':hover': {
        color: '#FFC817',
        textShadow: '0 0 10px rgba(255, 200, 23, 0.8)',
      },
    }),
  },
  subtitle: {
    fontSize: 18,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
});

export default HomeHero;