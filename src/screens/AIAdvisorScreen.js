import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useInstitutions } from '../hooks/useInstitutions';
import { FALLBACK_INSTITUTIONS } from '../constants/institutionsFallback';
import { ROUTES } from '../config/routes';

const normalizeInstitution = (item) => {
  const minGpa =
    typeof item.minGpa === 'number'
      ? item.minGpa
      : typeof item.min_gpa === 'number'
        ? item.min_gpa
        : typeof item.requiredGpa === 'number'
          ? item.requiredGpa
          : 2.5;
  const reqIelts =
    typeof item.ielts === 'number'
      ? item.ielts
      : typeof item.minIelts === 'number'
        ? item.minIelts
        : typeof item.ielts_required === 'number'
          ? item.ielts_required
          : 6.0;
  const coverImage =
    item.coverImage ||
    item.image ||
    item.cover_image ||
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80';
  const desc =
    item.desc ||
    item.description ||
    `${item.name || 'Institute'} — ${item.programs || 'Programs'} in ${item.country || item.location || ''}.`;
  return {
    ...item,
    minGpa,
    ielts: reqIelts,
    coverImage,
    desc,
    country: item.country || (item.location ? item.location.split(',').pop()?.trim() : '') || '—',
  };
};

const computeMatchPercent = (userGpa, userIelts, inst) => {
  const minGpa = inst.minGpa;
  const req = inst.ielts;
  let score = 72;
  if (userGpa >= minGpa) {
    score += Math.min(14, Math.max(0, (userGpa - minGpa) * 6));
  }
  if (userIelts >= req) {
    score += Math.min(14, Math.max(0, (userIelts - req) * 8));
  }
  return Math.min(99, Math.max(55, Math.round(score)));
};

const parseNumber = (text) => {
  const n = parseFloat(String(text).replace(/,/g, '.').trim());
  return Number.isFinite(n) ? n : NaN;
};

/** Try to read CGPA + IELTS from one message (e.g. "3.2 6.5", "gpa 3.2 ielts 6.5", "CGPA: 3.2, IELTS 6.5") */
const parseGpaAndIeltsFromText = (raw) => {
  const s = String(raw).toLowerCase();
  let gpa = NaN;
  let ielts = NaN;

  const gpaMatch = s.match(/(?:cgpa|gpa)\s*[:=]?\s*(\d+(?:\.\d+)?)/i);
  const ieltsMatch = s.match(/ielts\s*[:=]?\s*(\d+(?:\.\d+)?)/i);
  if (gpaMatch) gpa = parseNumber(gpaMatch[1]);
  if (ieltsMatch) ielts = parseNumber(ieltsMatch[1]);

  if (Number.isFinite(gpa) && Number.isFinite(ielts)) {
    return { gpa, ielts };
  }

  const nums = raw.match(/\d+(?:[.,]\d+)?/g);
  if (nums && nums.length >= 2) {
    const a = parseNumber(nums[0]);
    const b = parseNumber(nums[1]);
    if (a <= 4.5 && b >= 4 && b <= 9 && a >= 0) {
      return { gpa: a, ielts: b };
    }
    if (b <= 4.5 && a >= 4 && a <= 9 && b >= 0) {
      return { gpa: b, ielts: a };
    }
  }

  if (Number.isFinite(gpa) && !Number.isFinite(ielts)) return { gpa, ielts: NaN };
  if (!Number.isFinite(gpa) && Number.isFinite(ielts)) return { gpa: NaN, ielts };
  return { gpa: NaN, ielts: NaN };
};

const wantsNewMatch = (t) => {
  const s = t.toLowerCase();
  if (/\b(find universities again|new match|match again|restart|start over)\b/.test(s)) return true;
  if (/\b(again|another match)\b/.test(s) && /\b(find|match|search|universities?|institutes?)\b/.test(s)) return true;
  return (
    /\b(find|match|search|recommend|suggest)\b/.test(s) &&
    /\b(universities?|institutes?|college|school)\b/.test(s) &&
    /\b(again|new|more|another)\b/.test(s)
  );
};

const isGreeting = (t) => /^(hi|hello|hey|namaste|salam|assalam|good\s+(morning|afternoon|evening))\b/i.test(t.trim());

const isThanks = (t) => /\b(thanks|thank you|shukriya|dhonnobad)\b/i.test(t);

const AIAdvisorScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);
  const { data: institutionsData } = useInstitutions();

  const allInstitutes = useMemo(() => {
    const raw = institutionsData?.institutions;
    const list = Array.isArray(raw) && raw.length ? raw : FALLBACK_INSTITUTIONS;
    return list.map(normalizeInstitution);
  }, [institutionsData]);

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hey 👋 I'm your AI Study Advisor. What do you want to study? You can chat anytime — when you're ready, I'll ask for your CGPA and IELTS to suggest institutes.",
      sender: 'bot',
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  /** level → field of study, cgpa → waiting GPA, ielts → waiting IELTS, free → open conversation */
  const [step, setStep] = useState('level');
  const [userGpa, setUserGpa] = useState(null);

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const addMessage = useCallback((text, sender = 'user') => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        text,
        sender,
        time: new Date(),
      },
    ]);
  }, []);

  const bot = useCallback(
    (text, delay = 400) => {
      setTimeout(() => addMessage(text, 'bot'), delay);
    },
    [addMessage]
  );

  const getMatches = useCallback(
    (gpa, ielts) => {
      const eligible = allInstitutes.filter((u) => gpa >= u.minGpa && ielts >= u.ielts);
      const sorted = [...eligible].sort((a, b) => {
        const ma = computeMatchPercent(gpa, ielts, a);
        const mb = computeMatchPercent(gpa, ielts, b);
        return mb - ma;
      });
      return sorted.map((u) => ({
        ...u,
        match: `${computeMatchPercent(gpa, ielts, u)}%`,
      }));
    },
    [allInstitutes]
  );

  const appendMatchResults = useCallback(
    (gpa, ielts, introDelay = 400) => {
      bot('🔍 Finding best matches...', introDelay);
      setTimeout(() => {
        const matches = getMatches(gpa, ielts);
        setMessages((prev) => [
          ...prev,
          {
            id: `uni-${Date.now()}`,
            sender: 'bot',
            time: new Date(),
            universities: matches,
            noMatch: matches.length === 0,
          },
        ]);
        setTimeout(() => {
          addMessage(
            'Tap a card for details, or keep chatting — send CGPA & IELTS again (e.g. 3.2 6.5), or say “find universities again”.',
            'bot'
          );
        }, 450);
      }, introDelay + 700);
    },
    [bot, getMatches, addMessage]
  );

  const handleFreeMessage = useCallback(
    (trimmed) => {
      if (isGreeting(trimmed)) {
        bot("Hello! 👋 Tell me what you'd like to study, or share your CGPA and IELTS for institute ideas.");
        return;
      }
      if (isThanks(trimmed)) {
        bot("You're welcome! Happy to help anytime — ask more or request another match.");
        return;
      }

      if (wantsNewMatch(trimmed)) {
        setUserGpa(null);
        setStep('cgpa');
        bot("Sure — let's refresh that. What's your CGPA?");
        return;
      }

      const { gpa, ielts } = parseGpaAndIeltsFromText(trimmed);
      if (Number.isFinite(gpa) && Number.isFinite(ielts)) {
        if (gpa < 0 || gpa > 4.5) {
          bot('CGPA looks out of range (use roughly 0–4.5). Try again with something like 3.2 and 6.5.');
          return;
        }
        if (ielts < 0 || ielts > 9) {
          bot('IELTS should be between about 0 and 9. Example: 3.2 and 6.5.');
          return;
        }
        setUserGpa(gpa);
        appendMatchResults(gpa, ielts, 300);
        return;
      }

      if (/\b(how|what|when|where|why|cost|fee|visa|apply|deadline)\b/i.test(trimmed)) {
        bot(
          'Good question! For fees, intakes, and applications, open an institute from your matches or the Institutes tab. You can also send CGPA and IELTS together (e.g. 3.2 and 6.5) for new matches.'
        );
        return;
      }

      bot(
        "I'm listening 🙂 Share what you want to study, ask a question, or send CGPA and IELTS in one line (e.g. 3.2 6.5) for new matches. Say “find universities again” anytime to restart step by step."
      );
    },
    [bot, appendMatchResults]
  );

  const sendMessage = () => {
    if (!input.trim()) return;
    const trimmed = input.trim();
    addMessage(trimmed);
    setInput('');

    if (step === 'free') {
      if (wantsNewMatch(trimmed)) {
        setUserGpa(null);
        setStep('cgpa');
        bot("Let's go step by step again. What's your CGPA?");
        return;
      }
      handleFreeMessage(trimmed);
      return;
    }

    if (step === 'level') {
      bot("Nice 🎓 What's your CGPA?");
      setStep('cgpa');
      return;
    }

    if (step === 'cgpa') {
      const parsed = parseGpaAndIeltsFromText(trimmed);
      if (
        Number.isFinite(parsed.gpa) &&
        Number.isFinite(parsed.ielts) &&
        parsed.gpa >= 0 &&
        parsed.gpa <= 4.5 &&
        parsed.ielts >= 0 &&
        parsed.ielts <= 9
      ) {
        setUserGpa(parsed.gpa);
        appendMatchResults(parsed.gpa, parsed.ielts, 200);
        setStep('free');
        return;
      }
      const gpa = parseNumber(trimmed);
      if (!Number.isFinite(gpa) || gpa < 0 || gpa > 4.5) {
        bot('Please enter a valid CGPA (e.g. 3.2). You can also write both scores like 3.2 6.5.');
        return;
      }
      setUserGpa(gpa);
      bot('Great 📊 IELTS overall band?');
      setStep('ielts');
      return;
    }

    if (step === 'ielts') {
      const ielts = parseNumber(trimmed);
      if (!Number.isFinite(ielts) || ielts < 0 || ielts > 9) {
        bot('Please enter a valid IELTS score (e.g. 6.5), or both at once: 3.2 6.5.');
        return;
      }
      if (userGpa == null || !Number.isFinite(userGpa)) {
        bot("I lost your CGPA — what's your CGPA again?");
        setStep('cgpa');
        return;
      }
      appendMatchResults(userGpa, ielts, 200);
      setStep('free');
    }
  };

  const openDetails = (uni) => {
    navigation.navigate(ROUTES.MAIN.INSTITUTION_DETAILS, { institute: uni });
  };

  const placeholder =
    step === 'level'
      ? 'What do you want to study?'
      : step === 'cgpa'
        ? 'CGPA (e.g. 3.2) — or type 3.2 6.5 together'
        : step === 'ielts'
          ? 'IELTS (e.g. 6.5)'
          : 'Ask anything, or e.g. 3.2 6.5';

  const renderItem = ({ item }) => {
    if (item.universities) {
      if (item.noMatch) {
        return (
          <View style={styles.botBubble}>
            <Text style={styles.botBubbleText}>
              No institutes match your CGPA and IELTS yet. Try different scores or browse the Institutes tab.
            </Text>
            <Text style={[styles.time, { color: '#555', marginTop: 6 }]}>{formatTime(item.time)}</Text>
          </View>
        );
      }
      return (
        <View style={styles.botBubble}>
          {item.universities.map((uni) => (
            <TouchableOpacity
              key={String(uni.id)}
              style={styles.card}
              onPress={() => openDetails(uni)}
              activeOpacity={0.85}
            >
              <Image source={{ uri: uni.coverImage }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.uniName}>{uni.name}</Text>
                <Text style={styles.location}>{uni.country}</Text>
                <Text style={styles.match}>{uni.match} match</Text>
                <Text style={styles.reqHint}>
                  Req. GPA {uni.minGpa} · IELTS {uni.ielts}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return (
      <View style={item.sender === 'user' ? styles.userBubble : styles.botBubble}>
        <Text style={{ color: item.sender === 'user' ? '#fff' : '#111' }}>{item.text}</Text>
        <Text style={[styles.time, { color: item.sender === 'user' ? '#ccc' : '#555' }]}>
          {formatTime(item.time)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top}
      >
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={styles.backBtn}
            >
              <Ionicons name="arrow-back" size={24} color="#111" />
            </TouchableOpacity>
            <View style={styles.headerTitleBlock}>
              <Text style={styles.headerTitle} numberOfLines={1}>
                AI Study Advisor
              </Text>
              <Text style={styles.sub}>Online • Smart Recommendations</Text>
            </View>
          </View>
        </View>

        <View style={styles.todayWrapper}>
          <Text style={styles.todayText}>Today</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 8 + insets.bottom }}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={[styles.inputWrapper, { paddingBottom: 8 + Math.max(insets.bottom, 8) }]}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#7A7A7D"
            value={input}
            onChangeText={setInput}
            style={styles.input}
            multiline
          />

          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 12,
    paddingBottom: 12,

  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    paddingVertical: 4,
    paddingRight: 4,
  },
  headerTitleBlock: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
  },
  sub: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  todayWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  todayText: {
    backgroundColor: '#000',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  botBubble: {
    backgroundColor: '#f0fdf4',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '90%',
  },
  botBubbleText: {
    color: '#111',
    lineHeight: 20,
    fontSize: 15,
  },
  userBubble: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    alignSelf: 'flex-end',
    maxWidth: '90%',
  },
  time: {
    fontSize: 10,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  inputWrapper: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  
  },
  input: {
    flex: 1,
    minHeight: 50,
    maxHeight: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    color: '#111',
  },
  sendBtn: {
    backgroundColor: '#10b981',
    width: 60,
    minHeight: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    padding: 12,
  },
  uniName: {
    fontWeight: '700',
    fontSize: 15,
    color: '#111',
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  match: {
    fontSize: 12,
    color: '#10b981',
    marginTop: 4,
    fontWeight: '600',
  },
  reqHint: {
    fontSize: 11,
    color: '#888',
    marginTop: 6,
  },
});

export default AIAdvisorScreen;
