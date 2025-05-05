import { View, Text, StyleSheet, Platform, Pressable, TouchableOpacity } from 'react-native';
import { BlurImage } from 'app/design/image';
import { SafeAreaView } from 'moti';
import { MotiView } from 'moti';
import Features from '../features';
import { ArrowRight, Plus } from '@nandorojo/heroicons/24/solid';
import { memo, useCallback } from 'react';
import { useRouter } from 'solito/router';
// Tipos
enum ClickType {
  REDIRECT,
  OTHER
}
type ButtonProps = {
  label: string;
  href?: string;
  clickType: ClickType,
  icon?: React.ReactNode;
  highlight?: boolean;
  mobile?: boolean;
  onPress?: () => void;
  currentPath: string;
};

// Estilos estáticos
const BUTTON_CLASSES = {
  base: "transition-colors rounded-xl bg-[#fdc719] flex flex-row items-center justify-center",
  mobile: "py-3 px-4 w-full",
  desktop: "py-2 px-4",
  active: "bg-zinc-700/50",
  inactive: "hover:bg-zinc-800/50 active:bg-[#fdc719]/30",
  highlightMobile: "bg-indigo-600 active:bg-indigo-700",
  highlightDesktop: "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800",
};

// Base butão.
const Button: React.FC<ButtonProps> = memo(({ icon, href, clickType, label, highlight, mobile = false, onPress, currentPath }) => {
  const router = useRouter();
  const isActive = currentPath === href;

  const handlePress = useCallback(() => {
    clickType === ClickType.REDIRECT ? router.push(href || "") : null;
    onPress?.();
  }, [router, href, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="link"
      accessibilityLabel={label}
      className={`
        ${BUTTON_CLASSES.base}
        ${mobile ? BUTTON_CLASSES.mobile : BUTTON_CLASSES.desktop}
        ${isActive ? BUTTON_CLASSES.active : BUTTON_CLASSES.inactive}
        ${highlight ? (mobile ? BUTTON_CLASSES.highlightMobile : BUTTON_CLASSES.highlightDesktop) : ""}
      `}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text className={`${isActive ? "font-medium" : "font-normal"} text-white ${mobile ? "text-base" : ""}`}>
        {label}
      </Text>
    </Pressable>
  );
});

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
        {/* Buttons Container */}
        <View style={styles.btncontainer}>
          <Button label='Adicionar' icon={<Plus color={'white'} />} currentPath='/' clickType={ClickType.REDIRECT} href={process.env.INVITE_LINK} />
          <Button label='Dashboard' icon={<ArrowRight color={'white'} />} currentPath='/' clickType={ClickType.REDIRECT} href={process.env.INVITE_LINK} />
        </View>

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

  btncontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10, // Add spacing between elements
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