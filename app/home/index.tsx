import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { Stack } from "expo-router";
import SeverityCircle from "@/components/SeverityCircle";
import { useNavigation } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import supabase from "@/utils/supabase";
import { setShouldAnimateExitingForTag } from "react-native-reanimated/lib/typescript/reanimated2/core";

const home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [phone, setPhone] = useState("");
  const [blood, setBlood] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const handlePhone = (input) => {
    setPhone(input);
  };
  const handleDob = (text) => {
    setDob(text);
  };

  const handleBlood = (input) => {
    setBlood(input);
  };

  const handleGender = (input) => {
    setGender(input);
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("patients")
        .select("unique_id, name, last_severity_score")
        .order("last_severity_score", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const handleTextChange = (input) => {
    setText(input);
  };

  const handleSubmit = async () => {
    try {
      console.log(text, phone, blood, dob, gender);
      const { data, error } = await supabase
        .from("patients")
        .insert([
          {
            name: text,
            latitude: 12.971466,
            longitude: 80.042909,
            phone_number: phone,
            blood_group: blood,
            dob: dob,
            gender: gender,
            last_severity_score: 1,
            last_summary: "New Patient",
          },
        ]);
      console.log(data, error);
      setTimeout(() => {
        fetchData();
      }, 2000);
      setShowModal(false);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View className="flex flex-col">
            <View className="h-[50vh] bg-black flex justify-center items-center">
              <View className="bg-white p-10 rounded-full"></View>
              <Text className="text-white font-medium text-[20px] font-poppins pt-2">
                Dr. Ravi
              </Text>
              <Text className="text-white font-regular text-[12px] font-poppins pt-2">
                General Surgeon
              </Text>
              <Text className="text-white font-bold text-[14px] font-poppins pt-2">
                Wizzer's Hospital
              </Text>
            </View>
            <View className="absolute ml-[15%] z-10 inset-x-0 top-1/2 transform -translate-y-1/2 pl-2 pr-2 flex justify-evenly items-center flex-row h-20 w-[70%] bg-white rounded-[20px] shadow-lg shadow-black-500/50">
              <View className="flex justify-start items-start flex-col">
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <Text>Add Patient</Text>
                </TouchableOpacity>
              </View>
              <View className="w-2 h-[95%] bg-[#F5F5F5]">
                <Text></Text>
              </View>
              <View className="flex justify-start items-start flex-col pr-5">
                <Text className="font-medium text-[20px] ">{data.length}</Text>
                <Text className="text-[#A39E9E] font-normal text-[14px]">
                  Patients
                </Text>
              </View>
            </View>

            <View className="h-[50vh] bg-white flex justify-start gap-1 flex-col items-center pt-[15%]">
              {data.map((item) => (
                <View className="">
                  <TouchableOpacity
                    className="w-[90vw] bg-white rounded-lg flex flex-row justify-between items-center shadow-lg shadow-black-500 py-3 px-2"
                    onPress={() =>
                      navigation.navigate("patient", { id: item.unique_id })
                    }
                  >
                    <View className="flex justify-center flex-row gap-2 items-center">
                      <Image
                        source={{
                          uri: "https://rjhiucwgtqbfccdwscfa.supabase.co/storage/v1/object/public/assets/user.png",
                        }}
                        className="h-[40px] w-[40px]"
                      />
                      <Text className="font-medium text-[16px]">
                        {item.name}
                      </Text>
                    </View>
                    <View className="flex justify-center items-center">
                      <SeverityCircle
                        value={
                          item.last_severity_score
                            ? item.last_severity_score
                            : 0
                        }
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
              <View className="">
                <TouchableOpacity
                  className="w-[90vw] bg-white rounded-lg flex flex-row justify-between items-center shadow-lg shadow-black-500 py-3 px-2"
                  onPress={() =>
                    navigation.navigate("patient", { id: "item.unique_id" })
                  } // Navigate to the "patient" screen
                >
                  <View className="flex justify-center flex-row gap-2 items-center">
                    <Image
                      source={{
                        uri: "https://rjhiucwgtqbfccdwscfa.supabase.co/storage/v1/object/public/assets/user.png",
                      }}
                      className="h-[40px] w-[40px]"
                    />
                    <Text className="font-medium text-[16px]">
                      {"item.name"}
                    </Text>
                  </View>
                  <View className="flex justify-center items-center">
                    <SeverityCircle value={10} />
                  </View>
                </TouchableOpacity>
              </View>
              <View className="">
                <TouchableOpacity
                  className="w-[90vw] bg-white rounded-lg flex flex-row justify-between items-center shadow-lg shadow-black-500 py-3 px-2"
                  onPress={() =>
                    navigation.navigate("patient", { id: "item.unique_id" })
                  } // Navigate to the "patient" screen
                >
                  <View className="flex justify-center flex-row gap-2 items-center">
                    <Image
                      source={{
                        uri: "https://rjhiucwgtqbfccdwscfa.supabase.co/storage/v1/object/public/assets/user.png",
                      }}
                      className="h-[40px] w-[40px]"
                    />
                    <Text className="font-medium text-[16px]">
                      {"item.name"}
                    </Text>
                  </View>
                  <View className="flex justify-center items-center">
                    <SeverityCircle value={90} />
                  </View>
                </TouchableOpacity>
              </View>

              {/* <View className="">
                    <TouchableOpacity
                        className="w-[90vw] bg-white rounded-lg flex flex-row justify-between items-center shadow-lg shadow-black-500 py-3 px-2"
                        onPress={() => navigation.navigate('patient', {name : "Haseen Mathar Y"})} // Navigate to the "patient" screen
                    >
                        <View className="flex justify-center flex-row gap-2 items-center">
                        <Image
                            source={{
                            uri: 'https://rjhiucwgtqbfccdwscfa.supabase.co/storage/v1/object/public/assets/user.png',
                            }}
                            className="h-[40px] w-[40px]"
                        />
                        <Text className="font-medium text-[16px]">Haseen Mathar Y</Text>
                        </View>
                        <View className="flex justify-center items-center">
                        <SeverityCircle value={55} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="">
                    <TouchableOpacity
                        className="w-[90vw] bg-white rounded-lg flex flex-row justify-between items-center shadow-lg shadow-black-500 py-3 px-2"
                        onPress={() => navigation.navigate('patient', {name : "Gokul Krishna R"})} // Navigate to the "patient" screen
                    >
                        <View className="flex justify-center flex-row gap-2 items-center">
                        <Image
                            source={{
                            uri: 'https://rjhiucwgtqbfccdwscfa.supabase.co/storage/v1/object/public/assets/user.png',
                            }}
                            className="h-[40px] w-[40px]"
                        />
                        <Text className="font-medium text-[16px]">Gokul Krishna R</Text>
                        </View>
                        <View className="flex justify-center items-center">
                        <SeverityCircle value={6} />
                        </View>
                    </TouchableOpacity>
                </View>
                
                <View className="">
                    <TouchableOpacity
                        className="w-[90vw] bg-white rounded-lg flex flex-row justify-between items-center shadow-lg shadow-black-500 py-3 px-2"
                        onPress={() => navigation.navigate('patient', {name : "Adam H Dhayfa Umar"})} // Navigate to the "patient" screen
                    >
                        <View className="flex justify-center flex-row gap-2 items-center">
                        <Image
                            source={{
                            uri: 'https://rjhiucwgtqbfccdwscfa.supabase.co/storage/v1/object/public/assets/user.png',
                            }}
                            className="h-[40px] w-[40px]"
                        />
                        <Text className="font-medium text-[16px]">Adam H Dhayfa Umar</Text>
                        </View>
                        <View className="flex justify-center items-center">
                        <SeverityCircle value={60} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="">
                    <TouchableOpacity
                        className="w-[90vw] bg-white rounded-lg flex flex-row justify-between items-center shadow-lg shadow-black-500 py-3 px-2"
                        onPress={() => navigation.navigate('patient', {name : "Nafeela"})} // Navigate to the "patient" screen
                    >
                        <View className="flex justify-center flex-row gap-2 items-center">
                        <Image
                            source={{
                            uri: 'https://rjhiucwgtqbfccdwscfa.supabase.co/storage/v1/object/public/assets/user.png',
                            }}
                            className="h-[40px] w-[40px]"
                        />
                        <Text className="font-medium text-[16px]">Nafeela</Text>
                        </View>
                        <View className="flex justify-center items-center">
                        <SeverityCircle value={60} />
                        </View>
                    </TouchableOpacity>
                </View> */}
            </View>

            <Modal
              visible={showModal}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setShowModal(false)}
            >
              <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 p-6 bg-white rounded-lg items-center">
                  <TextInput
                    className="border-2 border-gray-300 rounded-lg p-2 mb-1 w-full"
                    placeholder="Name"
                    value={text}
                    onChangeText={handleTextChange} // Update the text state as the user types
                  />
                  <TextInput
                    className="border-2 border-gray-300 rounded-lg p-2 mb-1 w-full"
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={handlePhone} // Update the text state as the user types
                  />
                  <TextInput
                    className="border-2 border-gray-300 rounded-lg p-2 mb-1 w-full"
                    placeholder="Blood Group"
                    value={blood}
                    onChangeText={handleBlood} // Update the text state as the user types
                  />
                  <TextInput
                    className="border-2 border-gray-300 rounded-lg p-2 mb-1 w-full"
                    placeholder="DOB (yyyy-mm-dd)"
                    value={dob}
                    onChangeText={handleDob} // Update the text state as the user types
                  />
                  <TextInput
                    className="border-2 border-gray-300 rounded-lg p-2 mb-1 w-full"
                    placeholder="Gender"
                    value={gender}
                    onChangeText={handleGender} // Update the text state as the user types
                  />
                  <TouchableOpacity
                    className="bg-blue-500 py-2 px-6 rounded-lg"
                    onPress={handleSubmit}
                  >
                    <Text className="text-white text-lg">Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default home;
