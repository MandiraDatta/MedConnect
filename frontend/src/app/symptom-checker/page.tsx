'use client';

import { useState } from 'react';
import { BACKEND_URL } from '@/lib/config';

export default function SymptomCheckerPage() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  // 🔊 Voice output
  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // 🔍 Backend API call
  const checkSymptoms = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/symptom/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      const data = await res.json();
      setResult(data);

      if (data?.message) {
        speak(data.message);
      }
    } catch (error) {
      const fallback = {
        emergency: false,
        message: 'Failed to connect to backend',
      };
      setResult(fallback);
      speak(fallback.message);
    } finally {
      setLoading(false);
    }
  };

  // 🎤 Voice input
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser');
      return;
    }

    // @ts-ignore
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSymptoms((prev) => prev + ' ' + transcript);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.start();
  };

  // 📊 Severity logic
  const getSeverityLevel = () => {
    if (!result) return 'Low';
    if (result.emergency) return 'High';
    return 'Medium';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: result?.emergency
          ? 'linear-gradient(135deg, #ffebee, #ffcdd2)'
          : 'linear-gradient(135deg, #e3f2fd, #ffffff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '30px',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '650px',
          boxShadow: result?.emergency
            ? '0 0 25px red'
            : '0 10px 30px rgba(0,0,0,0.1)',
          animation: result?.emergency ? 'pulse 1s infinite' : 'none',
        }}
      >
        <h1>🩺 MedConnect AI Symptom Checker</h1>
        <p style={{ color: '#555' }}>
          Type or speak your symptoms to get instant medical guidance.
        </p>

        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g. fever, headache, chest pain"
          rows={4}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '16px',
            marginTop: '10px',
          }}
        />

        <button
          onClick={startVoiceInput}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '10px',
            borderRadius: '10px',
            border: '1px solid #1976d2',
            background: listening ? '#d32f2f' : '#e3f2fd',
            color: listening ? '#fff' : '#1976d2',
            cursor: 'pointer',
          }}
        >
          {listening ? '🎙️ Listening...' : '🎤 Speak Symptoms'}
        </button>

        <button
          onClick={checkSymptoms}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            marginTop: '12px',
            borderRadius: '10px',
            border: 'none',
            background: '#1976d2',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Analyzing...' : 'Check Symptoms'}
        </button>

        {result && (
          <div
            style={{
              marginTop: '25px',
              padding: '20px',
              borderRadius: '14px',
              background: result.emergency ? '#ffebee' : '#e8f5e9',
              border: `2px solid ${result.emergency ? '#d32f2f' : '#2e7d32'
                }`,
            }}
          >
            <h3>Result</h3>

            <p>
              <b>Emergency:</b>{' '}
              <span
                style={{
                  color: result.emergency ? 'red' : 'green',
                  fontWeight: 'bold',
                }}
              >
                {result.emergency ? 'YES 🚨' : 'NO ✅'}
              </span>
            </p>

            {/* 📊 Severity Meter */}
            <div style={{ marginTop: '12px' }}>
              <b>Severity Level:</b> {getSeverityLevel()}
              <div
                style={{
                  height: '10px',
                  marginTop: '6px',
                  borderRadius: '6px',
                  background:
                    getSeverityLevel() === 'High'
                      ? '#d32f2f'
                      : getSeverityLevel() === 'Medium'
                        ? '#fbc02d'
                        : '#2e7d32',
                }}
              />
            </div>

            <p style={{ marginTop: '10px' }}>
              <b>Message:</b> {result.message}
            </p>

            {/* 🚑 Hospital Button */}
            {result.emergency && (
              <button
                onClick={() =>
                  window.open(
                    'https://www.google.com/maps/search/nearby+hospital',
                    '_blank'
                  )
                }
                style={{
                  marginTop: '15px',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#d32f2f',
                  color: '#fff',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                🚑 Find Nearby Hospitals
              </button>
            )}
          </div>
        )}

        <p
          style={{
            textAlign: 'center',
            marginTop: '25px',
            fontSize: '13px',
            color: '#555',
          }}
        >
          ⚠️ This AI does not replace professional medical advice.
        </p>
      </div>

      {/* 🔥 Emergency animation */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 5px red; }
          50% { box-shadow: 0 0 30px red; }
          100% { box-shadow: 0 0 5px red; }
        }
      `}</style>
    </div>
  );
}
