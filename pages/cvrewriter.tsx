import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Text, Spacer, useTheme } from "@nextui-org/react";

// Initial resume texts (old vs updated)
const initialLeft = `John Doe
Software Engineer

Experience:
- Developed and maintained e-commerce web applications using React and Node.js.
- Collaborated with cross-functional teams to define requirements and deliver features on schedule.
- Implemented RESTful APIs and integrated third-party services for payment processing.

Skills:
- JavaScript, TypeScript, React, Node.js, SQL, Git

Education:
- B.S. in Computer Science, University of Tech, 2018`;

const initialRight = `John Doe
Senior Software Engineer

Experience:
- Led a team of 4 engineers to design and deploy scalable microservices on AWS.
- Architected a real-time data processing pipeline using Node.js and Kafka, improving performance by 30%.
- Integrated CI/CD pipelines with Docker and Jenkins for automated testing and deployment.
- Mentored junior developers and conducted code reviews to enforce best practices.

Skills:
- JavaScript, TypeScript, React, Node.js, AWS, Docker, Kubernetes

Education:
- B.S. in Computer Science, University of Tech, 2018
- M.S. in Data Science, Tech Institute, 2021

Certifications:
- AWS Certified Solutions Architect`;

export default function CVRewriter() {
  const [leftText, setLeftText] = useState(initialLeft);
  const [rightText, setRightText] = useState(initialRight);
  const { isDark } = useTheme();

  // Hidden file input for Upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => fileInputRef.current?.click();

  // --- Diff logic using LCS (Longest Common Subsequence) ---
  type DiffLine = { type: 'equal' | 'add' | 'remove'; value: string };

  function diffLines(a: string[], b: string[]): DiffLine[] {
    // First, handle empty cases
    if (a.length === 0 && b.length === 0) return [];
    if (a.length === 0) return b.map(line => ({ type: 'add' as const, value: line }));
    if (b.length === 0) return a.map(line => ({ type: 'remove' as const, value: line }));

    // Simple case: single line comparison
    if (a.length === 1 && b.length === 1) {
      if (a[0].trim() === b[0].trim()) {
        return [{ type: 'equal' as const, value: a[0] }];
      } else {
        return [
          { type: 'remove' as const, value: a[0] },
          { type: 'add' as const, value: b[0] }
        ];
      }
    }
    const result: DiffLine[] = [];
    let i = 0, j = 0;
    
    // Trim whitespace from lines for comparison
    const trimmedA = a.map(line => line.trim());
    const trimmedB = b.map(line => line.trim());
    
    // Find the maximum length to process all lines
    const maxLength = Math.max(a.length, b.length);
    
    while (i < a.length || j < b.length) {
      const lineA = i < a.length ? trimmedA[i] : null;
      const lineB = j < b.length ? trimmedB[j] : null;
      
      if (lineA !== null && lineB !== null && lineA === lineB) {
        // Lines match
        result.push({ type: 'equal', value: a[i] });
        i++;
        j++;
      } else {
        // Try to find the next matching line
        let foundMatch = false;
        let lookAhead = 1;
        const maxLookAhead = 10; // Limit lookahead to prevent performance issues
        
        // Look ahead in both directions to find matching lines
        while (!foundMatch && lookAhead <= maxLookAhead) {
          // Look ahead in right text
          if (i + lookAhead < a.length && trimmedA[i + lookAhead] === lineB) {
            // Lines were removed from left
            for (let k = 0; k < lookAhead; k++) {
              result.push({ type: 'remove', value: a[i + k] });
            }
            i += lookAhead;
            foundMatch = true;
          }
          // Look ahead in left text
          else if (j + lookAhead < b.length && trimmedB[j + lookAhead] === lineA) {
            // Lines were added to right
            for (let k = 0; k < lookAhead; k++) {
              result.push({ type: 'add', value: b[j + k] });
            }
            j += lookAhead;
            foundMatch = true;
          }
          
          // Check if lines match after lookahead
          if (!foundMatch && i + lookAhead < a.length && j + lookAhead < b.length && 
              trimmedA[i + lookAhead] === trimmedB[j + lookAhead]) {
            // Lines were modified in between
            for (let k = 0; k < lookAhead; k++) {
              result.push({ type: 'remove', value: a[i + k] });
              result.push({ type: 'add', value: b[j + k] });
            }
            i += lookAhead;
            j += lookAhead;
            foundMatch = true;
          }
          
          lookAhead++;
        }
        
        if (!foundMatch) {
          // No match found within lookahead, mark as removed/added
          if (lineA !== null && (j >= b.length || trimmedA[i] !== trimmedB[j])) {
            result.push({ type: 'remove', value: a[i] });
            i++;
          }
          if (lineB !== null && (i >= a.length || trimmedA[i] !== trimmedB[j])) {
            result.push({ type: 'add', value: b[j] });
            j++;
          }
        }
      }
    }
    
    return result;
  }

  const [removalCount, setRemovalCount] = useState(0);
  const [additionCount, setAdditionCount] = useState(0);
  useEffect(() => {
    const diff = diffLines(leftText.split('\n'), rightText.split('\n'));
    setRemovalCount(diff.filter(d => d.type === 'remove').length);
    setAdditionCount(diff.filter(d => d.type === 'add').length);
  }, [leftText, rightText]);

  // Render diffs for each side based on diffLines
  const renderDiffLines = (side: 'left' | 'right') => {
    const diff = diffLines(leftText.split('\n'), rightText.split('\n'));
    const elements: JSX.Element[] = [];
    let leftCount = 0, rightCount = 0;
    diff.forEach((d, idx) => {
      let show = false, lineNumber = 0;
      if (d.type === 'equal') {
        leftCount++; rightCount++; show = true; lineNumber = side === 'left' ? leftCount : rightCount;
      } else if (d.type === 'remove') {
        leftCount++; if (side === 'left') { show = true; lineNumber = leftCount; }
      } else if (d.type === 'add') {
        rightCount++; if (side === 'right') { show = true; lineNumber = rightCount; }
      }
      if (show) {
        const bg = d.type === 'remove'
          ? (isDark ? '#2d1717' : '#fff5f5')
          : d.type === 'add'
            ? (isDark ? '#173117' : '#ebfbee')
            : (isDark ? 'transparent' : 'transparent');
        const color = d.type === 'remove'
          ? (isDark ? '#ff6b6b' : '#f03e3e')
          : d.type === 'add'
            ? (isDark ? '#69f0ae' : '#2b8a3e')
            : (isDark ? '#eee' : '#212529');
        elements.push(
          <div key={idx} style={{ display: 'flex', alignItems: 'center', minHeight: '28px', lineHeight: '28px' }}>
            {/* Gutter with white background for line numbers */}
            <span style={{ width: '40px', textAlign: 'right', paddingRight: '8px', backgroundColor: 'transparent', color: isDark ? '#888' : '#6c757d', userSelect: 'none' }}>{lineNumber}</span>
            {/* Content with checkered background */}
            <span style={{
              flex: 1,
              color,
              backgroundColor: bg,
              backgroundImage: isDark
                ? 'linear-gradient(#23272e 1px, transparent 1px), linear-gradient(90deg, #23272e 1px, transparent 1px)'
                : 'linear-gradient(#e9ecef 1px, transparent 1px), linear-gradient(90deg, #e9ecef 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              padding: '0 8px'
            }}>
              {d.value}
            </span>
          </div>
        );
      }
    });
    return elements;
  };

  // Background pattern for text boxes
  const stripedBackground: React.CSSProperties = {
    backgroundImage: 'linear-gradient(to bottom, #f8f9fa 1px, transparent 1px)',
    backgroundSize: '100% 28px',
    backgroundPosition: '0 0',
    padding: '4px 0',
  };

  return (
    <div style={{ padding: '20px 32px 32px' }}>
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.pdf,.doc,.docx" style={{ display: 'none' }} />
      <Text h3 css={{ color: isDark ? '#fff' : 'black', marginBottom: 12, fontWeight: 500, letterSpacing: '-0.01em' }}>CV Resume Rewriter – Instantly Improve and Customize Your Resume
      </Text>
      <Text css={{ color: isDark ? '#bbb' : '#888', fontSize: '0.95em', lineHeight: 1.55 }}>
      This tool helps you rewrite and enhance your CV with AI-powered suggestions. Edit your original resume side by side with the improved version      </Text>
      <Spacer y={0.5} />
      <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 8, alignItems: 'center' }}>
        {/* Left group */}
        <Button
          size="sm"
          bordered
          css={{
            borderRadius: 6,
            minWidth: 0,
            height: 26,
            padding: '0 10px',
            background: isDark ? (removalCount > 0 ? '#2d1717' : '#23272e') : (removalCount > 0 ? '#fbeaea' : '#f5f5f5'),
            color: removalCount > 0 ? (isDark ? '#ff6b6b' : '#d32f2f') : (isDark ? '#bbb' : '#666'),
            border: `1.5px solid ${removalCount > 0 ? (isDark ? '#7a2424' : '#f5c6cb') : (isDark ? '#444' : '#e0e0e0')}`,
            fontWeight: 600,
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            boxShadow: 'none',
            transition: 'none',
            pointerEvents: 'none',
          }}
          aria-label="Show Removals"
          title="Show Removals"
        >
          <svg width="14" height="14" fill="none" stroke={removalCount > 0 ? "#d32f2f" : "#666"} strokeWidth="2" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginRight: 6 }}><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span style={{fontWeight:700, marginRight:4}}>{removalCount}</span> Removals
        </Button>
        <Button
          size="sm"
          bordered
          aria-label="Upload"
          title="Upload"
          css={{
            borderRadius: 6,
            minWidth: 0,
            height: 30,
            padding: '0 14px',
            background: isDark ? '#23272e' : '#fff',
            color: isDark ? '#fff' : '#222',
            border: `1px solid ${isDark ? '#444' : '#e0e0e0'}`,
            fontWeight: 500,
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: 'none',
            transition: 'none',
          }}
          onClick={handleUploadClick}
        >
          <svg width="18" height="18" fill="none" stroke={isDark ? "#fff" : "#222"} strokeWidth="2" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginRight: 6 }}><polyline points="20 6 9 17 4 12"/></svg>
          <span style={{ verticalAlign: 'middle' }}>Upload</span>
        </Button>
        <div style={{ flex: 1 }} />
        <Button
          size="sm"
          bordered
          aria-label="Download"
          title="Download"
          css={{
            borderRadius: 6,
            minWidth: 0,
            height: 30,
            padding: '0 14px',
            background: isDark ? '#23272e' : '#fff',
            color: isDark ? '#fff' : '#222',
            border: `1px solid ${isDark ? '#444' : '#e0e0e0'}`,
            fontWeight: 500,
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: 'none',
            transition: 'none',
          }}
        >
          <svg width="18" height="18" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginRight: 6 }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span style={{ verticalAlign: 'middle' }}>Download</span>
        </Button>
        <Button
          size="sm"
          bordered
          css={{
            borderRadius: 6,
            minWidth: 0,
            height: 26,
            padding: '0 10px',
            background: isDark ? (additionCount > 0 ? '#173117' : '#23272e') : (additionCount > 0 ? '#eafbea' : '#f5f5f5'),
            color: additionCount > 0 ? (isDark ? '#69f0ae' : '#2e7d32') : (isDark ? '#bbb' : '#666'),
            border: `1.5px solid ${additionCount > 0 ? (isDark ? '#1de9b6' : '#b7eac7') : (isDark ? '#444' : '#e0e0e0')}`,
            fontWeight: 600,
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            boxShadow: 'none',
            transition: 'none',
            pointerEvents: 'none',
          }}
          aria-label="Show Additions"
          title="Show Additions"
        >
          <svg width="14" height="14" fill="none" stroke={additionCount > 0 ? "#2e7d32" : "#666"} strokeWidth="2" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginRight: 6 }}><line x1="5" y1="12" x2="19" y2="12"/><line x1="12" y1="5" x2="12" y2="19"/></svg>
          <span style={{fontWeight:700, marginRight:4}}>{additionCount}</span> Additions
        </Button>
      </div>
      <Spacer y={1} />
      <div style={{ display: 'flex', gap: '16px', overflow: 'hidden', marginTop: '8px' }}>
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: isDark ? '0 1px 6px rgba(0,0,0,0.24)' : '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            padding: '10px 16px',
            backgroundColor: isDark ? '#181c22' : '#f8f9fa',
            border: `1px solid ${isDark ? '#333' : '#e9ecef'}`,
            borderBottom: 'none',
            fontWeight: 500,
            fontSize: '13px',
            color: isDark ? '#fff' : '#495057',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            Original Text
          </div>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px 16px',
            backgroundColor: isDark ? '#23272e' : '#fff',
            border: `1px solid ${isDark ? '#333' : '#e9ecef'}`,
            borderTop: 'none',
            fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
            fontSize: '13px',
            lineHeight: '24px',
            color: isDark ? '#eee' : '#212529'
          }}>
            {renderDiffLines('left')}
          </div>
        </div>

        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            padding: '10px 16px',
            backgroundColor: isDark ? '#181c22' : '#f8f9fa',
            border: `1px solid ${isDark ? '#333' : '#e9ecef'}`,
            borderBottom: 'none',
            fontWeight: 500,
            fontSize: '13px',
            color: isDark ? '#fff' : '#495057',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            Modified Text
          </div>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px 16px',
            backgroundColor: isDark ? '#23272e' : '#fff',
            border: `1px solid ${isDark ? '#333' : '#e9ecef'}`,
            borderTop: 'none',
            fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
            fontSize: '13px',
            lineHeight: '24px',
            color: isDark ? '#eee' : '#212529'
          }}>
            {renderDiffLines('right')}
          </div>
        </div>
      </div>
    </div>
  );
}
