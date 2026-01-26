import { Header } from '@/components/header';
import IssueSampleFormat from '@/components/models/issue-sample-format';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const sample_issuetype = [
  { label: 'Waste Management', value: 1, sample_form: "English ဘာသာ Lorem ipsum စာများသည် ယေဘုယျအားဖြင့် pseudo-Latin စကားလုံးများဖြင့် ဖွဲ့စည်းထားခြင်းဖြစ်ပါသည်။ ဒီဇိုင်းများကို နမူနာပြသရန် နှင့် ဒီဇိုင်၏ အရည်အသွေးကို စမ်းစစ်ရန် အတွက် placeholder text အနေဖြင့် ကျယ်ပြန့်စွာ အသုံပြုလျှက်ရှိပါသည်။ စကားလုံးများတွင် အဓိပ္ပာယ် မရှိသည့်အားလျှောစွာ ဖတ်ရှုသူ အနေနဲ့ စာကို ဖတ်ရှုနေစရာ မလိုအပ်ပဲ ဒီဇိုင်းကို ပိုမို အာရုံစိုက်နိုင်ပါသည်။ ဘာသာစကား အသီးသီးတွင် Lorem ipsum များရှိသကဲ့သိုပင် ယခုမှာ မြန်မာ ဘာသာ အတွက် ဖြစ်ပါသည်။ယခု စာမျက်နှာ သည် Lorem ipsum များကို မြန်မာ Version အနေနဲ့ ထုတ်ပေးထားခြင်းဖြစ်ပါသည်။ စာပိုဒ် (၅) ပိုဒ်ပါ၀င်ပြီး စာပိုဒ် တစ်ခုချင်းစီတွင် ၀ါကျ (၅) ခုမှ (၆) အထိပါ၀င်ပါသည်။ စာလုံးတိုင်းတွင် လူသုံးနည်းသော ပါဠိ စာတစ်၀က် နှင့် လူသုံးများသော မြန်မာစာ တစ်၀က် ပါ၀င် ပါသည်။ ပါ၀င်သော ပါဠိစာများသည် ပုံမှန် စာဖတ်သူများ အတွက် ဖတ်ရှုရန် ခက်ခဲသော စာများဖြစ်စေပါသည်။ pseudo-sentence စာများကို generate လုပ်သည့် အဆင့် တစ်ဆင့်စီကို အောက်ပါစာပိုဒ်တွင် ဖော်ပြထားပါသည်။ပါဠိစာအမှန် (၁၂) ကြောင်း နှင့် မြန်မာ စာအမှန် (၁၂) ကြောင်း၏ ဝဏ္ဏ syllable များကို ကျပန်း ရောမွှေ ပါသည်။ အဆိုပါ ကျပန်း ဝဏ္ဏ (၂) လုံး မှ (၆) လုံးအထိကိုစုစည်းပြီး ကျပန်း ပုဒ်စု phrase ကိုရရှိပါသည်။ အဆိုပါ ပုဒ်စု (၃) ခုမှ (၉) ခုကို စုစည်းပြီး ၀ါကျ sentence များကို တည်ဆောက်ပါသည်။ ရလဒ်အနေနှင့် စာအမှန်နှင့် အမြင်တွင်လွန်စွာ ဆင်တူပြီး ဖတ်ရှုရန် မလွယ်သော ၀ါကျများကို ရရှိပါသည်။" },
  { label: 'Water Supply', value: 2, sample_form: "2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam maiores dolor ducimus cum itaque aspernatur vel, fugit architecto doloremque. Iure reiciendis ad esse sed labore. Aperiam hic error est nulla." },
  { label: 'Public Park Maintenance', value: 3, sample_form: "3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam maiores dolor ducimus cum itaque aspernatur vel, fugit architecto doloremque. Iure reiciendis ad esse sed labore. Aperiam hic error est nulla." },
  { label: 'Road & Infrastructure', value: 4, sample_form: "4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam maiores dolor ducimus cum itaque aspernatur vel, fugit architecto doloremque. Iure reiciendis ad esse sed labore. Aperiam hic error est nulla." },
  { label: 'Air & Noise Pollution', value: 5, sample_form: "5 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam maiores dolor ducimus cum itaque aspernatur vel, fugit architecto doloremque. Iure reiciendis ad esse sed labore. Aperiam hic error est nulla." },
  { label: 'Drainage & Flooding', value: 6, sample_form: "6 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam maiores dolor ducimus cum itaque aspernatur vel, fugit architecto doloremque. Iure reiciendis ad esse sed labore. Aperiam hic error est nulla." }
];

function IssueReportScreen() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    location_latitude: '',
    location_longitude: '',
    issue_type_id: 1,
  });
  const [issueSample, setIssueSample] = useState({
    issueType: 'You don',
    sampleFormatText: 'asdfsad',
    visible: false,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const insets = useSafeAreaInsets();

  const theme = Colors.light;
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header headerTitle='Report Issues' />
      <ScrollView style={{ backgroundColor: theme.background }}>
        <View style={[styles.formContainer, {
          marginBottom: 120 + insets.bottom
        }]}>
          <Text style={[styles.title, { color: theme.text }]}>Report an Issue</Text>

          {/* Issue Type */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>တင်ပြချက် အမျိူးအစား</Text>
            <View style={[styles.pickerContainer, {
              backgroundColor: theme.activeIcon,
              borderColor: theme.inActiveIcon,
              shadowColor: theme.shadow
            }]}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={styles.modalContainer}
                itemTextStyle={styles.itemText}
                activeColor="#e8f5e9"
                data={sample_issuetype}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Issue Type"
                value={sample_issuetype[0].label}
                onChange={item => {
                  setFormData({ ...formData, issue_type_id: item.value });
                  setIssueSample({...issueSample, issueType: item.label, sampleFormatText: item.sample_form})
                }}
              />
            </View>
          </View>

          {/* Title */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>အကြောင်းအရာ</Text>
            <TextInput
              placeholder="Enter issue title"
              placeholderTextColor={theme.icon}
              style={[styles.input, {
                backgroundColor: theme.activeIcon,
                borderColor: theme.inActiveIcon,
                color: theme.text
              }]}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={[styles.label, { color: theme.text }]}>တင်ပြချက်</Text>
              <TouchableOpacity onPress={() => setIssueSample((prev) => ({...prev, visible: true}))}>
                <IconSymbol name='info.bubble.fill' color='blue' />
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, styles.textarea, {
                backgroundColor: theme.activeIcon,
                borderColor: theme.inActiveIcon,
                color: theme.text
              }]}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Describe the issue..."
              placeholderTextColor={theme.icon}
              multiline
            />
          </View>

          {/* Location Section */}
          <View style={[styles.locationSection, {
            backgroundColor: theme.tabBarBackground + '10',
            borderColor: theme.inActiveIcon
          }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>ဖြစ်ပွားစဥ် နေရာ</Text>
            <View style={styles.coordinateRow}>
              <View style={styles.coordinateInput}>
                <Text style={[styles.label, { color: theme.text }]}>Latitude</Text>
                <TextInput
                  style={[styles.input, {
                    backgroundColor: theme.activeIcon,
                    borderColor: theme.inActiveIcon,
                    color: theme.text
                  }]}
                  value={formData.location_latitude}
                  onChangeText={(text) => setFormData({ ...formData, location_latitude: text })}
                  placeholder="0.0000"
                  placeholderTextColor={theme.icon}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.coordinateInput}>
                <Text style={[styles.label, { color: theme.text }]}>Longitude</Text>
                <TextInput
                  style={[styles.input, {
                    backgroundColor: theme.activeIcon,
                    borderColor: theme.inActiveIcon,
                    color: theme.text
                  }]}
                  value={formData.location_longitude}
                  onChangeText={(text) => setFormData({ ...formData, location_longitude: text })}
                  placeholder="0.0000"
                  placeholderTextColor={theme.icon}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={[styles.submitButton, {
            backgroundColor: theme.tabBarBackground,
            shadowColor: theme.shadow
          }]}>
            <Text style={[styles.submitButtonText, { color: theme.activeIcon }]}>Submit Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* issue sample */}
      <IssueSampleFormat
        issue_sample={issueSample}
        onClose={() =>
          setIssueSample((prev) => ({ ...prev, visible: false }))
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  textarea: {
    height: 400,
    textAlignVertical: 'top'
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  locationSection: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  coordinateInput: {
    flex: 1
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#93e28e',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#687076',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#11181C',
  },
  modalContainer: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginTop: 4,

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  itemText: {
    fontSize: 16,
    color: '#11181C',
  },
});

export default IssueReportScreen;