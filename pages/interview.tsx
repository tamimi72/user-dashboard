import React, { useState, useEffect } from "react";
import { Text, Card, Spacer, Button, useTheme, Avatar } from "@nextui-org/react";

import Head from 'next/head';

export default function Interview() {
  const { isDark } = useTheme();
  const bgColor = isDark ? '#0d1b2a' : '#eef2f7';
  const [started, setStarted] = useState(false);
  const captions = [
    "Hello, welcome to your AI interview.",
    "Please introduce yourself and your experience.",
    "Now, let’s discuss your previous role responsibilities."
  ];
  const [captionIndex, setCaptionIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCaptionIndex(i => (i + 1) % captions.length), 3000);
    return () => clearInterval(id);
  }, [captions.length]);
  // Bar colors for speaking indicator (white-to-gray gradient)
  const barColors = ['#fff','#fff','#eee','#eee','#ddd','#ddd','#ccc','#ccc','#bbb','#bbb','#aaa','#aaa'];

  return (
    <>
      <Head>
        <title>Interview</title>
      </Head>
      <Head>
        <title>Interview</title>
      </Head>
      {started ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: bgColor, color: '#fff' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', borderBottom: `1px solid ${isDark ? '#333' : '#ccc'}` }}>
          <Text h2 css={{ margin: 0, fontWeight: 700 }}>Interview in Progress</Text>
          <Button size="sm" auto flat color="error" onClick={() => setStarted(false)} css={{ fontWeight: 600 }}>End Call</Button>
        </div>
        {/* Video Placeholder */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '800px', height: '500px', backgroundColor: '#000', borderRadius: '12px', boxShadow: 'inset 0 0 10px #111', margin: '60px auto 0' }}>
            {/* Avatar Frame */}
            <div style={{ position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)' }}>
              <Avatar size="xl" css={{ width: '180px', height: '180px', border: '4px solid #0070f3', boxShadow: '0 0 20px rgba(0,112,243,0.7)', backgroundColor: '#fff', color: '#000', fontSize: '26px', fontWeight: 700 }}>
                AI
              </Avatar>
            </div>
            {/* AI Agent Label */}
            <Text css={{ position: 'absolute', top: '300px', left: '50%', transform: 'translateX(-50%)', color: '#fff', fontSize: '24px', fontWeight: 600 }}>AI Agent</Text>
            {/* Speaking Bars */}
            <div style={{ position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
              {Array(5).fill(0).map((_, i) => (
                <div key={i} style={{ width: '12px', height: '32px', backgroundColor: '#fff', borderRadius: '6px', boxShadow: '0 0 6px rgba(255,255,255,0.8)' }} />
              ))}
            </div>
            {/* Controls Bar */}
            <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#1e1e1e', borderRadius: '24px', padding: '8px 24px' }}>
              <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 1 3 3v4a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3zM5 10v2a7 7 0 0 0 14 0v-2"/></svg>
              <span style={{ color: '#ddd', fontSize: '14px', letterSpacing: '4px' }}>·····</span>
              <span style={{ fontSize: '14px', color: '#ddd', transform: 'rotate(90deg)' }}>›</span>
              <Button size="xs" auto flat color="error" css={{ minWidth: '0', padding: '6px', boxShadow: 'none' }}>X</Button>
            </div>
          </div>
        </div>
        {/* Captions */}
        <div style={{ width: '800px', margin: '12px auto 0', padding: '0 16px', color: '#fff', fontSize: '16px', lineHeight: 1.6 }}>
          <Text css={{ opacity: 0, animation: 'fadeIn 0.6s ease forwards' }} key={captionIndex}>
            {captions[captionIndex]}
          </Text>
        </div>
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: bgColor,
          color: '#fff',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          <Text h3 css={{ marginBottom: '16px', fontWeight: 500 }}>
            No interviews available
          </Text>
          <Text css={{ color: '#aaa', fontSize: '1em', lineHeight: 1.5, marginBottom: '24px' }}>
            You currently have no scheduled interviews. Enhance your skills and stay prepared.
          </Text>
          <Button
            size="md"
            css={{
              backgroundColor: '#fff',
              color: '#0d1b2a',
              fontWeight: 600,
              borderRadius: '6px',
              padding: '0 20px',
              boxShadow: 'none',
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}
          >
            Learn More
          </Button>
          <Spacer y={0.5} />
          <Button size="md" css={{ backgroundColor:'#0070f3', color:'#fff', fontWeight:600, borderRadius:'6px', padding:'0 20px', boxShadow:'none' }} onClick={()=>setStarted(true)}>Hop In</Button>
        </div>
      )}
    </>
  );
}
