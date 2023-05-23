import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import theme from '@theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import homeApi from '../../api/homeApi';
const { width: screenWidth } = Dimensions.get('window')

const images = [
  {
    url: require('../../../media/banner.jpg')
  },
  {
    url: require('../../../media/banner2.jpg')
  },
  {
    url: require('../../../media/banner3.jpg')
  },
]

const Home = ({ navigation }) => {
  const patients = useSelector((state) => state.app.patients);
  const [activeSlide, setActiveSlide] = useState(1);
  const [data, setData] = useState(null);
  const getData = async () => {
    const response = await homeApi.getDataHome();
    console.log("response: ", response)
    if (response.success) {
      setData(response.data);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const pagination = useMemo((lenght) => {
    return (
      <Pagination
        dotsLength={lenght}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'white', paddingVertical: 10 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 99,
          marginHorizontal: 0,
          backgroundColor: '#ffcdb7'
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 99,
          marginHorizontal: 0,
          backgroundColor: '#fc692a'
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }, [activeSlide])
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <View style={{ height: 200, width: Dimensions.get("window").width }}>
        <Image source={require('../../../media/banner.jpg')} style={{ height: 200, width: Dimensions.get("window").width }} resizeMode="cover" />
      </View> */}
      <View style={{ ...styles.banner, paddingTop: 20 }}>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={images}
          onSnapToItem={(index) => setActiveSlide(index)}
          renderItem={({ item, index }, parallaxProps) => {
            return (
              <TouchableOpacity key={index} onPress={() => {
                // this.onSelectBanner(data);
              }}>
                <View style={styles.item}>
                  <ParallaxImage
                    source={item?.url}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}

                    {...parallaxProps}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          hasParallaxImages={true}
          loop={true}
          autoplay={true}
          layoutCardOffset={`9`}
        />
        <View>
          <Pagination
            dotsLength={images.length}
            activeDotIndex={activeSlide}
            containerStyle={{ backgroundColor: 'white', paddingVertical: 10 }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 99,
              marginHorizontal: 0,
              backgroundColor: '#ffcdb7'
            }}
            inactiveDotStyle={{
              width: 10,
              height: 10,
              borderRadius: 99,
              marginHorizontal: 0,
              backgroundColor: '#fc692a'
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
        </View>
      </View>
      <View style={{ flex: 1, padding: 15, backgroundColor: "white" }}>
        {
          patients?.length == 0 ? (
            <View style={{
              padding: 15, paddingBottom: 0, borderRadius: 8,
              backgroundColor: theme.defaultColor
              // "#83c14d" 
            }}>
              <View style={{ borderBottomWidth: 1, paddingBottom: 15, borderBottomColor: "white" }}>
                <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
                  Bạn chưa có sổ khám, tạo ngay!
                </Text>
              </View>
              <View style={{ paddingVertical: 10, }}>
                <Text style={{ color: "white", }}>
                  Quyền lợi
                </Text>
                <Text style={{ color: "white", }}>
                  Khám bệnh tại {theme.appName}
                </Text>
              </View>
              <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: "center", }}>

                <Text style={{ color: "white", marginRight: 5 }}>
                  Tạo sổ
                </Text>
                <MaterialIcons name="library-add" style={{ color: "white", fontSize: 22 }} />
              </View>
            </View>
          ) : null
        }
        <View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Dịch vụ
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Booking");
            }}
          >
            <View style={{
              height: 100, borderWidth: 1,
              flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10,
              borderRadius: 12, borderColor: "#e0e0e0"
              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 1,
              // },
              // shadowOpacity: 0.22,
              // shadowRadius: 2.22,

              // elevation: 3,
            }}>

              <View style={{ paddingHorizontal: 10, flexDirection: "row", flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                  <Image source={require('../../../media/icon1.png')} resizeMode='center' style={{ height: 50, width: 50 }} />
                </View>
                <View style={{ paddingVertical: 15, justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Dịch vụ khám bệnh
                  </Text>
                  <Text>
                    Đăng ký lịch khám bệnh
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons name="greater-than" style={{ fontSize: 16 }} />

            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TreatmentHistory")
            }}
          >
            <View style={{
              height: 100, borderWidth: 1,
              flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10,
              borderRadius: 12, marginTop: 20, borderColor: "#e0e0e0"
            }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                  <Image source={require('../../../media/iconMedicine.png')} style={{ height: 50, width: 50 }} resizeMode='center' />
                </View>
                <View style={{ paddingVertical: 15, justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Toa thuốc
                  </Text>
                  <Text>
                    Toa thuốc đã khám trước đó
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons name="greater-than" style={{ fontSize: 16 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Tin tức mới nhất
            </Text>
          </View>
          <View>
            {
              data && data?.posts && data.posts.map((item) => (
                <TouchableOpacity key={item.id}
                  style={{

                  }}
                  onPress={() => {
                    navigation.navigate("PostDetail", { post: item })
                  }}
                >
                  <View style={{
                    alignItems: 'center', flexDirection: 'row', borderWidth: 1,
                    borderColor: "#e0e0e0",
                    borderRadius: 12,
                    padding: 10,
                    marginBottom: 10
                  }}>
                    <Image
                      source={{ uri: item?.image }} style={{ height: 100, width: 100 }}
                    />
                    <View style={{ paddingHorizontal: 10, width: Dimensions.get("window").width - 150, }}>
                      <Text style={{ fontWeight: "bold", fontSize: 16 }} numberOfLines={2}>
                        {item?.title}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    // height: screenWidth - 60,
    height: 150,

    // backgroundColor: 'red'
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
})

export default Home