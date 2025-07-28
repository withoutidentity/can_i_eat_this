import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import allergenSymptoms from '@/data/symptoms';
import allergens from '@/data/allergens';

export default function GuideScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAllergens = allergens.filter(allergen => 
    allergen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    allergen.aliases.some(alias => alias.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAllergenPress = (allergenId: string) => {
    router.push(`/symptom/${allergenId}`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return Colors.unsafe;
      case 'medium':
        return Colors.caution;
      case 'low':
        return Colors.safe;
      default:
        return Colors.primary;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Allergy Symptoms</Text>
        <Text style={styles.subtitle}>Learn about symptoms and first aid</Text>
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
          Tap on an allergen to view detailed symptoms and first aid information.
        </Text>
      </View>

      <View style={styles.allergensList}>
        {filteredAllergens.map(allergen => {
          const symptomInfo = allergenSymptoms.find(s => s.allergenId === allergen.id);
          const symptomCount = symptomInfo ? symptomInfo.symptoms.length : 0;
          
          return (
            <Pressable
              key={allergen.id}
              style={styles.allergenCard}
              onPress={() => handleAllergenPress(allergen.id)}
            >
              <View style={styles.allergenHeader}>
                <Text style={styles.allergenName}>{allergen.name}</Text>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(allergen.severity) }]}>
                  <Text style={styles.severityText}>
                    {allergen.severity.charAt(0).toUpperCase() + allergen.severity.slice(1)}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.allergenDescription}>{allergen.description}</Text>
              
              <View style={styles.symptomCount}>
                <AlertCircle size={16} color={Colors.textLight} />
                <Text style={styles.symptomCountText}>
                  {symptomCount} {symptomCount === 1 ? 'symptom' : 'symptoms'}
                </Text>
              </View>
            </Pressable>
          );
        })}
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
  allergenCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  allergenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  allergenName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  allergenDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 12,
  },
  symptomCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symptomCountText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textLight,
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