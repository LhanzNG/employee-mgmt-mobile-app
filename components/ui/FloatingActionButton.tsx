import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '@/styles/colors';

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  position?: 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';
  color?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onPress,
  style,
  position = 'bottomRight',
  color = colors.primary[500],
}) => {
  // Get position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'bottomRight':
        return styles.bottomRight;
      case 'bottomLeft':
        return styles.bottomLeft;
      case 'topRight':
        return styles.topRight;
      case 'topLeft':
        return styles.topLeft;
      default:
        return styles.bottomRight;
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        getPositionStyles(),
        { backgroundColor: color },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 24,
    left: 24,
  },
  topRight: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  topLeft: {
    position: 'absolute',
    top: 24,
    left: 24,
  },
});

export default FloatingActionButton;