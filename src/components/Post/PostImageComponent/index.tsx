import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
const width = Dimensions.get('window').width;
const PostImageComponent = (props) => {
    const { images } = props;    
    if (images?.length === 0) {
        return (
            <View style={{ width, height: 300 }}>

            </View>
        );
    } else if (images?.length === 1) {
        return (
            <View style={{ width, height: 300 }}>
                <Image style={{ width, height: 300 }} source={{ uri: images[0]?.image_url }} />
            </View>
        )
    } else if (images?.length === 2) {
        return (
            <View style={{ width, height: 300 }}>
                <Image style={{ width, height: 150 }} source={{ uri: images[0]?.image_url }} />
                <Image style={{ width, height: 150 }} source={{ uri: images[1]?.image_url }} />
            </View>
        )
    } else if (images?.length === 3) {
        return (
            <View style={{ width, height: 300 }}>
                <Image style={{ width, height: 150 }} source={{ uri: images[0]?.image_url }} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ padding: 2 }}>
                        <Image style={{ width: (width / 2) - 5, height: 145 }} source={{ uri: images[1]?.image_url }} />
                    </View>
                    <View style={{ padding: 2 }}>
                        <Image style={{ width: (width / 2) - 5, height: 145 }} source={{ uri: images[2]?.image_url }} />
                    </View>
                </View>
            </View>
        )
    } else if (images?.length === 4) {
        return (
            <View style={{ width, height: 300 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ padding: 2 }}>
                        <Image style={{ width: (width / 2) - 5, height: 145 }} source={{ uri: images[0]?.image_url }} />
                    </View>
                    <View style={{ padding: 2 }}>
                        <Image style={{ width: (width / 2) - 5, height: 145 }} source={{ uri: images[1]?.image_url }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ padding: 2 }}>
                        <Image style={{ width: (width / 2) - 5, height: 145 }} source={{ uri: images[2]?.image_url }} />
                    </View>
                    <View style={{ padding: 2 }}>
                        <Image style={{ width: (width / 2) - 5, height: 145 }} source={{ uri: images[3]?.image_url }} />
                    </View>
                </View>
            </View>
        )

    } else {
        return (
            <View style={{ width, height: 300 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: width / 2, height: 150 }} source={{ uri: images[0]?.image_url }} />
                    <Image style={{ width: width / 2, height: 150 }} source={{ uri: images[1]?.image_url }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: width / 2, height: 150 }} source={{ uri: images[2]?.image_url }} />
                    <View style={{ width: width / 2, height: 150, position: 'relative' }}>
                        <Image style={{ width: width / 2, height: 150 }} source={{ uri: images[3]?.image_url }} />
                        <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, opacity: 0.4, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16 }}>
                                {images?.length - 3}+
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

}

export default PostImageComponent