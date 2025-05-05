import { StyleSheet, Text, View } from 'react-native';
import { MotiView } from 'moti';

// Loading overlay component
const LoadingOverlay = ({ message }: { message: string }) => (
  <MotiView
    style={styles.overlay}
    from={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      scale: {
        type: 'timing',
        duration: 900,
        loop: false
      }
    }}
  >
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  </MotiView>
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#1F2937',
    fontWeight: '600',
  },
});

export {LoadingOverlay}