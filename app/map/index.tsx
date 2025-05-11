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
  image_links: string; // Summary is always a string, even if empty
}

interface MarkedDates {
  [date: string]: MarkedDate;
}

const map = () => {
  

  return (
    <View className="flex flex-col">
      <Text>
        Map
      </Text>
    </View>
  );
};

export default map;
