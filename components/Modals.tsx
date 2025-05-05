import { ReactElement } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

export default function Modals({showModal, addheight, children}: {showModal: boolean, addheight?: any, children: ReactElement}) {


  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => !showModal}
      onBackButtonPress={() => !showModal} // Android back button
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
        {children}
      </View>
    </Modal>
  )
}