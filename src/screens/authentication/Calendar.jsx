import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import theme from '../../configApp';
const months = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September", "October",
    "November", "December"];
const weekDays = [
    "CN", "T2", "T3", "T4", "T5", "T6", "T7"
];
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { saveSelectedCalendar } from '../../store/appSlice';
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const Calendar = ({ navigation }) => {
    const [activeDate, setActiveDate] = useState(new Date());
    const dispatch = useDispatch();
    console.log("activeDate: ", activeDate);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const generateMatrix = useCallback(() => {
        var matrix = [];
        // The following code creates the header 
        matrix[0] = weekDays;

        var firstDay = new Date(year, month, 1).getDay();
        // The remaining code will go here 
        var maxDays = nDays[month];
        if (month == 1) { // February 
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }
        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month 
                    matrix[row][col] = counter++
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than 
                    // the number of days in the month 
                    matrix[row][col] = counter++
                }
                // if(col = 0){
                //     matrix[row][col] = {
                //         ...matrix[row][col],
                //         display: false,
                //     }
                // }
            }
        }
        return matrix;
    }, [month])

    const _onPress = (item) => {
        setActiveDate((preState) => {
            if (!item?.match && item != -1) {
                preState.setDate(item);
                return preState;
            }
        })
    };

    const matrix = useMemo(() => {
        return generateMatrix();
    }, [month]);

    const renderCalendar = useMemo(() => {
        var rows = [];
        rows = matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(saveSelectedCalendar(moment(`${year}-${month}-${item}`).unix()))
                            navigation.navigate("Booking");
                        }}
                        key={colIndex}
                    // disabled={item < activeDate.getDate() && month <= new Date().getMonth() || !item?.display || colIndex == 0}
                    >
                        <View style={{ height: 45, width: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: rowIndex == 0 ? 'white' : item == -1 ? 'white' : item < activeDate.getDate() && month <= new Date().getMonth() || colIndex == 0 || colIndex == 6 ? '#e0e0e0' : (item == activeDate.getDate() && month == new Date().getMonth() ? theme.defaultColor : '#c6e8ff'), }}>
                            <Text
                                // style={{
                                //     flex: 1,                                                                        
                                //     textAlign: 'center',
                                //     // Highlight header 
                                //     backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
                                //     // Highlight Sundays 
                                //     color: colIndex == 0 ? '#a00' : '#000',
                                //     // Highlight current date 
                                //     fontWeight: item == activeDate.getDate()
                                //         ? 'bold' : ''
                                // }}
                                style={{ color: item == activeDate.getDate() && month == new Date().getMonth() ? "white" : "black" }}
                                onPress={() => _onPress(item)}>
                                {item != -1 ? item : ''}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            });
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                    {rowItems}
                </View>
            );
        });
        return rows;
    }, [activeDate, matrix])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: 55, backgroundColor: theme.defaultColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Ionicons name="arrow-back" style={{ color: "white", fontSize: 22 }} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
                        Chọn ngày khám
                    </Text>
                </View>
                <View />
            </View>
            <View style={{ padding: 20 }}>
                <Text style={{ fontWeight: "bold", }}>
                    Thông tin lịch khám
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 30, width: 30, backgroundColor: theme.defaultColor, marginRight: 5, borderRadius: 5 }} />
                        <Text>
                            Hôm nay
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 30, width: 30, backgroundColor: "#c6e8ff", marginRight: 5, borderRadius: 5 }} />
                        <Text>
                            Còn trống
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 30, width: 30, backgroundColor: "#e0e0e0", marginRight: 5, borderRadius: 5 }} />
                        <Text>
                            Kín lịch
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginHorizontal: 15, paddingHorizontal: 15, height: 50, backgroundColor: theme.defaultColor, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <TouchableOpacity onPress={() => {
                    setMonth(month - 1);
                }}>
                    <Ionicons name="arrow-back" style={{ color: "white", fontSize: 22 }} />
                </TouchableOpacity>

                <Text style={{ color: "white" }}>
                    Tháng {month + 1} - {year}
                </Text>
                <TouchableOpacity onPress={() => {
                    setMonth(month + 1);
                }}>
                    <Ionicons name="arrow-forward" style={{ color: "white", fontSize: 22 }} />
                </TouchableOpacity>
            </View>
            <View style={{ height: 350 }}>
                {renderCalendar}
            </View>
        </View>
    );
}

export default Calendar