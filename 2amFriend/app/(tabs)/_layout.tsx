import { Tabs } from 'expo-router';
import { Dimensions, Image, PixelRatio, View } from 'react-native';

export default function Layout() {
  // Get screen width to scale icon size
  const screenWidth = Dimensions.get('window').width;

  // Calculate icon size based on screen width
  const iconSize = PixelRatio.roundToNearestPixel(screenWidth * 0.06); // ~6% of screen width

  const tabIcon = (name: string) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={{ uri: getIconUrl(name) }}
        style={{
          width: iconSize,
          height: iconSize,
          tintColor: '#FFFFFF',
          resizeMode: 'contain',
        }}
      />
    </View>
  );

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
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          height: 85,
          backgroundColor: '#7C5B9D',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 2,
          color: '#FFFFFF',
        },
        headerShown: false,
        tabBarIcon: () => tabIcon(route.name),
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
