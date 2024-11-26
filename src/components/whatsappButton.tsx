import React from 'react';
import { TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Feather } from "@expo/vector-icons";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber }) => {
  const handlePress = () => {
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Feather name="message-circle" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#25D366', // Cor verde do WhatsApp
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default WhatsAppButton;
