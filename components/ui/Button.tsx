import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { colors } from '@/styles/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'right',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  // Get the correct styles based on variant and size
  const getButtonStyles = () => {
    let buttonStyle = [styles.button];
    
    // Add variant styles
    switch (variant) {
      case 'primary':
        buttonStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        buttonStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        buttonStyle.push(styles.outlineButton);
        break;
      case 'text':
        buttonStyle.push(styles.textButton);
        break;
    }
    
    // Add size styles
    switch (size) {
      case 'small':
        buttonStyle.push(styles.smallButton);
        break;
      case 'medium':
        buttonStyle.push(styles.mediumButton);
        break;
      case 'large':
        buttonStyle.push(styles.largeButton);
        break;
    }
    
    // Add full width style if needed
    if (fullWidth) {
      buttonStyle.push(styles.fullWidth);
    }
    
    // Add disabled style if needed
    if (disabled || loading) {
      buttonStyle.push(styles.disabledButton);
    }
    
    return buttonStyle;
  };
  
  const getTextStyles = () => {
    let textStyleArr = [styles.buttonText];
    
    // Add variant-specific text styles
    switch (variant) {
      case 'primary':
        textStyleArr.push(styles.primaryButtonText);
        break;
      case 'secondary':
        textStyleArr.push(styles.secondaryButtonText);
        break;
      case 'outline':
        textStyleArr.push(styles.outlineButtonText);
        break;
      case 'text':
        textStyleArr.push(styles.textButtonText);
        break;
    }
    
    // Add size-specific text styles
    switch (size) {
      case 'small':
        textStyleArr.push(styles.smallButtonText);
        break;
      case 'medium':
        textStyleArr.push(styles.mediumButtonText);
        break;
      case 'large':
        textStyleArr.push(styles.largeButtonText);
        break;
    }
    
    // Add disabled text style if needed
    if (disabled) {
      textStyleArr.push(styles.disabledButtonText);
    }
    
    return textStyleArr;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? colors.primary[500] : colors.white} 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={[getTextStyles(), iconPosition === 'left' ? { marginLeft: 8 } : { marginRight: 8 }, textStyle]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary[500],
  },
  secondaryButton: {
    backgroundColor: colors.secondary[500],
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  fullWidth: {
    width: '100%',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  primaryButtonText: {
    color: colors.white,
  },
  secondaryButtonText: {
    color: colors.white,
  },
  outlineButtonText: {
    color: colors.primary[500],
  },
  textButtonText: {
    color: colors.primary[500],
  },
  smallButtonText: {
    fontSize: 12,
  },
  mediumButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 16,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
});

export default Button;