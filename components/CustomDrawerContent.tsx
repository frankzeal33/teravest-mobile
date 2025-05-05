import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomDrawerContent = (props: any) => {

  const {top, bottom} = useSafeAreaInsets()
    const pathname = usePathname();
  
    useEffect(() => {
      console.log(pathname);
    }, [pathname]);
  
    return (
      <View className="flex-1">
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: 'green', flex: 1}} style={{paddingHorizontal: 0}}>
          <View style={styles.userInfoWrapper}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
              width={80}
              height={80}
              style={styles.userImg}
            />
            <View style={styles.userDetailsWrapper}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john@email.com</Text>
            </View>
          </View>
          
          <View className="bg-white flex-1">
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  name="favorite-outline"
                  size={size}
                  color={pathname == "/favourites" ? "#fff" : "#000"}
                />
              )}
              label={"Favourites"}
              labelStyle={[
                styles.navItemLabel,
                { color: pathname == "/favourites" ? "#fff" : "#000" },
              ]}
              style={{ backgroundColor: pathname == "/favourites" ? "#333" : "#fff" }}
              onPress={() => {
                router.push("/(drawer)/(tabs)/transactions");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons
                  name="settings-outline"
                  size={size}
                  color={pathname == "/settings" ? "#fff" : "#000"}
                />
              )}
              label={"Settings"}
              labelStyle={[
                styles.navItemLabel,
                { color: pathname == "/settings" ? "#fff" : "#000" },
              ]}
              style={{ backgroundColor: pathname == "/settings" ? "#333" : "#fff" }}
              onPress={() => {
                router.push("/(drawer)/(tabs)/investments");
              }}
            />
          </View>
        </DrawerContentScrollView>
        <View style={{marginBottom: bottom + 20}}>
          <Text>Logout</Text>
        </View>
      </View>
    );
  };

export default CustomDrawerContent

  
const styles = StyleSheet.create({
    navItemLabel: {
      fontSize: 18,
    },
    userInfoWrapper: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderBottomColor: "#ccc",
      borderBottomWidth: 1,
      marginBottom: 10,
    },
    userImg: {
      borderRadius: 40,
    },
    userDetailsWrapper: {
      marginTop: 25,
      marginLeft: 10,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    userEmail: {
      fontSize:16,
      fontStyle: 'italic',
      textDecorationLine: 'underline',
    }
  });
  