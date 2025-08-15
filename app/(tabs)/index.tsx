import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Can I Eat This?</Text>
        <Text style={styles.subtitle}>Scan food products to check for allergens</Text>
      </View>

      {isFirstLaunch ? (
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <AlertCircle size={32} color={Colors.primary} />
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.welcomeText}>
              To get started, please set up your allergy profile so we can help you identify safe foods.
            </Text>
            <Button 
              title="Set Up My Profile" 
              onPress={handleSetupProfile} 
              style={styles.welcomeButton}
              fullWidth
            />
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=500' }} 
            style={styles.welcomeImage}
          />
        </View>
      ) : (
        <>
          <Pressable style={styles.scanButton} onPress={handleScanPress}>
            <View style={styles.scanIconContainer}>
              <Scan size={32} color="#fff" />
            </View>
            <View style={styles.scanTextContainer}>
              <Text style={styles.scanTitle}>Scan a Product</Text>
              <Text style={styles.scanSubtitle}>Check if it's safe for you</Text>
            </View>
          </Pressable>

          <View style={styles.searchButton}>
            <View style={styles.searchIconContainer}>
              <Search size={24} color="#fff" />
            </View>
            <View style={styles.searchTextContainer}>
              <Text style={styles.searchTitle}>Search Products</Text>
              <Text style={styles.searchSubtitle}>Find safe alternatives</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recently Scanned</Text>
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

          <View style={styles.allergenSummary}>
            <Text style={styles.sectionTitle}>Your Allergen Profile</Text>
            {profile.allergens.length > 0 ? (
              <View style={styles.allergenList}>
                <Text style={styles.allergenCount}>
                  You have {profile.allergens.length} allergen{profile.allergens.length !== 1 ? 's' : ''} in your profile
                </Text>
                <Button
                  title="Manage Allergens"
                  onPress={() => router.push('/profile')}
                  variant="outline"
                  size="small"
                  style={styles.manageButton}
                />
              </View>
            ) : (
              <View style={styles.emptyAllergens}>
                <Text style={styles.emptyAllergensText}>
                  You haven't added any allergens to your profile yet.
                </Text>
                <Button
                  title="Add Allergens"
                  onPress={() => router.push('/profile')}
                  variant="primary"
                  size="small"
                  style={styles.addAllergensButton}
                />
              </View>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  welcomeCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  welcomeContent: {
    padding: 24,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  welcomeButton: {
    marginTop: 8,
  },
  welcomeImage: {
    height: 150,
    width: '100%',
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scanIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scanTextContainer: {
    flex: 1,
  },
  scanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  scanSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  searchButton: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  searchTextContainer: {
    flex: 1,
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  searchSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  allergenSummary: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  allergenList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allergenCount: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  manageButton: {
    marginLeft: 8,
  },
  emptyAllergens: {
    alignItems: 'center',
    padding: 16,
  },
  emptyAllergensText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 16,
  },
  addAllergensButton: {
    marginTop: 8,
  },
});