import { Stack, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { COLORS, icons, SIZES } from "../../constants";


const tabs = ["About", "Qualifications", "Responsibilities"];

const Category = () => {
  // const params = useSearchParams();
  const router = useRouter();
  console.log(router.params);
  //console.log(params);


  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);


  const displayTabContent = () => {
    // switch (activeTab) {
    //   case "Qualifications":
    //     return (
    //       <Specifics
    //         title='Qualifications'
    //         points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
    //       />
    //     );

    //   case "About":
    //     return (
    //       <JobAbout info={data[0].job_description ?? "No data provided"} />
    //     );

    //   case "Responsibilities":
    //     return (
    //       <Specifics
    //         title='Responsibilities'
    //         points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
    //       />
    //     );

    //   default:
    //     return null;
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      /> */}

      <>
        {/* <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          */}
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
             

              {displayTabContent()}
            </View>
      
        {/* </ScrollView> */}

        {/* <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} /> */}
      </>
    </SafeAreaView>
  );
};

export default Category;
