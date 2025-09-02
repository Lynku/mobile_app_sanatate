import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Switch, ScrollView, Modal } from 'react-native';

type ProfileData = {
  currentWeight: string;
  targetWeight: string;
  height: string;
  age: string;
  sex: 'Male' | 'Female' | 'Other';
  email: string;
};

type AppSettings = {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
};

export function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'profile' | 'weight' | 'settings'>('profile');
  const [profileData, setProfileData] = useState<ProfileData>({
    currentWeight: '75',
    targetWeight: '70',
    height: '180',
    age: '30',
    sex: 'Male',
    email: 'user@example.com',
  });

  const [settings, setSettings] = useState<AppSettings>({
    theme: 'system',
    notificationsEnabled: true,
    dateFormat: 'DD/MM/YYYY',
  });

  const [sexDropdownVisible, setSexDropdownVisible] = useState(false);
  const [dateFormatDropdownVisible, setDateFormatDropdownVisible] = useState(false);

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSettingsChange = (field: keyof AppSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const renderProfileTab = () => (
    <View style={styles.contentContainer}>
      <View style={styles.inputRow}>
        <ThemedText style={styles.label}>Height</ThemedText>
        <TextInput
          style={styles.input}
          value={profileData.height}
          onChangeText={(text) => handleProfileChange('height', text)}
          keyboardType="numeric"
        />
        <ThemedText style={styles.unit}>cm</ThemedText>
      </View>
      <View style={styles.inputRow}>
        <ThemedText style={styles.label}>Age</ThemedText>
        <TextInput
          style={styles.input}
          value={profileData.age}
          onChangeText={(text) => handleProfileChange('age', text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.settingRow}>
        <ThemedText style={styles.label}>Sex</ThemedText>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setSexDropdownVisible(true)}>
          <ThemedText style={styles.dropdownButtonText}>{profileData.sex}</ThemedText>
          <ThemedText style={styles.dropdownButtonArrow}>▼</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.inputRow}>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          value={profileData.email}
          onChangeText={(text) => handleProfileChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
    </View>
  );

  const renderWeightTab = () => (
    <View style={styles.contentContainer}>
      <View style={styles.inputRow}>
        <ThemedText style={styles.label}>Current Weight</ThemedText>
        <TextInput
          style={styles.input}
          value={profileData.currentWeight}
          onChangeText={(text) => handleProfileChange('currentWeight', text)}
          keyboardType="numeric"
        />
        <ThemedText style={styles.unit}>kg</ThemedText>
      </View>
      <View style={styles.inputRow}>
        <ThemedText style={styles.label}>Target Weight</ThemedText>
        <TextInput
          style={styles.input}
          value={profileData.targetWeight}
          onChangeText={(text) => handleProfileChange('targetWeight', text)}
          keyboardType="numeric"
        />
        <ThemedText style={styles.unit}>kg</ThemedText>
      </View>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={styles.contentContainer}>
      <View style={styles.settingRow}>
        <ThemedText style={styles.label}>Theme</ThemedText>
        <View style={styles.segmentedControl}>
          {['light', 'dark', 'system'].map((themeOption) => (
            <TouchableOpacity
              key={themeOption}
              style={[
                styles.segmentedButton,
                settings.theme === themeOption && styles.segmentedButtonActive,
              ]}
              onPress={() => handleSettingsChange('theme', themeOption as AppSettings['theme'])}>
              <ThemedText
                style={
                  settings.theme === themeOption
                    ? styles.segmentedButtonTextActive
                    : styles.segmentedButtonText
                }>
                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.settingRow}>
        <ThemedText style={styles.label}>Enable Notifications</ThemedText>
        <Switch
          value={settings.notificationsEnabled}
          onValueChange={(value) => handleSettingsChange('notificationsEnabled', value)}
        />
      </View>
      <View style={styles.settingRow}>
        <ThemedText style={styles.label}>Date Format</ThemedText>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDateFormatDropdownVisible(true)}>
          <ThemedText style={styles.dropdownButtonText}>{settings.dateFormat}</ThemedText>
          <ThemedText style={styles.dropdownButtonArrow}>▼</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Profile</ThemedText>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}>
          <ThemedText style={activeTab === 'profile' ? styles.activeTabText : styles.tabText}>
            Profile Data
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'weight' && styles.activeTab]}
          onPress={() => setActiveTab('weight')}>
          <ThemedText style={activeTab === 'weight' ? styles.activeTabText : styles.tabText}>
            Weight
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}>
          <ThemedText style={activeTab === 'settings' ? styles.activeTabText : styles.tabText}>
            Settings
          </ThemedText>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {activeTab === 'profile'
          ? renderProfileTab()
          : activeTab === 'weight'
          ? renderWeightTab()
          : renderSettingsTab()}
      </ScrollView>
      <Modal
        transparent={true}
        visible={sexDropdownVisible}
        onRequestClose={() => setSexDropdownVisible(false)}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPressOut={() => setSexDropdownVisible(false)}>
          <ThemedView style={styles.modalContent}>
            {(['Male', 'Female', 'Other'] as const).map(sexOption => (
              <TouchableOpacity
                key={sexOption}
                style={styles.dropdownOption}
                onPress={() => {
                  handleProfileChange('sex', sexOption);
                  setSexDropdownVisible(false);
                }}>
                <ThemedText style={styles.dropdownOptionText}>{sexOption}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </TouchableOpacity>
      </Modal>
      <Modal
        transparent={true}
        visible={dateFormatDropdownVisible}
        onRequestClose={() => setDateFormatDropdownVisible(false)}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPressOut={() => setDateFormatDropdownVisible(false)}>
          <ThemedView style={styles.modalContent}>
            {(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'] as const).map(formatOption => (
              <TouchableOpacity
                key={formatOption}
                style={styles.dropdownOption}
                onPress={() => {
                  handleSettingsChange('dateFormat', formatOption);
                  setDateFormatDropdownVisible(false);
                }}>
                <ThemedText style={styles.dropdownOptionText}>{formatOption}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </TouchableOpacity>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4e9af1',
  },
  tabText: {
    color: '#888',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    // These should be themed for dark mode support
    color: '#000',
    backgroundColor: '#fff',
  },
  unit: {
    marginLeft: 10,
    fontSize: 16,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff', // Should be themed
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 150,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#000', // Should be themed
  },
  dropdownButtonArrow: {
    color: '#888',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 10,
    padding: 10,
    width: '80%',
    maxHeight: '50%',
  },
  dropdownOption: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4e9af1',
    borderRadius: 5,
    overflow: 'hidden',
  },
  segmentedButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  segmentedButtonActive: {
    backgroundColor: '#4e9af1',
  },
  segmentedButtonText: {
    color: '#4e9af1',
  },
  segmentedButtonTextActive: {
    color: '#fff',
  },
});
