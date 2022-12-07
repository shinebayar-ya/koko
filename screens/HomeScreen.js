import { View, Text, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-rn'

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();

  return (
    <SafeAreaView>
      {/* Header */}
      <View>
        <TouchableOpacity>
          <Image style={tw('h-10 w-10 rounded-full')} source={{ uri: user.photoURL }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ioniconic name='' size={30} />
        </TouchableOpacity>
      </View>

      {/* End of header */}
      <Text>Hello ! it's HomeScreen</Text>
      <Button 
        title='Go to Chat Screen' 
        onPress={() => navigation.navigate('Chat') }
        />
      <Button title='Logout' onPress={logout} />
    </SafeAreaView>
  )
}

export default HomeScreen