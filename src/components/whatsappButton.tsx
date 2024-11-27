import React from 'react';
import { TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Feather } from "@expo/vector-icons";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message }) => {
  const handlePress = () => {
    const encodedMessage = encodeURIComponent(message);
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`);
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
    backgroundColor: '#25D366',
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

