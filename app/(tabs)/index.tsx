import React, { useState } from 'react';
import { Text, View, ScrollView, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Scan, Search, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import { useUserProfile } from '@/context/UserProfileContext';
import mockProducts from '@/data/mockProducts';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';

export default function HomeScreen() {
  const router = useRouter();
  const { profile, isFirstLaunch } = useUserProfile();
  const [recentlyScanned] = useState(mockProducts.slice(0, 3));

  const handleScanPress = () => {
    router.push('/scanner');
  };

  const handleSetupProfile = () => {
    router.push('/profile');
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold"style={{ color: Colors.text }}>
          Can I Eat This?
        </Text>
        <Text className="text-base" style={{ color: Colors.textLight }}>
          ถ่ายรูปอาหารเพื่อตรวจสอบว่ามีสารก่อภูมิแพ้หรือไม่
        </Text>
      </View>

      {/* First Launch Welcome */}
      {isFirstLaunch ? (
        <View
          className="rounded-2xl overflow-hidden mb-6 shadow"
          style={{ backgroundColor: Colors.card }}
        >
          <View className="p-6 items-center">
            <AlertCircle size={32} color={Colors.primary} />
            <Text
              className="text-2xl font-bold mt-4 mb-2"
              style={{ color: Colors.text }}
            >
              ยินดีต้อนรับ!
            </Text>
            <Text
              className="text-base text-center mb-6"
              style={{ color: Colors.textLight }}
            >
              เริ่มต้นใช้งานโดยตั้งค่าข้อมูลอาการแพ้ของคุณ เพื่อให้เราสามารถช่วยคุณระบุอาหารที่ปลอดภัยสำหรับคุณได้
            </Text>
            <Button
              title="ตั้งค่าโปรไฟล์ของฉัน"
              onPress={handleSetupProfile}
              fullWidth
            />
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=500',
            }}
            className="w-full h-40"
          />
        </View>
      ) : (
        <>
          {/* Scan Button */}
          <Pressable
            className="flex-row rounded-xl p-4 items-center mb-4 shadow"
            style={{ backgroundColor: Colors.primary }}
            onPress={handleScanPress}
          >
            <View className="w-16 h-16 rounded-full justify-center items-center mr-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <Scan size={32} color="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-white mb-1">
                ถ่ายสินค้า
              </Text>
              <Text className="text-sm text-white/80">
                ตรวจสอบว่าปลอดภัยสำหรับคุณหรือไม่
              </Text>
            </View>
          </Pressable>

          {/* Search Button */}
          <View
            className="flex-row rounded-xl p-4 items-center mb-6 shadow"
            style={{ backgroundColor: Colors.secondary }}
          >
            <View
              className="w-12 h-12 rounded-full justify-center items-center mr-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <Search size={24} color="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-white mb-1">
                ค้นหาสินค้า
              </Text>
              <Text className="text-sm text-white/80">
                ค้นหาสินค้าที่ปลอดภัย
              </Text>
            </View>
          </View>

          {/* Recently Scanned */}
          <View className="mb-6">
            <Text
              className="text-lg font-semibold mb-4"
              style={{ color: Colors.text }}
            >
              สินค้าล่าสุด
            </Text>
            {recentlyScanned.length > 0 ? (
              recentlyScanned.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <EmptyState
                icon={<Scan size={48} color={Colors.textLight} />}
                title="No Recent Scans"
                message="Products you scan will appear here for quick access."
                action={
                  <Button
                    title="Scan a Product"
                    onPress={handleScanPress}
                    variant="primary"
                  />
                }
              />
            )}
          </View>

          {/* Allergen Summary */}
          <View
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: Colors.card }}
          >
            <Text
              className="text-lg font-semibold mb-4"
              style={{ color: Colors.text }}
            >
              Your Allergen Profile
            </Text>
            {profile.allergens.length > 0 ? (
              <View className="flex-row justify-between items-center">
                <Text
                  className="text-base flex-1"
                  style={{ color: Colors.text }}
                >
                  You have {profile.allergens.length} allergen
                  {profile.allergens.length !== 1 ? 's' : ''} in your profile
                </Text>
                <Button
                  title="Manage Allergens"
                  onPress={() => router.push('/profile')}
                  variant="outline"
                  size="small"
                />
              </View>
            ) : (
              <View className="items-center p-4">
                <Text
                  className="text-base text-center mb-4"
                  style={{ color: Colors.textLight }}
                >
                  You haven't added any allergens to your profile yet.
                </Text>
                <Button
                  title="Add Allergens"
                  onPress={() => router.push('/profile')}
                  variant="primary"
                  size="small"
                />
              </View>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}
