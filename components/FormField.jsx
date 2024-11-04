import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { icons } from "../constants";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className={`border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row ${isFocused ? "border-secondary" : ""}`}>
        <TextInput
          className="flex-1 text-white text-base font-psemibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyehide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
