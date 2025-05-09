import { View, Text, ActivityIndicator, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { router, useLocalSearchParams } from 'expo-router'
import { WebView} from "react-native-webview"
import Header from '@/components/Header'
// import { useDispatch } from 'react-redux'
// import { useToast } from 'react-native-toast-notifications'
// import getWallet from '@/utils/WalletApi'

const { height, width} = Dimensions.get("window")

export default function PaymentGatewayScreen() {

  // const dispatch = useDispatch()
  // const toast = useToast();

  const { paylink } = useLocalSearchParams() as any;

  const [visible, setVisible] = useState(false)

  const webview = useRef<WebView>(null);

  const handleWebViewNavigationStateChange = (newNavState: any) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    console.log("url",url)
    if (!url) return;

    // if(url){
    //   getWallet(dispatch, toast, null)
    // }

    // handle certain doctypes
    if (url.includes('.pdf')) {
      
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
     
      // maybe close this view?
    }

    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      
    }

    // redirect somewhere else
    if (url.includes('google.com')) {
      // const newURL = 'https://reactnative.dev/';
      // const redirectTo = 'window.location = "' + newURL + '"';
      // webview.injectJavaScript(redirectTo);
    }
  };

  const refresh = () => {
    // getWallet(dispatch, toast, 'NGN')
    router.push("/(drawer)/(routes)/Investments")
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='px-4'>
        <Header title="Pay Now" showGoBack={true} onpress={refresh}/>
      </View>

      <WebView
       ref={webview}
        source={{uri: paylink }}
        onLoad={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />

      {
        visible && (
          <ActivityIndicator size="large" color="#003366" style={{position:"absolute", top: height/2, left: width/2}}/>
        )
      }
      <StatusBar backgroundColor="#ffffff" style='dark'/>
    </SafeAreaView>
  )
}