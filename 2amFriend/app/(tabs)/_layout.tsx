import { Tabs } from 'expo-router';
import { Image, View } from 'react-native';

export default function Layout() {
  const iconSize = 26;

  const tabIcon = (name: string, focused: boolean) => {
    const tintColor = focused ? '#3399ff' : '#aaa';

    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{ uri: getIconUrl(name) }}
          style={{
            width: iconSize,
            height: iconSize,
            tintColor: tintColor,
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  const getIconUrl = (name: string) => {
    switch (name) {
      case 'find-match':
        return 'https://img.icons8.com/ios-filled/50/like.png'; 
      case 'chat':
        return 'https://img.icons8.com/ios-filled/50/speech-bubble.png';
      case 'notification':
        return 'https://img.icons8.com/ios-filled/50/appointment-reminders--v1.png';
      case 'saved':
        return 'https://img.icons8.com/ios-filled/50/bookmark-ribbon--v1.png';
        case 'profile-detail':
          return 'https://img.icons8.com/ios-filled/50/user-male-circle.png';
      default:
        return 'https://img.icons8.com/ios-filled/50/menu.png';
    }
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#3399ff',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0.5,
          borderTopColor: '#ddd',
          backgroundColor: '#fff',
        },
        headerShown: false,
        tabBarIcon: ({ focused }) => tabIcon(route.name, focused),
      })}
    >
      <Tabs.Screen name="find-match" options={{ title: 'Find' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="notification" options={{ title: 'Alerts' }} />
      <Tabs.Screen name="saved" options={{ title: 'Saved' }} />
      <Tabs.Screen name="profile-detail" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
