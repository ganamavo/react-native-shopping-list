import React from 'react'
import { FlatList, KeyboardAvoidingView, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import ListItem, { Separator } from '../components/ListItem';
import AddItem from '../components/AddItem';
// import AsyncStorage from "@react-native-community/async-storage"; 
import { useCurrentList } from '../utils/ListManager';
 
export default ({navigation}) => {
    const {
        list, 
        loading,
        addItem,
        removeItem
    } = useCurrentList()

    
    if (loading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
            >
                <FlatList
                    data={list}
                    renderItem={({ item, index }) => {
                        return <ListItem
                            name={item.name}
                            onFavoritePress={() => alert("TODO: Do something here")}
                            isFavorite={index < 2}
                            onAddedSwipe={() => removeItem(item.id)}
                            onDeleteSwipe={() => removeItem(item.id)}
                            onRowPress={() => {
                                navigation.navigate('ItemDetails', { 
                                    item,
                                })
                            }}
                        />

                    }}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator />}
                    ListHeaderComponent={() => {
                        return <AddItem onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)
                        } />
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
    // return (
    //     <SafeAreaView>
    //         <ScrollView>
    //             {nachos.map((item, index) => {
    //                 return <React.Fragment key={item.id}>
    //                     <ListItem
    //                         name={item.name}
    //                         onFavoritePress={() => alert("TODO: Do something here")}
    //                         isFavorite={index < 2}
    //                     />
    //                     <Separator />
    //                 </React.Fragment>
    //             })}
    //         </ScrollView>
    //     </SafeAreaView>


};