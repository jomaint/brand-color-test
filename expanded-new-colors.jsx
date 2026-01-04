import React, { useState } from 'react';

const ExpandedBrandExplorer = () => {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [customColor, setCustomColor] = useState(null);
  
  // Generate hue variations based on selected color
  const generateVariations = (hex) => {
    // Convert hex to HSL
    const hexToHSL = (hex) => {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      return { h: h * 360, s: s * 100, l: l * 100 };
    };
    
    // Convert HSL to hex
    const hslToHex = (h, s, l) => {
      s /= 100;
      l /= 100;
      const a = s * Math.min(l, 1 - l);
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
    };
    
    const base = hexToHSL(hex);
    
    return [
      { name: 'Lighter +20%', hex: hslToHex(base.h, base.s, Math.min(base.l + 20, 90)), type: 'Lightness' },
      { name: 'Lighter +10%', hex: hslToHex(base.h, base.s, Math.min(base.l + 10, 85)), type: 'Lightness' },
      { name: 'Original', hex: hex, type: 'Lightness' },
      { name: 'Darker -10%', hex: hslToHex(base.h, base.s, Math.max(base.l - 10, 15)), type: 'Lightness' },
      { name: 'Darker -20%', hex: hslToHex(base.h, base.s, Math.max(base.l - 20, 10)), type: 'Lightness' },
      
      { name: 'Warmer +30°', hex: hslToHex((base.h + 30) % 360, base.s, base.l), type: 'Hue' },
      { name: 'Warmer +15°', hex: hslToHex((base.h + 15) % 360, base.s, base.l), type: 'Hue' },
      { name: 'Original', hex: hex, type: 'Hue' },
      { name: 'Cooler -15°', hex: hslToHex((base.h - 15 + 360) % 360, base.s, base.l), type: 'Hue' },
      { name: 'Cooler -30°', hex: hslToHex((base.h - 30 + 360) % 360, base.s, base.l), type: 'Hue' },
      
      { name: 'Vivid +20%', hex: hslToHex(base.h, Math.min(base.s + 20, 100), base.l), type: 'Saturation' },
      { name: 'Vivid +10%', hex: hslToHex(base.h, Math.min(base.s + 10, 100), base.l), type: 'Saturation' },
      { name: 'Original', hex: hex, type: 'Saturation' },
      { name: 'Muted -10%', hex: hslToHex(base.h, Math.max(base.s - 10, 0), base.l), type: 'Saturation' },
      { name: 'Muted -20%', hex: hslToHex(base.h, Math.max(base.s - 20, 0), base.l), type: 'Saturation' },
    ];
  };
  
  const variationTypes = ['Lightness', 'Hue', 'Saturation'];

  // Locked palette
  const palette = {
    charcoal: '#404E5C',
    slate: '#4F6272',
    pewter: '#7E8E9E',
    iceBlue: '#E8F4F8',
    sageTeal: '#4A9B7E',
    copper: '#B87D5C',
    surface: '#F7F8FA',
    border: '#E1E5EB',
    white: '#FFFFFF',
  };

  // Brand color options - Standout colors
  const brandOptions = [
    // Blues - Strong foundation
    { name: 'Royal Blue', hex: '#4F46E5', category: 'Blue', vibe: 'Premium, confident' },
    { name: 'Indigo', hex: '#6366F1', category: 'Blue', vibe: 'Modern, softer royal' },
    { name: 'Sapphire', hex: '#3730A3', category: 'Blue', vibe: 'Deep, luxurious' },
    { name: 'Cobalt', hex: '#2563EB', category: 'Blue', vibe: 'Classic fintech, trustworthy' },
    
    // Vibrant Purples - Bold & unique
    { name: 'Violet', hex: '#7C3AED', category: 'Purple', vibe: 'Vibrant, creative' },
    { name: 'Electric Purple', hex: '#8B5CF6', category: 'Purple', vibe: 'Energetic, modern' },
    { name: 'Deep Violet', hex: '#6D28D9', category: 'Purple', vibe: 'Rich, premium' },
    { name: 'Amethyst', hex: '#9333EA', category: 'Purple', vibe: 'Bold, memorable' },
    
    // Magentas & Pinks - Distinctive & warm
    { name: 'Magenta', hex: '#DB2777', category: 'Pink', vibe: 'Bold, energetic' },
    { name: 'Hot Pink', hex: '#EC4899', category: 'Pink', vibe: 'Vibrant, youthful' },
    { name: 'Fuchsia', hex: '#D946EF', category: 'Pink', vibe: 'Playful, standout' },
    { name: 'Rose', hex: '#E11D48', category: 'Pink', vibe: 'Warm, confident' },
    
    // Teals & Greens - Fresh & different
    { name: 'Teal', hex: '#0D9488', category: 'Teal', vibe: 'Fresh, balanced' },
    { name: 'Emerald', hex: '#059669', category: 'Teal', vibe: 'Growth, prosperity' },
    { name: 'Cyan', hex: '#0891B2', category: 'Teal', vibe: 'Bright, modern' },
    { name: 'Turquoise', hex: '#14B8A6', category: 'Teal', vibe: 'Friendly, approachable' },
    
    // Deep & Professional - Muted, sophisticated
    { name: 'Deep Plum', hex: '#61195C', category: 'Deep', vibe: 'Sophisticated, luxe' },
    { name: 'Burgundy', hex: '#7B1E3F', category: 'Deep', vibe: 'Classic, refined' },
    { name: 'Wine', hex: '#722F37', category: 'Deep', vibe: 'Rich, established' },
    { name: 'Deep Navy', hex: '#1E3A5F', category: 'Deep', vibe: 'Trustworthy, corporate' },
    { name: 'Midnight Blue', hex: '#1A365D', category: 'Deep', vibe: 'Serious, banking' },
    { name: 'Forest', hex: '#1D4044', category: 'Deep', vibe: 'Grounded, stable' },
    { name: 'Deep Teal', hex: '#134E4A', category: 'Deep', vibe: 'Calm, professional' },
    { name: 'Slate', hex: '#334155', category: 'Deep', vibe: 'Neutral, versatile' },
  ];

  const baseBrand = brandOptions[selectedBrand];
  const brand = customColor ? { ...baseBrand, hex: customColor.hex, name: customColor.name } : baseBrand;
  const categories = ['Blue', 'Purple', 'Pink', 'Teal', 'Deep'];

  // Helper for lighter tint
  const tint = (hex, opacity) => `${hex}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      minHeight: '100vh'
    }}>
      {/* Color Selection Section - Distinct Background */}
      <div style={{ 
        background: 'rgb(215, 222, 231)', 
        padding: '32px 32px 40px'
      }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: palette.charcoal, margin: 0 }}>
            Blink Brand Color Explorer
          </h1>
          <p style={{ color: palette.slate, marginTop: 8, fontSize: 15 }}>
            Select a primary brand color — UI updates live below
          </p>
        </div>

        {/* Color Selector */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          marginBottom: 24, 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          {categories.map(category => (
            <div key={category} style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 10, color: palette.slate, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{category}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {brandOptions.filter(opt => opt.category === category).map((opt) => {
                const globalIndex = brandOptions.findIndex(o => o.hex === opt.hex);
                return (
                  <button
                    key={opt.hex}
                    onClick={() => {
                      setSelectedBrand(globalIndex);
                      setCustomColor(null);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      border: selectedBrand === globalIndex ? `2px solid ${brand.hex}` : `1px solid ${palette.border}`,
                      borderRadius: 8,
                      background: selectedBrand === globalIndex ? palette.iceBlue : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: opt.hex }} />
                    <span style={{ fontSize: 12, color: palette.charcoal }}>{opt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        
        {/* Selected color info */}
        <div style={{ marginTop: 16, padding: 16, background: palette.iceBlue, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: brand.hex, transition: 'background 0.2s ease' }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: palette.charcoal }}>{brand.name}</div>
            <div style={{ fontSize: 13, color: palette.slate }}>{brand.hex} • {brand.vibe}</div>
          </div>
        </div>
      </div>

      {/* Hue Variations of Selected Color - Still in picker section */}
      <div style={{ 
        background: 'white', 
        borderRadius: 16, 
        padding: 20, 
        marginBottom: 24, 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ fontSize: 11, fontWeight: 600, color: palette.slate, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
          Variations of {baseBrand.name}
        </h2>
        <p style={{ fontSize: 12, color: palette.pewter, marginBottom: 16 }}>
          Explore different hues, lightness, and saturation levels
        </p>
        
        {variationTypes.map(type => {
          const typeVariations = generateVariations(baseBrand.hex).filter(v => v.type === type);
          return (
            <div key={type} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 10, color: palette.slate, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{type}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {typeVariations.map((variation, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (variation.name === 'Original') {
                        setCustomColor(null);
                      } else {
                        setCustomColor({ hex: variation.hex, name: `${baseBrand.name} (${variation.name})` });
                      }
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      padding: '12px 8px',
                      border: (variation.name === 'Original' && !customColor) || (customColor && customColor.hex === variation.hex) 
                        ? `2px solid ${brand.hex}` 
                        : `1px solid ${palette.border}`,
                      borderRadius: 10,
                      background: (variation.name === 'Original' && !customColor) || (customColor && customColor.hex === variation.hex)
                        ? palette.iceBlue 
                        : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ 
                      width: '100%', 
                      height: 40, 
                      borderRadius: 6, 
                      background: variation.hex,
                      transition: 'background 0.2s ease'
                    }} />
                    <span style={{ fontSize: 10, color: palette.charcoal, textAlign: 'center' }}>{variation.name}</span>
                    <span style={{ fontSize: 9, color: palette.pewter, fontFamily: 'monospace' }}>{variation.hex}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* Preview Section - Light Background */}
      <div style={{ background: palette.surface, padding: 32 }}>

      {/* Complete Palette */}
      <div style={{ 
        background: 'white', 
        borderRadius: 16, 
        padding: 20, 
        marginBottom: 24, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
        border: `1px solid ${palette.border}` 
      }}>
        <h2 style={{ fontSize: 11, fontWeight: 600, color: palette.slate, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
          Complete Palette
        </h2>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { color: palette.charcoal, name: 'Charcoal' },
            { color: palette.slate, name: 'Slate' },
            { color: palette.pewter, name: 'Pewter' },
            { color: palette.iceBlue, name: 'Ice Blue' },
            { color: brand.hex, name: brand.name, highlight: true },
            { color: palette.sageTeal, name: 'Sage Teal' },
            { color: palette.copper, name: 'Copper' },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ 
                height: 40, 
                borderRadius: 6, 
                background: item.color,
                border: item.highlight ? `2px solid ${palette.charcoal}` : 'none',
                transition: 'background 0.2s ease'
              }} />
              <div style={{ fontSize: 9, fontWeight: 500, color: palette.charcoal, marginTop: 4 }}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* UI Components Section Header */}
      <h2 style={{ fontSize: 28, fontWeight: 700, color: palette.charcoal, marginBottom: 8 }}>
        UI Components
      </h2>
      <p style={{ fontSize: 15, color: palette.pewter, marginBottom: 24 }}>
        Library of components styled with the selected brand color
      </p>

      {/* UI Variations Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
        
        {/* 1. App Header / Logo */}
        <div style={{ 
          background: brand.hex, 
          borderRadius: 16, 
          padding: 24,
          transition: 'background 0.2s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <span style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>Blink</span>
            </div>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              </svg>
            </div>
          </div>
          <div style={{ color: 'white' }}>
            <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>Welcome back, Jo</div>
            <div style={{ fontSize: 28, fontWeight: 600 }}>$2,450 available</div>
          </div>
        </div>

        {/* 2. Onboarding Step */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 24, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}`,
          textAlign: 'center'
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: `${brand.hex}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            transition: 'background 0.2s ease'
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={brand.hex} strokeWidth="1.5" style={{ transition: 'stroke 0.2s ease' }}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, color: palette.charcoal, marginBottom: 8 }}>
            Invite your circle
          </div>
          <div style={{ fontSize: 14, color: palette.pewter, marginBottom: 20, lineHeight: 1.5 }}>
            Connect with friends who can back your credit line
          </div>
          <button style={{
            width: '100%',
            padding: '14px 20px',
            background: brand.hex,
            color: 'white',
            border: 'none',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}>
            Find Friends
          </button>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: i === 1 ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === 1 ? brand.hex : palette.border,
                transition: 'background 0.2s ease'
              }} />
            ))}
          </div>
        </div>

        {/* 3. Credit Card UI */}
        <div style={{ background: palette.iceBlue, borderRadius: 16, padding: 20 }}>
          <div style={{ 
            background: `linear-gradient(135deg, ${palette.charcoal} 0%, ${palette.slate} 100%)`,
            borderRadius: 14, 
            padding: 20,
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `${brand.hex}30`,
              transition: 'background 0.2s ease'
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30, position: 'relative' }}>
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 2 }}>BLINK CREDIT</div>
                <div style={{ fontSize: 11, letterSpacing: 2 }}>•••• 4821</div>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill={brand.hex} style={{ transition: 'fill 0.2s ease' }}>
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: 1 }}>$2,450</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Available credit</div>
            </div>
          </div>
        </div>

        {/* 4. Transaction List */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}` 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: palette.charcoal }}>Recent Activity</span>
            <span style={{ fontSize: 12, color: brand.hex, fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s ease' }}>See all</span>
          </div>
          
          {[
            { name: 'Loan to Sarah', amount: '-$200', type: 'out', time: '2h ago' },
            { name: 'Repayment from James', amount: '+$150', type: 'in', time: 'Yesterday' },
            { name: 'Credit increase', amount: '+$500', type: 'credit', time: '3 days ago' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 0',
              borderBottom: i < 2 ? `1px solid ${palette.border}` : 'none'
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: item.type === 'in' ? `${palette.sageTeal}15` : item.type === 'credit' ? `${brand.hex}15` : palette.surface,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.type === 'in' ? palette.sageTeal : item.type === 'credit' ? brand.hex : palette.pewter} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                  {item.type === 'in' ? (
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  ) : item.type === 'credit' ? (
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  ) : (
                    <path d="M12 5v14M19 12l-7 7-7-7"/>
                  )}
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: palette.charcoal }}>{item.name}</div>
                <div style={{ fontSize: 12, color: palette.pewter }}>{item.time}</div>
              </div>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 600, 
                color: item.type === 'in' ? palette.sageTeal : item.type === 'credit' ? brand.hex : palette.charcoal,
                transition: 'color 0.2s ease'
              }}>
                {item.amount}
              </div>
            </div>
          ))}
        </div>

        {/* 5. Stats / Progress */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}` 
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: palette.charcoal, marginBottom: 16 }}>Credit Utilization</div>
          
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: palette.slate }}>Used</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: palette.charcoal }}>$550 / $2,450</span>
            </div>
            <div style={{ height: 8, background: palette.surface, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ 
                width: '22%', 
                height: '100%', 
                background: brand.hex, 
                borderRadius: 4,
                transition: 'background 0.2s ease'
              }} />
            </div>
            <div style={{ fontSize: 11, color: palette.pewter, marginTop: 6 }}>22% utilized — Great standing!</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: 14, background: palette.surface, borderRadius: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: palette.charcoal }}>3</div>
              <div style={{ fontSize: 12, color: palette.pewter }}>Active backers</div>
            </div>
            <div style={{ padding: 14, background: `${brand.hex}10`, borderRadius: 10, transition: 'background 0.2s ease' }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: brand.hex, transition: 'color 0.2s ease' }}>A+</div>
              <div style={{ fontSize: 12, color: palette.pewter }}>Trust score</div>
            </div>
          </div>
        </div>

        {/* 6. Empty State */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 32, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}`,
          textAlign: 'center'
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: palette.iceBlue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={palette.pewter} strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: palette.charcoal, marginBottom: 8 }}>
            No pending requests
          </div>
          <div style={{ fontSize: 14, color: palette.pewter, marginBottom: 20 }}>
            When friends request backing, they'll appear here
          </div>
          <button style={{
            padding: '10px 20px',
            background: 'white',
            color: brand.hex,
            border: `1.5px solid ${brand.hex}`,
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            Invite Friends
          </button>
        </div>

        {/* 7. Notification / Toast */}
        <div style={{ 
          background: palette.charcoal, 
          borderRadius: 16, 
          padding: 20
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: palette.pewter, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            Notifications
          </p>
          
          <div style={{
            background: 'white',
            borderRadius: 12,
            padding: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 10
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: `${brand.hex}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill={brand.hex} style={{ transition: 'fill 0.2s ease' }}>
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: palette.charcoal }}>Credit limit increased!</div>
              <div style={{ fontSize: 11, color: palette.pewter }}>Your limit is now $2,450</div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: brand.hex, transition: 'background 0.2s ease' }} />
          </div>

          <div style={{
            background: palette.sageTeal,
            borderRadius: 12,
            padding: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>Payment received successfully</span>
          </div>
        </div>

        {/* 8. Profile / Avatar */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}` 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${brand.hex} 0%, ${palette.charcoal} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 20,
              fontWeight: 600,
              transition: 'background 0.2s ease'
            }}>
              JO
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: palette.charcoal }}>Jo Smith</div>
              <div style={{ fontSize: 13, color: palette.pewter }}>Member since 2024</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ 
              padding: '5px 10px', 
              background: `${brand.hex}15`, 
              color: brand.hex, 
              borderRadius: 6, 
              fontSize: 11, 
              fontWeight: 500,
              transition: 'all 0.2s ease'
            }}>
              Verified
            </span>
            <span style={{ 
              padding: '5px 10px', 
              background: `${palette.copper}15`, 
              color: palette.copper, 
              borderRadius: 6, 
              fontSize: 11, 
              fontWeight: 500 
            }}>
              Pro Member
            </span>
          </div>
        </div>

        {/* 9. Modal / Dialog */}
        <div style={{ 
          background: 'rgba(64,78,92,0.9)', 
          borderRadius: 16, 
          padding: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            width: '100%',
            maxWidth: 280
          }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: `${brand.hex}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                transition: 'background 0.2s ease'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={brand.hex} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: palette.charcoal }}>Confirm Request</div>
              <div style={{ fontSize: 13, color: palette.pewter, marginTop: 4 }}>Request $500 from your credit?</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{
                flex: 1,
                padding: '12px',
                background: 'white',
                color: palette.charcoal,
                border: `1.5px solid ${palette.border}`,
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer'
              }}>
                Cancel
              </button>
              <button style={{
                flex: 1,
                padding: '12px',
                background: brand.hex,
                color: 'white',
                border: 'none',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}>
                Confirm
              </button>
            </div>
          </div>
        </div>

        {/* 10. Bottom Navigation */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}` 
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: palette.slate, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            Bottom Nav
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '8px 0',
            background: palette.surface,
            borderRadius: 14
          }}>
            {[
              { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', label: 'Home', active: true },
              { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', label: 'Loans' },
              { icon: 'M12 5v14M5 12h14', label: 'New', special: true },
              { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', label: 'Network' },
              { icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', label: 'Profile' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                {item.special ? (
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: brand.hex,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: -20,
                    boxShadow: `0 4px 12px ${brand.hex}40`,
                    transition: 'all 0.2s ease'
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d={item.icon}/>
                    </svg>
                  </div>
                ) : (
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: item.active ? `${brand.hex}15` : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={item.active ? brand.hex : palette.pewter} 
                      strokeWidth="2"
                      style={{ transition: 'stroke 0.2s ease' }}
                    >
                      <path d={item.icon}/>
                    </svg>
                  </div>
                )}
                {!item.special && (
                  <span style={{ 
                    fontSize: 9, 
                    color: item.active ? brand.hex : palette.pewter,
                    fontWeight: item.active ? 600 : 400,
                    transition: 'color 0.2s ease'
                  }}>
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 11. Form with Focus */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}` 
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: palette.slate, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            Form States
          </p>
          
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: palette.charcoal, display: 'block', marginBottom: 6 }}>
              Focused
            </label>
            <input 
              type="text" 
              value="$500" 
              readOnly
              style={{
                width: '100%',
                padding: '12px 14px',
                border: `2px solid ${brand.hex}`,
                borderRadius: 10,
                fontSize: 15,
                color: palette.charcoal,
                background: `${brand.hex}08`,
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.2s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: palette.charcoal, display: 'block', marginBottom: 6 }}>
              Default
            </label>
            <input 
              type="text" 
              placeholder="Enter note..."
              style={{
                width: '100%',
                padding: '12px 14px',
                border: `1.5px solid ${palette.border}`,
                borderRadius: 10,
                fontSize: 15,
                color: palette.charcoal,
                background: 'white',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: palette.charcoal, display: 'block', marginBottom: 6 }}>
              Disabled
            </label>
            <input 
              type="text" 
              value="Cannot edit"
              disabled
              style={{
                width: '100%',
                padding: '12px 14px',
                border: `1.5px solid ${palette.border}`,
                borderRadius: 10,
                fontSize: 15,
                color: palette.pewter,
                background: palette.surface,
                outline: 'none',
                boxSizing: 'border-box',
                cursor: 'not-allowed'
              }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#C53030', display: 'block', marginBottom: 6 }}>
              Error
            </label>
            <input 
              type="text" 
              value="Invalid amount"
              readOnly
              style={{
                width: '100%',
                padding: '12px 14px',
                border: `2px solid #E53E3E`,
                borderRadius: 10,
                fontSize: 15,
                color: palette.charcoal,
                background: '#FFF5F5',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <p style={{ fontSize: 11, color: '#C53030', margin: '6px 0 0' }}>Amount must be at least $100</p>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: palette.copper, display: 'block', marginBottom: 6 }}>
              Warning
            </label>
            <input 
              type="text" 
              value="$2,400"
              readOnly
              style={{
                width: '100%',
                padding: '12px 14px',
                border: `2px solid ${palette.copper}`,
                borderRadius: 10,
                fontSize: 15,
                color: palette.charcoal,
                background: `${palette.copper}10`,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <p style={{ fontSize: 11, color: palette.copper, margin: '6px 0 0' }}>Approaching credit limit</p>
          </div>
        </div>

        {/* 12. Button States */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}` 
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: palette.slate, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            Button States
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button style={{ 
              padding: '14px 20px', 
              background: brand.hex, 
              color: 'white', 
              border: 'none', 
              borderRadius: 10, 
              fontSize: 14, 
              fontWeight: 500, 
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}>
              Primary — Default
            </button>
            <button style={{ 
              padding: '14px 20px', 
              background: `${brand.hex}CC`, 
              color: 'white', 
              border: 'none', 
              borderRadius: 10, 
              fontSize: 14, 
              fontWeight: 500, 
              cursor: 'pointer'
            }}>
              Primary — Hover
            </button>
            <button style={{ 
              padding: '14px 20px', 
              background: palette.border, 
              color: palette.pewter, 
              border: 'none', 
              borderRadius: 10, 
              fontSize: 14, 
              fontWeight: 500, 
              cursor: 'not-allowed'
            }}>
              Primary — Disabled
            </button>
            <button style={{ 
              padding: '14px 20px', 
              background: 'white', 
              color: palette.charcoal, 
              border: `1.5px solid ${palette.border}`, 
              borderRadius: 10, 
              fontSize: 14, 
              fontWeight: 500, 
              cursor: 'pointer'
            }}>
              Secondary — Default
            </button>
            <button style={{ 
              padding: '14px 20px', 
              background: palette.surface, 
              color: palette.pewter, 
              border: `1.5px solid ${palette.border}`, 
              borderRadius: 10, 
              fontSize: 14, 
              fontWeight: 500, 
              cursor: 'not-allowed'
            }}>
              Secondary — Disabled
            </button>
          </div>
        </div>

        {/* 13. Alert & Notification States */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}` 
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: palette.slate, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            Alerts & Notifications
          </p>
          
          {/* Success */}
          <div style={{ 
            padding: 12, 
            background: `${palette.sageTeal}10`, 
            borderRadius: 10,
            borderLeft: `3px solid ${palette.sageTeal}`,
            marginBottom: 10
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: palette.charcoal }}>Payment successful</div>
            <div style={{ fontSize: 12, color: palette.slate }}>Your payment of $150 has been processed</div>
          </div>

          {/* Warning */}
          <div style={{ 
            padding: 12, 
            background: `${palette.copper}10`, 
            borderRadius: 10,
            borderLeft: `3px solid ${palette.copper}`,
            marginBottom: 10
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: palette.charcoal }}>Payment due soon</div>
            <div style={{ fontSize: 12, color: palette.slate }}>Your next payment of $125 is due in 3 days</div>
          </div>

          {/* Error */}
          <div style={{ 
            padding: 12, 
            background: '#FFF5F5', 
            borderRadius: 10,
            borderLeft: '3px solid #E53E3E',
            marginBottom: 10
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: palette.charcoal }}>Payment failed</div>
            <div style={{ fontSize: 12, color: palette.slate }}>Unable to process payment. Please try again.</div>
          </div>

          {/* Info */}
          <div style={{ 
            padding: 12, 
            background: `${brand.hex}10`, 
            borderRadius: 10,
            borderLeft: `3px solid ${brand.hex}`,
            transition: 'all 0.2s ease'
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: palette.charcoal }}>New feature available</div>
            <div style={{ fontSize: 12, color: palette.slate }}>You can now schedule recurring payments</div>
          </div>
        </div>

        {/* 14. Chips & Selection States */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}` 
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: palette.slate, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            Selection States
          </p>
          
          {/* Chip states */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 10, color: palette.pewter, marginBottom: 8, fontWeight: 500 }}>Filter Chips</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ 
                padding: '8px 14px', 
                background: brand.hex, 
                color: 'white', 
                borderRadius: 20, 
                fontSize: 12, 
                fontWeight: 500,
                transition: 'background 0.2s ease'
              }}>
                Selected
              </span>
              <span style={{ padding: '8px 14px', background: 'white', color: palette.slate, borderRadius: 20, fontSize: 12, fontWeight: 500, border: `1px solid ${palette.border}` }}>
                Default
              </span>
              <span style={{ padding: '8px 14px', background: palette.surface, color: palette.pewter, borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'not-allowed' }}>
                Disabled
              </span>
            </div>
          </div>

          {/* Toggle/Switch states */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 10, color: palette.pewter, marginBottom: 8, fontWeight: 500 }}>Toggle States</p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 44,
                  height: 26,
                  borderRadius: 13,
                  background: brand.hex,
                  padding: 2,
                  transition: 'background 0.2s ease'
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'white', marginLeft: 18 }} />
                </div>
                <span style={{ fontSize: 12, color: palette.charcoal }}>On</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 44,
                  height: 26,
                  borderRadius: 13,
                  background: palette.border,
                  padding: 2
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'white' }} />
                </div>
                <span style={{ fontSize: 12, color: palette.charcoal }}>Off</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 44,
                  height: 26,
                  borderRadius: 13,
                  background: palette.surface,
                  padding: 2,
                  cursor: 'not-allowed'
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: palette.border }} />
                </div>
                <span style={{ fontSize: 12, color: palette.pewter }}>Disabled</span>
              </div>
            </div>
          </div>

          {/* Checkbox states */}
          <div>
            <p style={{ fontSize: 10, color: palette.pewter, marginBottom: 8, fontWeight: 500 }}>Checkbox States</p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: palette.charcoal }}>
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: brand.hex,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s ease'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                Checked
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: palette.charcoal }}>
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: 'white',
                  border: `2px solid ${palette.border}`
                }} />
                Unchecked
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: palette.pewter }}>
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: palette.surface,
                  border: `2px solid ${palette.border}`,
                  cursor: 'not-allowed'
                }} />
                Disabled
              </label>
            </div>
          </div>
        </div>

        {/* 15. Status Badges */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}` 
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: palette.slate, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            Status Badges
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            <span style={{ padding: '6px 12px', background: `${palette.sageTeal}15`, color: palette.sageTeal, borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
              Approved
            </span>
            <span style={{ padding: '6px 12px', background: `${brand.hex}15`, color: brand.hex, borderRadius: 20, fontSize: 12, fontWeight: 500, transition: 'all 0.2s ease' }}>
              Active
            </span>
            <span style={{ padding: '6px 12px', background: `${palette.copper}15`, color: palette.copper, borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
              Pending
            </span>
            <span style={{ padding: '6px 12px', background: '#FFF5F5', color: '#C53030', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
              Declined
            </span>
            <span style={{ padding: '6px 12px', background: palette.surface, color: palette.pewter, borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
              Inactive
            </span>
            <span style={{ padding: '6px 12px', background: palette.iceBlue, color: palette.charcoal, borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
              Selected
            </span>
          </div>

          {/* Dot indicators */}
          <p style={{ fontSize: 10, color: palette.pewter, marginBottom: 8, fontWeight: 500 }}>Status Dots</p>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: palette.sageTeal }} />
              <span style={{ fontSize: 12, color: palette.charcoal }}>Online</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: palette.copper }} />
              <span style={{ fontSize: 12, color: palette.charcoal }}>Away</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E53E3E' }} />
              <span style={{ fontSize: 12, color: palette.charcoal }}>Busy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: palette.pewter }} />
              <span style={{ fontSize: 12, color: palette.charcoal }}>Offline</span>
            </div>
          </div>
        </div>

        {/* 12. Chips & Filters */}
        <div style={{ 
          background: 'white', 
          borderRadius: 16, 
          padding: 20, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', 
          border: `1px solid ${palette.border}` 
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: palette.slate, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            Filters & Chips
          </p>
          
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={{ 
              padding: '8px 14px', 
              background: brand.hex, 
              color: 'white', 
              borderRadius: 20, 
              fontSize: 12, 
              fontWeight: 500,
              transition: 'background 0.2s ease'
            }}>
              All
            </span>
            <span style={{ padding: '8px 14px', background: 'white', color: palette.slate, borderRadius: 20, fontSize: 12, fontWeight: 500, border: `1px solid ${palette.border}` }}>
              Pending
            </span>
            <span style={{ padding: '8px 14px', background: 'white', color: palette.slate, borderRadius: 20, fontSize: 12, fontWeight: 500, border: `1px solid ${palette.border}` }}>
              Completed
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ 
              padding: '6px 10px', 
              background: `${brand.hex}15`, 
              color: brand.hex, 
              borderRadius: 6, 
              fontSize: 11, 
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s ease'
            }}>
              Sarah M.
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </span>
            <span style={{ 
              padding: '6px 10px', 
              background: `${brand.hex}15`, 
              color: brand.hex, 
              borderRadius: 6, 
              fontSize: 11, 
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s ease'
            }}>
              $500+
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Pages Section */}
      <div style={{ marginTop: 48, padding: '0 24px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: palette.charcoal, marginBottom: 8 }}>
          Mobile App Pages
        </h2>
        <p style={{ fontSize: 15, color: palette.pewter, marginBottom: 24 }}>
          Full page mockups showing how the brand color flows through the app
        </p>

        <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingTop: 8 }}>
          
          {/* Onboarding Page 1 - Welcome */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: palette.charcoal,
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              background: brand.hex,
              borderRadius: 28,
              height: 580,
              
              
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              transition: 'background 0.2s ease'
            }}>
              {/* Status bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 48 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>9:41</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <div style={{ width: 16, height: 10, background: 'white', borderRadius: 2 }} />
                </div>
              </div>

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{
                  width: 88,
                  height: 88,
                  borderRadius: 24,
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: 'white', margin: '0 0 12px' }}>
                  Blink
                </h1>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, margin: 0 }}>
                  Instant credit, backed by the people who trust you most
                </p>
              </div>

              {/* Bottom */}
              <div>
                <button style={{
                  width: '100%',
                  padding: '15px',
                  background: 'white',
                  color: brand.hex,
                  border: 'none',
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: 10,
                  transition: 'color 0.2s ease'
                }}>
                  Get Started
                </button>
                <button style={{
                  width: '100%',
                  padding: '15px',
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}>
                  I already have an account
                </button>
              </div>
            </div>
          </div>

          {/* Onboarding Page 2 - Value Prop */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: palette.charcoal,
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              background: 'white',
              borderRadius: 28,
              height: 580,
              
              
              padding: 24,
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Status bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: palette.charcoal }}>9:41</span>
                <span style={{ fontSize: 14, color: palette.pewter, cursor: 'pointer' }}>Skip</span>
              </div>

              {/* Illustration area */}
              <div style={{
                flex: 1,
                background: palette.iceBlue,
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    {['S', 'J', 'A'].map((letter, i) => (
                      <div key={i} style={{
                        width: 52,
                        height: 52,
                        borderRadius: '50%',
                        background: i === 0 ? brand.hex : i === 1 ? palette.slate : palette.pewter,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        fontWeight: 600,
                        marginLeft: i > 0 ? -12 : 0,
                        border: '3px solid white',
                        transition: 'background 0.2s ease'
                      }}>
                        {letter}
                      </div>
                    ))}
                  </div>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={palette.pewter} strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: palette.charcoal, margin: '0 0 10px' }}>
                  Build your circle
                </h2>
                <p style={{ fontSize: 14, color: palette.pewter, lineHeight: 1.5, margin: 0 }}>
                  Friends and family back your credit. The more trust, the more you can borrow.
                </p>
              </div>

              {/* Progress dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: i === 1 ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === 1 ? brand.hex : palette.border,
                    transition: 'background 0.2s ease'
                  }} />
                ))}
              </div>

              {/* Button */}
              <button style={{
                width: '100%',
                padding: '15px',
                background: brand.hex,
                color: 'white',
                border: 'none',
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}>
                Continue
              </button>
            </div>
          </div>

          {/* Onboarding Page 3 - Permissions */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: palette.charcoal,
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              background: 'white',
              borderRadius: 28,
              height: 580,
              
              
              padding: 24,
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Status bar */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: 24 }}>
                <div style={{ position: 'absolute', left: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.charcoal} strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: palette.charcoal }}>9:41</span>
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: palette.charcoal, margin: '0 0 10px' }}>
                  Enable notifications
                </h2>
                <p style={{ fontSize: 14, color: palette.pewter, lineHeight: 1.5, margin: '0 0 24px' }}>
                  Stay updated on requests, payments, and when friends need your help.
                </p>

                {/* Permission cards */}
                {[
                  { icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', title: 'Push notifications', desc: 'Real-time updates' },
                  { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6', title: 'Email alerts', desc: 'Weekly summaries' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 14,
                    background: palette.surface,
                    borderRadius: 12,
                    marginBottom: 10
                  }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `${brand.hex}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s ease'
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={brand.hex} strokeWidth="1.5" style={{ transition: 'stroke 0.2s ease' }}>
                        <path d={item.icon}/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: palette.charcoal }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: palette.pewter }}>{item.desc}</div>
                    </div>
                    <div style={{
                      width: 44,
                      height: 26,
                      borderRadius: 13,
                      background: brand.hex,
                      padding: 2,
                      transition: 'background 0.2s ease'
                    }}>
                      <div style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: 'white',
                        marginLeft: 18
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <button style={{
                width: '100%',
                padding: '15px',
                background: brand.hex,
                color: 'white',
                border: 'none',
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 10,
                transition: 'background 0.2s ease'
              }}>
                Enable Notifications
              </button>
              <button style={{
                width: '100%',
                padding: '14px',
                background: 'transparent',
                color: palette.pewter,
                border: 'none',
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer'
              }}>
                Maybe later
              </button>
            </div>
          </div>

          {/* Tab Page - Home Dashboard */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: palette.charcoal,
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              background: palette.surface,
              borderRadius: 28,
              height: 580,
              
              
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ background: 'white', padding: '12px 16px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 12, color: palette.pewter }}>Welcome back</div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: palette.charcoal }}>Jo</div>
                  </div>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${brand.hex}, ${palette.charcoal})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'background 0.2s ease'
                  }}>
                    JO
                  </div>
                </div>

                {/* Credit card mini */}
                <div style={{
                  background: palette.charcoal,
                  borderRadius: 14,
                  padding: 16,
                  color: 'white'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Available</div>
                      <div style={{ fontSize: 26, fontWeight: 600 }}>$2,450</div>
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: 6,
                      fontSize: 10,
                      fontWeight: 600,
                      color: 'white'
                    }}>
                      Active
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ background: 'white', padding: '0 16px' }}>
                <div style={{ display: 'flex', borderBottom: `1px solid ${palette.border}` }}>
                  {['Overview', 'Activity', 'Backers'].map((tab, i) => (
                    <button key={i} style={{
                      flex: 1,
                      padding: '12px 0',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: i === 0 ? `2px solid ${brand.hex}` : '2px solid transparent',
                      color: i === 0 ? brand.hex : palette.pewter,
                      fontSize: 13,
                      fontWeight: i === 0 ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: 14 }}>
                <div style={{ background: 'white', borderRadius: 14, padding: 14, marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: palette.pewter, marginBottom: 10 }}>Quick Actions</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{
                      flex: 1,
                      padding: '12px 8px',
                      background: brand.hex,
                      color: 'white',
                      border: 'none',
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}>
                      Request
                    </button>
                    <button style={{
                      flex: 1,
                      padding: '12px 8px',
                      background: palette.surface,
                      color: palette.charcoal,
                      border: 'none',
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}>
                      Repay
                    </button>
                  </div>
                </div>

                <div style={{ background: 'white', borderRadius: 14, padding: 14 }}>
                  <div style={{ fontSize: 12, color: palette.pewter, marginBottom: 10 }}>Recent</div>
                  {[
                    { name: 'Sarah backed you', amount: '+$200', positive: true },
                    { name: 'Loan repaid', amount: '-$50', positive: false },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderTop: i > 0 ? `1px solid ${palette.border}` : 'none'
                    }}>
                      <span style={{ fontSize: 13, color: palette.charcoal }}>{item.name}</span>
                      <span style={{ 
                        fontSize: 13, 
                        fontWeight: 600, 
                        color: item.positive ? palette.sageTeal : palette.charcoal 
                      }}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Nav */}
              <div style={{
                background: 'white',
                padding: '8px 16px 20px',
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                {[
                  { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', active: true },
                  { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', active: false },
                  { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', active: false },
                  { icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', active: false },
                ].map((item, i) => (
                  <div key={i} style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: item.active ? `${brand.hex}15` : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.active ? brand.hex : palette.pewter} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                      <path d={item.icon}/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* List Page - Connections */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: palette.charcoal,
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              background: 'white',
              borderRadius: 28,
              height: 580,
              
              
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ padding: '12px 16px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h1 style={{ fontSize: 20, fontWeight: 600, color: palette.charcoal, margin: 0 }}>My Network</h1>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `${brand.hex}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={brand.hex} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </div>
                </div>

                {/* Search */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  background: palette.surface,
                  borderRadius: 10
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.pewter} strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <span style={{ fontSize: 14, color: palette.pewter }}>Search connections...</span>
                </div>
              </div>

              {/* Filter chips */}
              <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
                <span style={{ 
                  padding: '6px 12px', 
                  background: brand.hex, 
                  color: 'white', 
                  borderRadius: 16, 
                  fontSize: 12, 
                  fontWeight: 500,
                  transition: 'background 0.2s ease'
                }}>
                  All
                </span>
                <span style={{ padding: '6px 12px', background: palette.surface, color: palette.slate, borderRadius: 16, fontSize: 12, fontWeight: 500 }}>
                  Backers
                </span>
                <span style={{ padding: '6px 12px', background: palette.surface, color: palette.slate, borderRadius: 16, fontSize: 12, fontWeight: 500 }}>
                  Backing
                </span>
              </div>

              {/* List */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {[
                  { name: 'Sarah Mitchell', role: 'Backing you', amount: '$500', status: 'active' },
                  { name: 'James Kim', role: 'Backing you', amount: '$400', status: 'active' },
                  { name: 'Alex Rivera', role: 'You\'re backing', amount: '$300', status: 'active' },
                  { name: 'Emma Chen', role: 'Pending request', amount: '$200', status: 'pending' },
                  { name: 'Michael Park', role: 'Backing you', amount: '$150', status: 'active' },
                ].map((person, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 16px',
                    borderBottom: '1px solid #F0F2F5'
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: person.status === 'pending' ? palette.pewter : i % 2 === 0 ? brand.hex : palette.slate,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 600,
                      transition: 'background 0.2s ease'
                    }}>
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: palette.charcoal }}>{person.name}</div>
                      <div style={{ fontSize: 12, color: palette.pewter }}>{person.role}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: palette.charcoal }}>{person.amount}</div>
                      {person.status === 'pending' && (
                        <span style={{ 
                          fontSize: 10, 
                          color: palette.copper, 
                          fontWeight: 500
                        }}>
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Nav */}
              <div style={{
                background: 'white',
                padding: '8px 16px 20px',
                display: 'flex',
                justifyContent: 'space-around',
                borderTop: `1px solid ${palette.border}`
              }}>
                {[
                  { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', active: false },
                  { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', active: false },
                  { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', active: true },
                  { icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', active: false },
                ].map((item, i) => (
                  <div key={i} style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: item.active ? `${brand.hex}15` : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.active ? brand.hex : palette.pewter} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                      <path d={item.icon}/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Page - Loan */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: palette.charcoal,
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              background: 'white',
              borderRadius: 28,
              height: 580,
              
              
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ padding: '12px 16px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.charcoal} strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </div>
                  <h1 style={{ fontSize: 16, fontWeight: 600, color: palette.charcoal, margin: 0 }}>Loan</h1>
                </div>
              </div>

              {/* Form */}
              <div style={{ flex: 1, padding: '0 16px' }}>
                {/* Amount Display */}
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: palette.pewter, marginBottom: 8 }}>Enter amount</div>
                  <div style={{ 
                    fontSize: 44, 
                    fontWeight: 600, 
                    color: palette.charcoal,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: 26, color: palette.pewter, marginRight: 4 }}>$</span>
                    500
                  </div>
                </div>

                {/* Slider */}
                <div style={{ marginBottom: 24, padding: '0 4px' }}>
                  <div style={{
                    position: 'relative',
                    height: 5,
                    background: palette.border,
                    borderRadius: 3
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '20%',
                      height: '100%',
                      background: brand.hex,
                      borderRadius: 3,
                      transition: 'background 0.2s ease'
                    }} />
                    <div style={{
                      position: 'absolute',
                      left: '20%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 20,
                      height: 20,
                      background: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      border: `2px solid ${brand.hex}`,
                      transition: 'border-color 0.2s ease'
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: palette.pewter }}>$100</span>
                    <span style={{ fontSize: 11, color: palette.pewter }}>$2,450</span>
                  </div>
                </div>

                {/* Duration */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: palette.charcoal, display: 'block', marginBottom: 8 }}>
                    Repayment period
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['1 mo', '3 mo', '6 mo'].map((period, i) => (
                      <button key={i} style={{
                        flex: 1,
                        padding: '11px 0',
                        background: i === 1 ? palette.pewter : 'white',
                        color: i === 1 ? 'white' : palette.slate,
                        border: `1.5px solid ${i === 1 ? palette.pewter : palette.border}`,
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}>
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: palette.charcoal, display: 'block', marginBottom: 8 }}>
                    Note (optional)
                  </label>
                  <input 
                    type="text" 
                    placeholder="What's this for?"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      border: `1.5px solid ${palette.border}`,
                      borderRadius: 10,
                      fontSize: 14,
                      color: palette.charcoal,
                      background: 'white',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Summary */}
                <div style={{
                  padding: 14,
                  background: palette.iceBlue,
                  borderRadius: 12
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: palette.slate }}>Monthly payment</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: palette.charcoal }}>$171.67</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: palette.slate }}>Total (5% interest)</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: palette.charcoal }}>$515.00</span>
                  </div>
                </div>
              </div>

              {/* Submit - pinned to bottom */}
              <div style={{ padding: '16px', marginTop: 'auto' }}>
                <button style={{
                  width: '100%',
                  padding: '15px',
                  background: brand.hex,
                  color: 'white',
                  border: 'none',
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'background 0.2s ease'
                }}>
                  Request $500
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Success / Confirmation Page */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: palette.charcoal,
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              background: 'white',
              borderRadius: 28,
              height: 580,
              
              
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              padding: 24
            }}>
              {/* Content centered */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                {/* Success icon */}
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: `${palette.sageTeal}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={palette.sageTeal} strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>

                <h2 style={{ fontSize: 22, fontWeight: 600, color: palette.charcoal, margin: '0 0 10px' }}>
                  Funds Sent!
                </h2>
                <p style={{ fontSize: 14, color: palette.pewter, margin: '0 0 24px', lineHeight: 1.5 }}>
                  Your $500 has been sent to your account. Funds typically arrive within minutes.
                </p>

                {/* Details card */}
                <div style={{
                  background: palette.surface,
                  borderRadius: 14,
                  padding: 16,
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: palette.pewter }}>Amount</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: palette.charcoal }}>$500.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: palette.pewter }}>Duration</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: palette.charcoal }}>3 months</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: palette.pewter }}>Status</span>
                    <span style={{ 
                      fontSize: 11, 
                      fontWeight: 600, 
                      color: palette.sageTeal,
                      background: `${palette.sageTeal}15`,
                      padding: '3px 8px',
                      borderRadius: 6
                    }}>
                      Sent
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons - pinned to bottom */}
              <div style={{ marginTop: 'auto' }}>
                <button style={{
                  width: '100%',
                  padding: '15px',
                  background: brand.hex,
                  color: 'white',
                  border: 'none',
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: 10,
                  transition: 'background 0.2s ease'
                }}>
                  Back to Home
                </button>
                <button style={{
                  width: '100%',
                  padding: '14px',
                  background: 'transparent',
                  color: palette.slate,
                  border: 'none',
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}>
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Profile Tab */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: palette.charcoal,
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              background: 'white',
              borderRadius: 28,
              height: 580,
              
              
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ padding: '12px 16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <h1 style={{ fontSize: 16, fontWeight: 600, color: palette.charcoal, margin: 0 }}>Profile</h1>
                  <div style={{ position: 'absolute', right: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.charcoal} strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Profile Card */}
              <div style={{ flex: 1, padding: '0 16px' }}>
                <div style={{ 
                  textAlign: 'center', 
                  padding: 20, 
                  background: palette.surface, 
                  borderRadius: 16,
                  marginBottom: 16
                }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${brand.hex}, ${palette.charcoal})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 600,
                    margin: '0 auto 12px',
                    transition: 'background 0.2s ease'
                  }}>
                    JO
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: palette.charcoal, marginBottom: 4 }}>Jo Smith</div>
                  <div style={{ fontSize: 13, color: palette.pewter, marginBottom: 12 }}>Member since Jan 2024</div>
                  <div style={{ 
                    display: 'inline-block',
                    padding: '4px 12px', 
                    background: `${brand.hex}15`, 
                    color: brand.hex, 
                    borderRadius: 20, 
                    fontSize: 12, 
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}>
                    Verified
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: 12, background: palette.surface, borderRadius: 12 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: palette.charcoal }}>$2,450</div>
                    <div style={{ fontSize: 11, color: palette.pewter }}>Credit Limit</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 12, background: palette.surface, borderRadius: 12 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: palette.charcoal }}>5</div>
                    <div style={{ fontSize: 11, color: palette.pewter }}>Backers</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 12, background: palette.surface, borderRadius: 12 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: palette.sageTeal }}>98%</div>
                    <div style={{ fontSize: 11, color: palette.pewter }}>Trust Score</div>
                  </div>
                </div>

                {/* Menu Items */}
                <div style={{ background: palette.surface, borderRadius: 14, overflow: 'hidden' }}>
                  {[
                    { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10', label: 'Personal Info' },
                    { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'Security' },
                    { icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', label: 'Notifications' },
                    { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', label: 'Payment Methods' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 16px',
                      borderBottom: i < 3 ? `1px solid ${palette.border}` : 'none'
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.slate} strokeWidth="2">
                        <path d={item.icon}/>
                      </svg>
                      <span style={{ flex: 1, fontSize: 14, color: palette.charcoal }}>{item.label}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.pewter} strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Nav */}
              <div style={{
                background: 'white',
                padding: '8px 16px 20px',
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-around',
                borderTop: `1px solid ${palette.border}`
              }}>
                {[
                  { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', active: false },
                  { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', active: false },
                  { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', active: false },
                  { icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', active: true },
                ].map((item, i) => (
                  <div key={i} style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: item.active ? `${brand.hex}15` : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.active ? brand.hex : palette.pewter} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                      <path d={item.icon}/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dark Mode Mobile Pages */}
      <div style={{ marginTop: 48, padding: '0 24px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: palette.charcoal, marginBottom: 8 }}>
          Dark Mode
        </h2>
        <p style={{ fontSize: 15, color: palette.pewter, marginBottom: 24 }}>
          How the app looks in dark mode
        </p>

        <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingTop: 8 }}>
          
          {/* Dark - Welcome */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: '#1E2328',
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              background: brand.hex,
              borderRadius: 28,
              height: 580,
              
              
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              transition: 'background 0.2s ease'
            }}>
              {/* Status bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 48 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>9:41</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <div style={{ width: 16, height: 10, background: 'white', borderRadius: 2 }} />
                </div>
              </div>

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{
                  width: 88,
                  height: 88,
                  borderRadius: 24,
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: 'white', margin: '0 0 12px' }}>
                  Blink
                </h1>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, margin: 0 }}>
                  Instant credit, backed by the people who trust you most
                </p>
              </div>

              {/* Bottom */}
              <div>
                <button style={{
                  width: '100%',
                  padding: '15px',
                  background: 'white',
                  color: brand.hex,
                  border: 'none',
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: 10,
                  transition: 'color 0.2s ease'
                }}>
                  Get Started
                </button>
                <button style={{
                  width: '100%',
                  padding: '15px',
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}>
                  I already have an account
                </button>
              </div>
            </div>
          </div>

          {/* Dark - Home Dashboard */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: '#1E2328',
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              background: '#262D34',
              borderRadius: 28,
              height: 580,
              
              
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ background: '#323A42', padding: '12px 16px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>Welcome back</div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: '#FFF' }}>Jo</div>
                  </div>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${brand.hex}, #333)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'background 0.2s ease'
                  }}>
                    JO
                  </div>
                </div>

                {/* Credit card mini */}
                <div style={{
                  background: `linear-gradient(135deg, ${brand.hex}, ${brand.hex}CC)`,
                  borderRadius: 14,
                  padding: 16,
                  color: 'white',
                  transition: 'background 0.2s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>Available</div>
                      <div style={{ fontSize: 26, fontWeight: 600 }}>$2,450</div>
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: 6,
                      fontSize: 10,
                      fontWeight: 600,
                      color: 'white'
                    }}>
                      Active
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ background: '#323A42', padding: '0 16px' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
                  {['Overview', 'Activity', 'Backers'].map((tab, i) => (
                    <button key={i} style={{
                      flex: 1,
                      padding: '12px 0',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: i === 0 ? `2px solid ${brand.hex}` : '2px solid transparent',
                      color: i === 0 ? brand.hex : '#6B7280',
                      fontSize: 13,
                      fontWeight: i === 0 ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: 14 }}>
                <div style={{ background: '#323A42', borderRadius: 14, padding: 14, marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 10 }}>Quick Actions</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{
                      flex: 1,
                      padding: '12px 8px',
                      background: brand.hex,
                      color: 'white',
                      border: 'none',
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}>
                      Request
                    </button>
                    <button style={{
                      flex: 1,
                      padding: '12px 8px',
                      background: '#3D4550',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}>
                      Repay
                    </button>
                  </div>
                </div>

                <div style={{ background: '#323A42', borderRadius: 14, padding: 14 }}>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 10 }}>Recent</div>
                  {[
                    { name: 'Sarah backed you', amount: '+$200', positive: true },
                    { name: 'Loan repaid', amount: '-$50', positive: false },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderTop: i > 0 ? '1px solid #333' : 'none'
                    }}>
                      <span style={{ fontSize: 13, color: '#FFF' }}>{item.name}</span>
                      <span style={{ 
                        fontSize: 13, 
                        fontWeight: 600, 
                        color: item.positive ? palette.sageTeal : '#FFF' 
                      }}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Nav */}
              <div style={{
                background: '#323A42',
                padding: '8px 16px 20px',
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                {[
                  { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', active: true },
                  { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', active: false },
                  { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', active: false },
                  { icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', active: false },
                ].map((item, i) => (
                  <div key={i} style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: item.active ? `${brand.hex}30` : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.active ? brand.hex : '#6B7280'} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                      <path d={item.icon}/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dark - Network List */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: '#1E2328',
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              background: '#262D34',
              borderRadius: 28,
              height: 580,
              
              
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ padding: '12px 16px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h1 style={{ fontSize: 20, fontWeight: 600, color: '#FFF', margin: 0 }}>My Network</h1>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `${brand.hex}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={brand.hex} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </div>
                </div>

                {/* Search */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  background: '#323A42',
                  borderRadius: 10
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <span style={{ fontSize: 14, color: '#6B7280' }}>Search connections...</span>
                </div>
              </div>

              {/* Filter chips */}
              <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
                <span style={{ 
                  padding: '6px 12px', 
                  background: brand.hex, 
                  color: 'white', 
                  borderRadius: 16, 
                  fontSize: 12, 
                  fontWeight: 500,
                  transition: 'background 0.2s ease'
                }}>
                  All
                </span>
                <span style={{ padding: '6px 12px', background: '#323A42', color: '#9CA3AF', borderRadius: 16, fontSize: 12, fontWeight: 500 }}>
                  Backers
                </span>
                <span style={{ padding: '6px 12px', background: '#323A42', color: '#9CA3AF', borderRadius: 16, fontSize: 12, fontWeight: 500 }}>
                  Backing
                </span>
              </div>

              {/* List */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {[
                  { name: 'Sarah Mitchell', role: 'Backing you', amount: '$500', status: 'active' },
                  { name: 'James Kim', role: 'Backing you', amount: '$400', status: 'active' },
                  { name: 'Alex Rivera', role: 'You\'re backing', amount: '$300', status: 'active' },
                  { name: 'Emma Chen', role: 'Pending request', amount: '$200', status: 'pending' },
                  { name: 'Michael Park', role: 'Backing you', amount: '$150', status: 'active' },
                ].map((person, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 16px',
                    borderBottom: '1px solid #1E2429'
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: person.status === 'pending' ? '#4A535D' : i % 2 === 0 ? brand.hex : '#4A535D',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 600,
                      transition: 'background 0.2s ease'
                    }}>
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#FFF' }}>{person.name}</div>
                      <div style={{ fontSize: 12, color: '#9CA3AF' }}>{person.role}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#FFF' }}>{person.amount}</div>
                      {person.status === 'pending' && (
                        <span style={{ 
                          fontSize: 10, 
                          color: palette.copper, 
                          fontWeight: 500
                        }}>
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Nav */}
              <div style={{
                background: '#323A42',
                padding: '8px 16px 20px',
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                {[
                  { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', active: false },
                  { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', active: false },
                  { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', active: true },
                  { icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', active: false },
                ].map((item, i) => (
                  <div key={i} style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: item.active ? `${brand.hex}30` : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.active ? brand.hex : '#6B7280'} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                      <path d={item.icon}/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dark - Loan Form */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: '#1E2328',
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              background: '#262D34',
              borderRadius: 28,
              height: 580,
              
              
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ padding: '12px 16px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </div>
                  <h1 style={{ fontSize: 16, fontWeight: 600, color: '#FFF', margin: 0 }}>Loan</h1>
                </div>
              </div>

              {/* Form */}
              <div style={{ flex: 1, padding: '0 16px' }}>
                {/* Amount Display */}
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 8 }}>Enter amount</div>
                  <div style={{ 
                    fontSize: 44, 
                    fontWeight: 600, 
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: 26, color: '#6B7280', marginRight: 4 }}>$</span>
                    500
                  </div>
                </div>

                {/* Slider */}
                <div style={{ marginBottom: 24, padding: '0 4px' }}>
                  <div style={{
                    position: 'relative',
                    height: 5,
                    background: '#3D4550',
                    borderRadius: 3
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '20%',
                      height: '100%',
                      background: brand.hex,
                      borderRadius: 3,
                      transition: 'background 0.2s ease'
                    }} />
                    <div style={{
                      position: 'absolute',
                      left: '20%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 20,
                      height: 20,
                      background: '#FFF',
                      borderRadius: '50%',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                      border: `2px solid ${brand.hex}`,
                      transition: 'border-color 0.2s ease'
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: '#6B7280' }}>$100</span>
                    <span style={{ fontSize: 11, color: '#6B7280' }}>$2,450</span>
                  </div>
                </div>

                {/* Duration */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#FFF', display: 'block', marginBottom: 8 }}>
                    Repayment period
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['1 mo', '3 mo', '6 mo'].map((period, i) => (
                      <button key={i} style={{
                        flex: 1,
                        padding: '11px 0',
                        background: i === 1 ? '#4A535D' : '#323A42',
                        color: i === 1 ? '#FFF' : '#9CA3AF',
                        border: `1.5px solid ${i === 1 ? '#4A535D' : '#3D4550'}`,
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}>
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#FFF', display: 'block', marginBottom: 8 }}>
                    Note (optional)
                  </label>
                  <input 
                    type="text" 
                    placeholder="What's this for?"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      border: '1.5px solid #333',
                      borderRadius: 10,
                      fontSize: 14,
                      color: '#FFF',
                      background: '#323A42',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Summary */}
                <div style={{
                  padding: 14,
                  background: '#323A42',
                  borderRadius: 12
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: '#9CA3AF' }}>Monthly payment</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#FFF' }}>$171.67</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: '#9CA3AF' }}>Total (5% interest)</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#FFF' }}>$515.00</span>
                  </div>
                </div>
              </div>

              {/* Submit - pinned to bottom */}
              <div style={{ padding: '16px', marginTop: 'auto' }}>
                <button style={{
                  width: '100%',
                  padding: '15px',
                  background: brand.hex,
                  color: 'white',
                  border: 'none',
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'background 0.2s ease'
                }}>
                  Request $500
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Dark - Profile */}
          <div style={{
            width: 300,
            minWidth: 300,
            background: '#1E2328',
            borderRadius: 36,
            padding: 8,
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              background: '#262D34',
              borderRadius: 28,
              height: 580,
              
              
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ padding: '12px 16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <h1 style={{ fontSize: 16, fontWeight: 600, color: '#FFF', margin: 0 }}>Profile</h1>
                  <div style={{ position: 'absolute', right: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Profile Card */}
              <div style={{ flex: 1, padding: '0 16px' }}>
                <div style={{ 
                  textAlign: 'center', 
                  padding: 20, 
                  background: '#323A42', 
                  borderRadius: 16,
                  marginBottom: 16
                }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${brand.hex}, #333)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 600,
                    margin: '0 auto 12px',
                    transition: 'background 0.2s ease'
                  }}>
                    JO
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#FFF', marginBottom: 4 }}>Jo Smith</div>
                  <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 12 }}>Member since Jan 2024</div>
                  <div style={{ 
                    display: 'inline-block',
                    padding: '4px 12px', 
                    background: brand.hex, 
                    color: 'white', 
                    borderRadius: 20, 
                    fontSize: 12, 
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}>
                    Verified
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: 12, background: '#323A42', borderRadius: 12 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: '#FFF' }}>$2,450</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>Credit Limit</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 12, background: '#323A42', borderRadius: 12 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: '#FFF' }}>5</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>Backers</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: 12, background: '#323A42', borderRadius: 12 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: palette.sageTeal }}>98%</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>Trust Score</div>
                  </div>
                </div>

                {/* Menu Items */}
                <div style={{ background: '#323A42', borderRadius: 14, overflow: 'hidden' }}>
                  {[
                    { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10', label: 'Personal Info' },
                    { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'Security' },
                    { icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', label: 'Notifications' },
                    { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', label: 'Payment Methods' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 16px',
                      borderBottom: i < 3 ? '1px solid #333' : 'none'
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                        <path d={item.icon}/>
                      </svg>
                      <span style={{ flex: 1, fontSize: 14, color: '#FFF' }}>{item.label}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Nav */}
              <div style={{
                background: '#323A42',
                padding: '8px 16px 20px',
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                {[
                  { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', active: false },
                  { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', active: false },
                  { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', active: false },
                  { icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', active: true },
                ].map((item, i) => (
                  <div key={i} style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: item.active ? `${brand.hex}30` : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.active ? brand.hex : '#6B7280'} strokeWidth="2" style={{ transition: 'stroke 0.2s ease' }}>
                      <path d={item.icon}/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
};

export default ExpandedBrandExplorer;
