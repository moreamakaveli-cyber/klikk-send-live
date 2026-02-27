"use client";

const scrollingTexts = [
  "Skal du levere noe til en venn?",
  "Har du glemt nøkler hjemme?",
  "Ligger lommeboken igjen hos en venn?",
  "Må du levere en bok til en medstudent?",
  "Skal du sende noe til kjæresten på jobb?",
  "Har du glemt laderen hos en kompis?",
  "Må en jakke tilbake til en venn?",
  "Har du solgt noe som må overleveres?",
  "Har du lånt bort AirPods som må hentes?",
  "Skal en pakke sendes til søsteren din?",
  "Må du levere en bok til en student?",
  "Skal en kake leveres til familien?",
  "Har du lånt bort en kjole som må tilbake?",
  "Har du glemt jakken på nach?",
  "Skal noe raskt fra deg til en venn?",
];

export default function ScrollingText() {
  return (
    <div className="w-full overflow-hidden py-3">
      <div className="flex animate-scroll whitespace-nowrap">
        {/* Duplicate all texts multiple times for seamless loop */}
        {[...Array(3)].map((_, loopIndex) =>
          scrollingTexts.map((text, textIndex) => (
            <span key={`${loopIndex}-${textIndex}`} className="mx-8 font-semibold text-xl md:text-2xl" style={{ color: 'oklch(75% 0.183 55.934)' }}>
              {text}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
