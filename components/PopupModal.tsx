import { ReactElement } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Modals({showModal, children}: {showModal: boolean, children: ReactElement}) {

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => !showModal}
      onBackButtonPress={() => !showModal} // Android back button
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
            <View style={{
                width: '85%',
                padding: 20,
                backgroundColor: '#fff',
                borderRadius: 10,
                alignItems: 'center'
            }}>
            {children}
            </View>
        </View>
    </Modal>
  )
}