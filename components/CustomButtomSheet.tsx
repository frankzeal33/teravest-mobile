import React, { forwardRef, ReactElement, useCallback, useEffect, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

interface Props {
    title?: string;
    snapPoints: any;
    enablePenDown?: boolean;
    onDismiss?: () => void;
    children: ReactElement,
    scrollable?: boolean;
}

type Ref = BottomSheetModal

const CustomButtomSheet = forwardRef<Ref, Props>((props, ref) => {

    const [isFullHeight, setIsFullHeight] = useState(false);
    const insets = useSafeAreaInsets();

      // callbacks
      const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        if (props.snapPoints[index] === '100%') {
            setIsFullHeight(true);
          } else {
            setIsFullHeight(false);
          }
      }, [props.snapPoints]);
    
      const renderBackdrop = useCallback(
            (props: any) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={0}
                    appearsOnIndex={1}
                />
            ),
            []
        );

  return (
    <BottomSheetModal
    ref={ref}
    onChange={handleSheetChanges}
    index={1}
    snapPoints={props.snapPoints}
    enablePanDownToClose={props.enablePenDown !== false}
    handleIndicatorStyle={{ display: 'none' }}
    backdropComponent={renderBackdrop}
    onDismiss={props.onDismiss}
    stackBehavior="push"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5
    }}
  >
    {props.scrollable ? (
      <View style={{
        paddingHorizontal: 16,
        paddingBottom: 32,
        paddingTop: isFullHeight ? insets.top : 0,
      }}>
        {props.children}
      </View>
    ) : (
      <BottomSheetView
        style={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          paddingTop: isFullHeight ? insets.top : 0,
        }}
      >
        {props.children}
      </BottomSheetView>
    )}
  </BottomSheetModal>
  
  )
})

export default CustomButtomSheet