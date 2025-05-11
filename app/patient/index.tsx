import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Stack } from "expo-router";
import { useRoute } from "@react-navigation/native";
import CalendarWithDots from "@/components/Calendat";
import PatientSummary from "@/components/PatientSummary";

import supabase from "@/utils/supabase";
import { getFreeDiskStorageAsync } from "expo-file-system";

interface MarkedDate {
  selected: boolean;
  marked: boolean;
  dotColor: string;
  selectedColor: string;
  summary: string;
  image_links: string; 
}

interface MarkedDates {
  [date: string]: MarkedDate;
}

const patient = () => {
  const route = useRoute();
  const { id } = route.params;
  const [patientRecords, setPatientRecords] = useState({
    name: "",
    dob: "",
    blood_group: "",
    phone_number: "",
    latitude: "",
    longitude: "",
    summary: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq("unique_id", id);

        if (error) throw error;

        if (data && data.length > 0) {
          const patient = data[0];
          setPatientRecords({
            name: patient.name,
            dob: patient.dob,
            blood_group: patient.blood_group,
            phone_number: patient.phone_number,
            latitude: patient.latitude,
            longitude: patient.longitude,
            gender: patient.gender,
            photo_url: patient.photo_url,
            summary: patient.last_summary,
          });
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  useEffect(() => {
    console.log(patientRecords);
  }, [patientRecords]);

  // const phoneNumber = "+91 9876543210";
  // const latitude = "13.095297792177373";
  // const longitude = "80.28600825704999";
  const handlePhonePress = () => {
    Linking.openURL(`tel:${patientRecords.phone_number}`);
  };

  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  useEffect(() => {
    const fetchMarkedDates = async () => {
      try {
        const { data, error } = await supabase
          .from("patient_records")
          .select("date, summary, image_links")
          .eq("unique_id", id);

        if (error) {
          console.error("Error fetching data:", error);
          return;
        }
        const formattedDates = {};

        data.forEach((record) => {
          const formattedDate = new Date(record.date)
            .toISOString()
            .split("T")[0];

          formattedDates[formattedDate] = {
            selected: true,
            marked: true,
            dotColor: "blue",
            selectedColor: "blue",
            summary: record.summary || "",
            image_links: record.image_links || "",
          };
        });
        setMarkedDates(formattedDates);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMarkedDates();
  }, [id]);

  const handleLocationPress = () => {
    const url = `https://www.google.com/maps?q=${patientRecords.latitude},${patientRecords.longitude}`;
    Linking.openURL(url);
  };
  const getAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    return age;
  };

  return (
    <View className="flex flex-col">
      <View className="h-[50vh] bg-black flex justify-between pt-20 pb-5 px-10 flex-col items-center">
        <View className="flex justify-between items-center flex-row gap-20">
          <View className="flex justify-center gap-3 items-start flex-col ">
            <Text className="text-white font-normal text-[20px]">
              {patientRecords.name}
            </Text>
            <Text className="text-white font-normal text-[14px]">
              {patientRecords.blood_group}
            </Text>
            <Text className="text-white font-normal text-[14px]">
              {getAge(patientRecords.dob)} Years
            </Text>
            <TouchableOpacity onPress={handlePhonePress}>
              <Text className="text-white font-normal text-[14px]">
                {patientRecords.phone_number}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLocationPress}>
              <Text className="text-white font-normal text-[14px]">
                Location
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex justify-center items-start flex-col ">
            <Image
              source={{
                uri: "https://rjhiucwgtqbfccdwscfa.supabase.co/storage/v1/object/public/assets/user.png",
              }}
              className="h-[100px] w-[100px]"
            />
          </View>
        </View>
        <View>
          <PatientSummary summary={patientRecords.summary} />
        </View>
      </View>

      <View className="h-[50vh] ml-[-10px] bg-white flex justify-center gap-2 flex-col items-center">
        <CalendarWithDots markedDates={markedDates} id={id} />
      </View>
    </View>
  );
};

export default patient;
