import { memo, useEffect } from "react";
import { Text, View } from "react-native";
import { useRouter } from "solito/router";
import useRedirect from "app/hooks/useRedirect"

const Invite = () => {
    const { redirect, renderLoading } = useRedirect();
    useEffect(() => {
        redirect("https://discord.com/oauth2/authorize?client_id=1220409917282713650", "Redirecionando para o link de convite...");
    }, [redirect]);
    return (
        <>
            <View className="flex-1 items-center justify-center p-3">
                {renderLoading}
            </View>
        </>
    )
}

export default memo(Invite);