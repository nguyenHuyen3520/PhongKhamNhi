import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useWindowDimensions, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import theme from '../../configApp';
import moment from 'moment';
const PostDetail = ({ navigation, route }) => {
    const { post } = route.params;
    const { width } = useWindowDimensions();
    console.log("post: ", post);
    return (
        <View>
            <View style={{ height: 55, backgroundColor: theme.defaultColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Ionicons name="arrow-back" style={{ color: "white", fontSize: 22 }} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
                        Tin tức
                    </Text>
                </View>
                <View />
            </View>
            <ScrollView style={{ padding: 10, }}>
                <Text style={{ fontSize: 16, }}>
                    Tin tức - {moment(post?.created_at).format("DD/MM/YYYY")}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 18, }}>
                    {post?.title}
                </Text>
                <View style={{ marginTop: 10, marginBottom: 100 }}>
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: post?.content }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default PostDetail