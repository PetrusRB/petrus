"use client";

import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import { Pressable, SafeAreaView, View, Animated, Easing, Text } from "react-native";
import { useRouter } from "solito/router";
import { BlurImage } from "./image";
import { Bars3, XMark } from "@nandorojo/heroicons/24/solid";
import DiscordIcon from "../components/ui/icons/discord.icon";
import BotIcon from "app/components/ui/icons/bot.icon";
import WhatIcon from "app/components/ui/icons/what.icon";

// Tipos
type NavItemProps = {
    label: string;
    href: string;
    icon?: React.ReactNode;
    highlight?: boolean;
};

type NavLinkProps = {
    item: NavItemProps;
    mobile?: boolean;
    onPress?: () => void;
    currentPath: string;
};

// Constantes
const NAV_ITEMS: NavItemProps[] = [
    { label: "Invite", href: "/invite", icon: <BotIcon/> },
    { label: "About", href: "/about", icon: <WhatIcon/> },
    { label: "Login", href: "/login", highlight: true, icon: <DiscordIcon/> },
];

// Estilos estáticos
const NAV_LINK_CLASSES = {
    base: "transition-colors rounded-xl flex flex-row items-center justify-center",
    mobile: "py-3 px-4 w-full",
    desktop: "py-2 px-4",
    active: "bg-zinc-700/50",
    inactive: "hover:bg-zinc-800/50 active:bg-zinc-700/30",
    highlightMobile: "bg-indigo-600 active:bg-indigo-700",
    highlightDesktop: "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800",
};

// Função debounce para otimizar eventos de resize
const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// Componente NavLink com memoização
const NavLink: React.FC<NavLinkProps> = memo(({ item, mobile = false, onPress, currentPath }) => {
    const router = useRouter();
    const isActive = currentPath === item.href;

    const handlePress = useCallback(() => {
        router.push(item.href);
        onPress?.();
    }, [router, item.href, onPress]);

    return (
        <Pressable
            onPress={handlePress}
            accessibilityRole="link"
            accessibilityLabel={item.label}
            className={`
        ${NAV_LINK_CLASSES.base}
        ${mobile ? NAV_LINK_CLASSES.mobile : NAV_LINK_CLASSES.desktop}
        ${isActive ? NAV_LINK_CLASSES.active : NAV_LINK_CLASSES.inactive}
        ${item.highlight ? (mobile ? NAV_LINK_CLASSES.highlightMobile : NAV_LINK_CLASSES.highlightDesktop) : ""}
      `}
        >
            {item.icon && <View className="mr-2">{item.icon}</View>}
            <Text className={`${isActive ? "font-medium" : "font-normal"} text-white ${mobile ? "text-base" : ""}`}>
                {item.label}
            </Text>
        </Pressable>
    );
});

// Componente principal da Navbar
const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const menuAnimation = useRef(new Animated.Value(0)).current;
    const backdropAnimation = useRef(new Animated.Value(0)).current;
    const floatAnimation = useRef(new Animated.Value(0)).current;
    const menuRef = useRef<View>(null);
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

    // Animação do menu e flutuação combinadas
    const animateMenu = useCallback(
        (open: boolean) => {
            Animated.parallel([
                Animated.timing(menuAnimation, {
                    toValue: open ? 1 : 0,
                    duration: 300,
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    useNativeDriver: true,
                }),
                Animated.timing(backdropAnimation, {
                    toValue: open ? 1 : 0,
                    duration: 250,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
            ]).start();
        },
        [menuAnimation, backdropAnimation]
    );

    // Toggle menu
    const toggleMenu = useCallback(() => {
        const newState = !isOpen;
        setIsOpen(newState);
        animateMenu(newState);
    }, [isOpen, animateMenu]);

    // Efeito combinado para animação inicial, rota, tecla ESC e resize
    useEffect(() => {
        // Animação de flutuação inicial
        Animated.timing(floatAnimation, {
            toValue: 1,
            duration: 400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();

        if (typeof window === "undefined") return;

        // Fechar menu ao mudar de rota
        const handleRouteChange = () => {
            if (isOpen) {
                setIsOpen(false);
                animateMenu(false);
            }
        };

        // Fechar menu com tecla ESC
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
                animateMenu(false);
            }
        };

        // Fechar menu ao mudar a resolução (breakpoint md: 768px)
        const handleResize = debounce(() => {
            if (isOpen && window.innerWidth >= 768) {
                setIsOpen(false);
                animateMenu(false);
            }
        }, 100);

        window.addEventListener("popstate", handleRouteChange);
        window.addEventListener("keydown", handleEscKey);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("popstate", handleRouteChange);
            window.removeEventListener("keydown", handleEscKey);
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen, animateMenu]);

    // Interpolações de animação
    const backdropOpacity = backdropAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.8],
    });

    const menuTransform = menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-20, 0],
    });

    const menuOpacityScale = menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const floatTransform = floatAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0],
    });

    return (
        <Animated.View
            style={{
                opacity: floatAnimation,
                transform: [{ translateY: floatTransform }, { scale: floatAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }],
                backgroundColor: "#18181b"
            }}
            className="
                absolute top-4 left-0 right-0 mx-auto
                w-11/12 max-w-6xl
                text-sm
                rounded-3xl px-5 py-2
                shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800 border-opacity-50
                z-50
            "
        >
            <SafeAreaView>
                {/* Navbar principal */}
                <View className="flex-row items-center justify-between px-5 py-2 w-full">
                    {/* Logo */}
                    <Pressable
                        onPress={() => router.push("/")}
                        accessibilityRole="link"
                        accessibilityLabel="Home"
                        className="rounded-full p-1 hover:scale-90 hover:border-yellow-600 border-transparent border transition-all active:opacity-75"
                    >
                        <BlurImage blurhash='/round-petrus-50.png' uri="/round-petrus.png" width={60} height={60} />
                    </Pressable>

                    {/* Links de navegação para desktop */}
                    <View className="hidden md:flex flex-row space-x-2">
                        {NAV_ITEMS.map((item) => (
                            <NavLink key={item.href} item={item} currentPath={currentPath} />
                        ))}
                    </View>

                    {/* Botão de menu mobile */}
                    <Pressable
                        onPress={toggleMenu}
                        accessibilityRole="button"
                        accessibilityLabel={isOpen ? "Fechar menu" : "Abrir menu"}
                        className="p-2 rounded-xl active:scale-95 transition-transform md:hidden bg-zinc-800/50 hover:bg-zinc-700/50"
                    >
                        {isOpen ? <XMark color="#fff" width={24} height={24} /> : <Bars3 color="#fff" width={24} height={24} />}
                    </Pressable>
                </View>

                {/* Menu mobile com backdrop */}
                {isOpen && (
                    <>
                        <Animated.View
                            style={{ opacity: backdropOpacity }}
                            className="fixed inset-0 bg-black z-40 h-screen w-screen md:hidden"
                            onTouchEnd={() => {
                                setIsOpen(false);
                                animateMenu(false);
                            }}
                        />
                        <Animated.View
                            ref={menuRef}
                            style={{
                                opacity: menuOpacityScale,
                                transform: [{ translateY: menuTransform }, { scale: menuOpacityScale }],
                            }}
                            className="absolute top-16 z-50 w-64 mx-auto bg-zinc-900/95 backdrop-blur-xl rounded-2xl py-3 px-3 shadow-2xl md:hidden border border-zinc-800"
                        >
                            <View className="flex flex-col items-center w-full space-y-2">
                                {NAV_ITEMS.map((item) => (
                                    <NavLink
                                        key={item.href}
                                        item={item}
                                        mobile
                                        currentPath={currentPath}
                                        onPress={() => {
                                            setIsOpen(false);
                                            animateMenu(false);
                                        }}
                                    />
                                ))}
                            </View>
                        </Animated.View>
                    </>
                )}
            </SafeAreaView>
        </Animated.View>
    );
};

export default memo(Navbar);