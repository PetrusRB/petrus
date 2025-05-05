import { StyleSheet, View } from 'react-native';
import HomeHero from 'app/components/ui/homehero';
import { MotiView } from 'moti';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { type: 'timing', duration: 900 },
          scale: { type: 'timing', duration: 900 }
        }}
        style={styles.content}
        accessible
        accessibilityLabel="Home screen content"
      >
        <HomeHero />
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Matches HomeHero's background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    // Subtle gradient background
    background: 'linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)',
  },
  content: {
    maxWidth: 800, // Wider max-width for larger screens
    width: '100%',
    paddingVertical: 24,
  },
});

export default HomeScreen;