import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { Search, User, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import allergens from '@/data/allergens';
import AllergenCard from '@/components/AllergenCard';
import { useUserProfile } from '@/context/UserProfileContext';
import EmptyState from '@/components/EmptyState';
import Button from '@/components/Button';

export default function ProfileScreen() {
  const { profile, addAllergen, removeAllergen, updateProfile } = useUserProfile();
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(profile.allergens.length === 0);

  const filteredAllergens = allergens.filter(allergen => 
    allergen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    allergen.aliases.some(alias => alias.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleToggleAllergen = (allergenId: string) => {
    if (profile.allergens.includes(allergenId)) {
      removeAllergen(allergenId);
    } else {
      addAllergen(allergenId);
      if (showOnboarding) {
        setShowOnboarding(false);
      }
    }
  };

  if (showOnboarding) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <EmptyState
          icon={<User size={64} color={Colors.primary} />}
          title="Set Up Your Allergen Profile"
          message="Select the allergens that affect you so we can help identify safe foods. You can update this list anytime."
          action={
            <Button
              title="Get Started"
              onPress={() => setShowOnboarding(false)}
              variant="primary"
              size="large"
            />
          }
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>My Allergens</Text>
        <Text style={styles.subtitle}>Manage your allergen profile</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search allergens..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.textLight}
        />
      </View>

      <View style={styles.infoCard}>
        <AlertCircle size={20} color={Colors.primary} />
        <Text style={styles.infoText}>
          Tap on an allergen to add or remove it from your profile.
        </Text>
      </View>

      <View style={styles.allergensList}>
        {filteredAllergens.map(allergen => (
          <AllergenCard
            key={allergen.id}
            allergen={allergen}
            selected={profile.allergens.includes(allergen.id)}
            onToggle={handleToggleAllergen}
          />
        ))}
        {filteredAllergens.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No allergens found matching "{searchQuery}"</Text>
          </View>
        )}
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: Colors.text,
    fontSize: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(42, 157, 143, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 8,
    color: Colors.text,
    fontSize: 14,
    flex: 1,
  },
  allergensList: {
    marginTop: 8,
  },
  noResults: {
    padding: 24,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
});