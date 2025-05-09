import { View, Text, KeyboardAvoidingView, useWindowDimensions, ScrollView, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { TabView, SceneMap } from 'react-native-tab-view';
import ManagePassword from './securityDetails/ManagePassword'
import ManagePin from './securityDetails/ManagePin'

const SecurityScreen = () => {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

  
    const renderScene = SceneMap({
        first: ManagePassword,
        second: ManagePin,
    });
  
    const routes = [
        { key: 'first', title: 'Manage Password' },
        { key: 'second', title: 'Manage PIN' },
    ];

  // Render the custom tab bar
  const renderTabBar = (props: any) => {
    return (
      <View className="flex-row border-b border-gray-200 mx-4">
        {props.navigationState.routes.map((route: any, i: number) => {
          const isFocused = props.navigationState.index === i;
  
          return (
            <TouchableOpacity
              key={i}
              className={`flex-1 items-center py-2 ${
                isFocused ? 'border-b-4 border-green' : ''
              }`}
              onPress={() => props.jumpTo(route.key)}
            >
              <Text
                className={`text-base ${
                  isFocused ? 'text-green font-rbold' : 'text-gray-500 font-rmedium'
                }`}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-inputBg h-full">
        <View className='px-4'>
            <Header title='Security' showGoBack={true} onpress={() => router.back()}/>
        </View>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{ width: layout.width }}
        />
        <StatusBar backgroundColor="#ffffff" style='dark'/>
    </SafeAreaView>
  )
}

export default SecurityScreen