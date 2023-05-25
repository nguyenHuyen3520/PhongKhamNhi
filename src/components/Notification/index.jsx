import { View, Text, useWindowDimensions } from 'react-native'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';

const NotificationPop = () => {
    const { height, width } = useWindowDimensions();
    const notifications = useSelector((state) => state.app.notifications);
    const renderNotification = useMemo(() => {
        if (notifications) {
            return (
                <View style={{ height, width, position: 'absolute', top: 0, right: 0, left: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(127, 127, 127,0.5)' }}>
                    <View style={{ width: width * 0.75, backgroundColor: 'white', padding: 10, borderRadius: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                            <View />
                            <Text style={{ fontWeight: 'bold', fontSize: 17, textAlign: 'center' }}>
                                {notifications?.title?.toUpperCase()}
                            </Text>
                            <View />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ textAlign: 'center' }}>
                                {notifications?.body}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            return null;
        }
    }, [notifications]);
    return renderNotification;
}

export default NotificationPop