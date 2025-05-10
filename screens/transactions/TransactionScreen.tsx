import { View, Text, KeyboardAvoidingView, useWindowDimensions, ScrollView, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { TabView, SceneMap } from 'react-native-tab-view'
import All from './All'
import Pending from './Pending'
import Completed from './Completed'
import Failed from './Failed'


const TransactionScreen = () => {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

  
    const renderScene = SceneMap({
        first: All,
        second: Pending,
        third: Completed,
        fourth: Failed
    });
  
    const routes = [
        { key: 'first', title: 'All' },
        { key: 'second', title: 'Pending' },
        { key: 'third', title: 'Completed' },
        { key: 'fourth', title: 'Failed' }
    ];

  // Render the custom tab bar
  const renderTabBar = (props: any) => {
    return (
      <View className="flex-row gap-2 mx-4 mt-3">
        {props.navigationState.routes.map((route: any, i: number) => {
          const isFocused = props.navigationState.index === i;
  
          return (
            <TouchableOpacity
              key={i}
              className={`flex-1 items-center py-3 rounded-md ${
                isFocused ? 'bg-green' : 'bg-green/50'
              }`}
              onPress={() => props.jumpTo(route.key)}
            >
              <Text
                className={`text-sm font-rmedium text-white`}
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
    <SafeAreaView className="bg-white h-full">
        <View className='px-4'>
          <Header title='Transactions' showGoBack={true} onpress={() => router.back()}/>
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

export default TransactionScreen