import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { usePropertyContext } from '../../context/PropertyContext';
import { useRouter } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProperty } from '@/services/propertyService';

const AddPropertyScreen = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    arv: '',
    rehab: '',
    details: ''
  });
  
  const mutation = useMutation({
    mutationFn: addProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      Alert.alert('Success', 'Property added successfully!');
      router.back();
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    }
  });

  const [errors, setErrors] = useState({
    address: '',
    price: '',
    arv: '',
    rehab: ''
  });

  const validateForm = () => {
    const newErrors = {
      address: '',
      price: '',
      arv: '',
      rehab: ''
    };

    let isValid = true;

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
      isValid = false;
    } else if (!/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/.test(formData.price)) {
      newErrors.price = 'Enter a valid price (e.g., $150,000)';
      isValid = false;
    }

    if (!formData.arv.trim()) {
      newErrors.arv = 'ARV is required';
      isValid = false;
    } else if (!/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/.test(formData.arv)) {
      newErrors.arv = 'Enter a valid ARV (e.g., $220,000)';
      isValid = false;
    }

    if (!formData.rehab.trim()) {
      newErrors.rehab = 'Rehab estimate is required';
      isValid = false;
    } else if (!/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/.test(formData.rehab)) {
      newErrors.rehab = 'Enter a valid rehab estimate (e.g., $45,000)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateProfit = (price: string, arv: string) => {
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, ''));
    const arvNum = parseFloat(arv.replace(/[^0-9.]/g, ''));
    const profit = arvNum - priceNum;
    return `$${profit.toLocaleString('en-US')}`;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const profit = calculateProfit(formData.price, formData.arv);
      mutation.mutate({
        address: formData.address,
        price: formData.price,
        arv: formData.arv,
        rehab: formData.rehab,
        profit,
        details: formData.details
      });
    }
  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Add New Property</Text>
      
      <View style={styles.formGroup}>
      <Text style={styles.label}>Property Address*</Text>
      <TextInput
        style={[styles.input, errors.address && styles.inputError]}
        placeholder="123 Main St, City, State"
        value={formData.address}
        onChangeText={(text) => setFormData({...formData, address: text})}
      />
      {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
      </View>

      <View style={styles.formGroup}>
      <Text style={styles.label}>Purchase Price*</Text>
      <TextInput
        style={[styles.input, errors.price && styles.inputError]}
        placeholder="$150,000"
        value={formData.price}
        keyboardType="numeric"
        onChangeText={(text) => {
        const numeric = text.replace(/[^0-9.]/g, '');
        const formatted = numeric
          ? `$${parseFloat(numeric).toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 0})}`
          : '';
        setFormData({...formData, price: formatted});
        }}
      />
      {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
      </View>

      <View style={styles.formGroup}>
      <Text style={styles.label}>After Repair Value (ARV)*</Text>
      <TextInput
        style={[styles.input, errors.arv && styles.inputError]}
        placeholder="$220,000"
        value={formData.arv}
        keyboardType="numeric"
        onChangeText={(text) => {
        const numeric = text.replace(/[^0-9.]/g, '');
        const formatted = numeric
          ? `$${parseFloat(numeric).toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 0})}`
          : '';
        setFormData({...formData, arv: formatted});
        }}
      />
      {errors.arv ? <Text style={styles.errorText}>{errors.arv}</Text> : null}
      </View>

      <View style={styles.formGroup}>
      <Text style={styles.label}>Rehab Estimate*</Text>
      <TextInput
        style={[styles.input, errors.rehab && styles.inputError]}
        placeholder="$45,000"
        value={formData.rehab}
        keyboardType="numeric"
        onChangeText={(text) => {
        const numeric = text.replace(/[^0-9.]/g, '');
        const formatted = numeric
          ? `$${parseFloat(numeric).toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 0})}`
          : '';
        setFormData({...formData, rehab: formatted});
        }}
      />
      {errors.rehab ? <Text style={styles.errorText}>{errors.rehab}</Text> : null}
      </View>
      <View style={styles.formGroup}>
      <Text style={styles.label}>Property Details</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe the property condition and potential..."
        multiline
        numberOfLines={4}
        value={formData.details}
        onChangeText={(text) => setFormData({...formData, details: text})}
      />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Property</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2c3e50',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPropertyScreen;
