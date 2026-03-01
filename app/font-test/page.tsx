"use client";

import { useState } from "react";

export default function FontTest() {
  const [text, setText] = useState("Klikk&Send");
  const [fontSize, setFontSize] = useState(64);
  const [fontWeight, setFontWeight] = useState(400);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textColor, setTextColor] = useState("hsl(150, 30%, 15%)");

  const fonts = [
    { name: "DM Serif Display", value: "var(--font-serif), serif" },
    { name: "DM Sans", value: "var(--font-sans), sans-serif" },
    { name: "Arial", value: "Arial, sans-serif" },
    { name: "Helvetica", value: "Helvetica, sans-serif" },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Times New Roman", value: "Times New Roman, serif" },
    { name: "Courier New", value: "Courier New, monospace" },
  ];

  const [selectedFont, setSelectedFont] = useState(fonts[0].value);

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Font Test - Logo Generator</h1>
        
        {/* Controls */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tekst:</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Skriv din tekst her..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Font:</label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              {fonts.map((font) => (
                <option key={font.name} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Font størrelse: {fontSize}px
              </label>
              <input
                type="range"
                min="24"
                max="120"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Font vekt: {fontWeight}
              </label>
              <input
                type="range"
                min="100"
                max="900"
                step="100"
                value={fontWeight}
                onChange={(e) => setFontWeight(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Bokstavavstand: {letterSpacing}px
              </label>
              <input
                type="range"
                min="-5"
                max="10"
                step="0.5"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-12 flex items-center justify-center min-h-[300px]">
          <div
            id="preview-text"
            style={{
              fontFamily: selectedFont,
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              letterSpacing: `${letterSpacing}px`,
              color: textColor,
            }}
          >
            {text || "Skriv tekst her..."}
          </div>
        </div>

        {/* Color options */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Fargealternativer:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Mørk grønn", value: "hsl(150, 30%, 15%)" },
              { name: "Oransje", value: "oklch(70.5% 0.213 47.604)" },
              { name: "Svart", value: "#000000" },
              { name: "Grå", value: "#666666" },
            ].map((color) => (
              <div
                key={color.name}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => setTextColor(color.value)}
              >
                <div
                  className="w-full h-12 rounded mb-2"
                  style={{ backgroundColor: color.value }}
                />
                <p className="text-sm text-center">{color.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CSS Output */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">CSS Kode:</h2>
          <pre className="bg-white p-4 rounded border border-gray-200 overflow-x-auto text-sm">
{`font-family: ${selectedFont};
font-size: ${fontSize}px;
font-weight: ${fontWeight};
letter-spacing: ${letterSpacing}px;
color: ${textColor};`}
          </pre>
        </div>
      </div>
    </div>
  );
}
