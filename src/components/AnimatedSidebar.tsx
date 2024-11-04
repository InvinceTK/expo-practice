import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedSidebar: React.FC = () => {
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = -width;
  }, [width]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    translateX.value = withTiming(isOpen ? -width : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  const sidebarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <TouchableOpacity 
          className="bg-blue-500 px-4 py-3 rounded-lg m-5"
          onPress={toggleSidebar}
        >
          <Text className="text-white font-bold text-base">
            {isOpen ? 'Close' : 'Open'} Sidebar
          </Text>
        </TouchableOpacity>
        <Text>Debug: Sidebar is {isOpen ? 'open' : 'closed'}</Text>
        <Text>Screen width: {width}px</Text>
      </View>
      <Animated.View 
        className="absolute left-0 top-0 bottom-0 w-4/5 bg-gray-100 p-5 justify-center"
        style={sidebarStyle}
      >
        <Text className="text-lg font-bold">Sidebar Content</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default AnimatedSidebar; 