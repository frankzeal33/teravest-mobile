import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";



export default function App() {

  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // flag to check if the component is mounted

    const getData = async () => {
      try {
        let accessToken = await SecureStore.getItemAsync("accessToken");
        if (isMounted) {
          setisLoggedIn(!!accessToken);
        }
      } catch (error) {
        console.log("Failed to retrieve access token from secure storage", error);
      } finally {
        if (isMounted) {
          setisLoading(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return null; 
  }

  return (
    <Redirect href={!isLoggedIn ? "/Splash" : "/(tabs)/home"} />
  );
}
