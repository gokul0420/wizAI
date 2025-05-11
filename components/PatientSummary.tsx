import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';

const PatientSummary = ({summary}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNavigation = () => {

  }

  const truncatedSummary = summary.length > 150 ? `${summary.substring(0, 150)}...` : summary;

  return (
    <View className="bg-white flex justify-center gap-2 items-center rounded-[20px] w-[80vw] p-4">
      <Text className="font-bold text-[14px]">
        Patient Summary
      </Text>
      <Text onPress={() => setIsModalVisible(true)} className="text-black">
        {truncatedSummary}
      </Text>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-4/5 p-6 bg-white rounded-lg items-center">
            <Text className="font-bold">Summary</Text>
            <Text className="pt-4">{summary}</Text>
            <TouchableOpacity
              className="bg-blue-500 py-2 px-6 rounded-lg mt-4"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-white text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PatientSummary;
