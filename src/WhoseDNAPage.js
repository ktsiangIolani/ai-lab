import React, { useState, useRef, useEffect } from "react";
import {
  API_HOST,
  DNA_EXAMPLE_1,
  DNA_EXAMPLE_2,
  DNA_EXAMPLE_3,
  DNA_EXAMPLE_4,
} from "./consts";
import "./WhoseDNAPage.css";

const SPECIES_LIST = [
  "Acinetobacter guillouiae",
  "Streptococcus mitis",
  "Clostridium sardiniense",
  "Salmonella enterica",
  "Actinobacillus scotiae",
  "Paeniclostridium ghonii",
  "Veillonella dispar",
  "Helicobacter cetorum",
  "[Eubacterium] tenue",
  "Haemophilus parahaemolyticus",
  "Actinobacillus delphinicola",
  "Staphylococcus aureus",
  "Paracoccus aeridis",
  "causative agent",
  "Ureibacillus thermosphaericus",
  "Paraclostridium benzoelyticum",
  "Clostridium haemolyticum",
  "Klebsiella aerogenes",
  "Cetobacterium ceti",
  "Granulicatella elegans",
  "Gemella haemolysans",
  "Paraclostridium bifermentans",
  "Streptococcus salivarius",
  "Clostridium disporicum",
  "Oribacterium asaccharolyticum",
  "Streptococcus vestibularis",
  "Staphylococcus epidermidis",
  "Moraxella osloensis",
  "Atlantibacter hermannii",
  "Neisseria perflava",
  "Cutibacterium acnes",
  "Hathewaya limosa",
  "Paeniclostridium sordellii",
  "Terrisporobacter mayombei",
  "Enterobacter quasihormaechei",
  "Veillonella parvula",
  "Citrobacter freundii",
  "Gemella sanguinis",
  "Enterococcus faecalis",
  "Photobacterium leiognathi",
  "Clostridium paraputrificum",
  "Photobacterium damselae",
  "Clostridium perfringens",
  "Clostridium moniliforme",
  "Pseudomonas palmensis",
  "Streptococcus toyakuensis",
];

const BACTERIA_DATA = {
  "Acinetobacter guillouiae": {
    file: "Acinetobacter_guillouiae.svg",
    formattedName: "<i>Acinetobacter guillouiae</i>",
    description:
      "Acinetobacter guillouiae is a small rod-shaped bacterium that can sometimes cause infections in humans.",
  },
  "Streptococcus mitis": {
    file: "Streptococcus_mitis.svg",
    formattedName: "<i>Streptococcus mitis</i>",
    description:
      "Streptococcus mitis is a round bacterium that lives in the mouth and usually does not cause illness.",
  },
  "Clostridium sardiniense": {
    file: "Clostridium_sardiniense.svg",
    formattedName: "<i>Clostridium sardiniense</i>",
    description:
      "Clostridium sardiniense is a rod-shaped bacterium that scientists often find in sea animals.",
  },
  "Salmonella enterica": {
    file: "Salmonella_enterica.svg",
    formattedName: "<i>Salmonella enterica</i>",
    description:
      "Salmonella enterica is a rod-shaped bacterium that can cause food poisoning when it gets into food.",
  },
  "Actinobacillus scotiae": {
    file: "Actinobacillus_scotiae.svg",
    formattedName: "<i>Actinobacillus scotiae</i>",
    description:
      "Actinobacillus scotiae is a small rod-shaped bacterium studied because it can sometimes make animals sick.",
  },
  "Paeniclostridium ghonii": {
    file: "Paeniclostridium_ghonii.svg",
    formattedName: "<i>Paeniclostridium ghonii</i>",
    description:
      "Paeniclostridium ghonii is a rod-shaped bacterium that lives in soil and helps break down plants.",
  },
  "Veillonella dispar": {
    file: "Veillonella_dispar.svg",
    formattedName: "<i>Veillonella dispar</i>",
    description:
      "Veillonella dispar is a small round bacterium found in the mouth and intestines.",
  },
  "Helicobacter cetorum": {
    file: "Helicobacter_cetorum.svg",
    formattedName: "<i>Helicobacter cetorum</i>",
    description:
      "Helicobacter cetorum is a spiral-shaped bacterium that lives in the stomachs of whales and dolphins.",
  },
  "[Eubacterium] tenue": {
    file: "Eubacterium_tenue.svg",
    formattedName: "<i>Eubacterium tenue</i>",
    description:
      "Eubacterium tenue is a rod-shaped bacterium that lives in the human gut.",
  },
  "Haemophilus parahaemolyticus": {
    file: "Haemophilus_parahaemolyticus.svg",
    formattedName: "<i>Haemophilus parahaemolyticus</i>",
    description:
      "Haemophilus parahaemolyticus is a small bacterium that likes salty environments and can sometimes infect people.",
  },
  "Actinobacillus delphinicola": {
    file: "Actinobacillus_delphinicola.svg",
    formattedName: "<i>Actinobacillus delphinicola</i>",
    description:
      "Actinobacillus delphinicola is a rod-shaped bacterium found in dolphins.",
  },
  "Staphylococcus aureus": {
    file: "Staphylococcus_aureus.svg",
    formattedName: "<i>Staphylococcus aureus</i>",
    description:
      "Staphylococcus aureus is a round bacterium that can live on skin and sometimes causes infections like pimples.",
  },
  "Paracoccus aeridis": {
    file: "Paracoccus_aeridis.svg",
    formattedName: "<i>Paracoccus aeridis</i>",
    description:
      "Paracoccus aeridis is a round bacterium found in air and water.",
  },
  "causative agent": {
    file: "causative_agent.svg",
    formattedName: "<i>causative agent</i>",
    description: "This term means the germ or bacterium that causes a disease.",
  },
  "Ureibacillus thermosphaericus": {
    file: "Ureibacillus_thermosphaericus.svg",
    formattedName: "<i>Ureibacillus thermosphaericus</i>",
    description:
      "Ureibacillus thermosphaericus is a rod-shaped bacterium that thrives in warm places.",
  },
  "Paraclostridium benzoelyticum": {
    file: "Paraclostridium_benzoelyticum.svg",
    formattedName: "<i>Paraclostridium benzoelyticum</i>",
    description:
      "Paraclostridium benzoelyticum is a rod-shaped bacterium that can break down certain chemicals.",
  },
  "Clostridium haemolyticum": {
    file: "Clostridium_haemolyticum.svg",
    formattedName: "<i>Clostridium haemolyticum</i>",
    description:
      "Clostridium haemolyticum is a rod-shaped bacterium that can cause infections in animals.",
  },
  "Klebsiella aerogenes": {
    file: "Klebsiella_aerogenes.svg",
    formattedName: "<i>Klebsiella aerogenes</i>",
    description:
      "Klebsiella aerogenes is a rod-shaped bacterium found in soil and water that can sometimes cause infections.",
  },
  "Cetobacterium ceti": {
    file: "Cetobacterium_ceti.svg",
    formattedName: "<i>Cetobacterium ceti</i>",
    description:
      "Cetobacterium ceti is a rod-shaped bacterium found in the intestines of whales and dolphins.",
  },
  "Granulicatella elegans": {
    file: "Granulicatella_elegans.svg",
    formattedName: "<i>Granulicatella elegans</i>",
    description:
      "Granulicatella elegans is a round bacterium found in the mouth that usually does not cause harm.",
  },
  "Gemella haemolysans": {
    file: "Gemella_haemolysans.svg",
    formattedName: "<i>Gemella haemolysans</i>",
    description:
      "Gemella haemolysans is a round bacterium that sometimes lives in the mouth.",
  },
  "Paraclostridium bifermentans": {
    file: "Paraclostridium_bifermentans.svg",
    formattedName: "<i>Paraclostridium bifermentans</i>",
    description:
      "Paraclostridium bifermentans is a rod-shaped bacterium that can live in soil.",
  },
  "Streptococcus salivarius": {
    file: "Streptococcus_salivarius.svg",
    formattedName: "<i>Streptococcus salivarius</i>",
    description:
      "Streptococcus salivarius is a round bacterium that lives on the tongue and helps keep the mouth healthy.",
  },
  "Clostridium disporicum": {
    file: "Clostridium_disporicum.svg",
    formattedName: "<i>Clostridium disporicum</i>",
    description:
      "Clostridium disporicum is a rod-shaped bacterium that lives in soil.",
  },
  "Oribacterium asaccharolyticum": {
    file: "Oribacterium_asaccharolyticum.svg",
    formattedName: "<i>Oribacterium asaccharolyticum</i>",
    description:
      "Oribacterium asaccharolyticum is a round bacterium found in the mouth.",
  },
  "Streptococcus vestibularis": {
    file: "Streptococcus_vestibularis.svg",
    formattedName: "<i>Streptococcus vestibularis</i>",
    description:
      "Streptococcus vestibularis is a round bacterium found in the cheeks and gums.",
  },
  "Staphylococcus epidermidis": {
    file: "Staphylococcus_epidermidis.svg",
    formattedName: "<i>Staphylococcus epidermidis</i>",
    description:
      "Staphylococcus epidermidis is a round bacterium that lives on the skin and usually does not cause problems.",
  },
  "Moraxella osloensis": {
    file: "Moraxella_osloensis.svg",
    formattedName: "<i>Moraxella osloensis</i>",
    description:
      "Moraxella osloensis is a round bacterium that can live in the nose and throat.",
  },
  "Atlantibacter hermannii": {
    file: "Atlantibacter_hermannii.svg",
    formattedName: "<i>Atlantibacter hermannii</i>",
    description:
      "Atlantibacter hermannii is a rod-shaped bacterium named after a scientist, found in water.",
  },
  "Neisseria perflava": {
    file: "Neisseria_perflava.svg",
    formattedName: "<i>Neisseria perflava</i>",
    description:
      "Neisseria perflava is a round bacterium sometimes found in the mouth.",
  },
  "Cutibacterium acnes": {
    file: "Cutibacterium_acnes.svg",
    formattedName: "<i>Cutibacterium acnes</i>",
    description:
      "Cutibacterium acnes is a rod-shaped bacterium that lives in hair follicles and can cause pimples.",
  },
  "Hathewaya limosa": {
    file: "Hathewaya_limosa.svg",
    formattedName: "<i>Hathewaya limosa</i>",
    description:
      "Hathewaya limosa is a rod-shaped bacterium that lives in wet soils.",
  },
  "Paeniclostridium sordellii": {
    file: "Paeniclostridium_sordellii.svg",
    formattedName: "<i>Paeniclostridium sordellii</i>",
    description:
      "Paeniclostridium sordellii is a rod-shaped bacterium that can cause serious infections in animals.",
  },
  "Terrisporobacter mayombei": {
    file: "Terrisporobacter_mayombei.svg",
    formattedName: "<i>Terrisporobacter mayombei</i>",
    description:
      "Terrisporobacter mayombei is a rod-shaped bacterium that lives in ocean soils.",
  },
  "Enterobacter quasihormaechei": {
    file: "Enterobacter_quasihormaechei.svg",
    formattedName: "<i>Enterobacter quasihormaechei</i>",
    description:
      "Enterobacter quasihormaechei is a rod-shaped bacterium that lives in water and can sometimes cause infections.",
  },
  "Veillonella parvula": {
    file: "Veillonella_parvula.svg",
    formattedName: "<i>Veillonella parvula</i>",
    description:
      "Veillonella parvula is a round bacterium that lives in the mouth and intestines.",
  },
  "Citrobacter freundii": {
    file: "Citrobacter_freundii.svg",
    formattedName: "<i>Citrobacter freundii</i>",
    description:
      "Citrobacter freundii is a rod-shaped bacterium that lives in water and can cause infections.",
  },
  "Gemella sanguinis": {
    file: "Gemella_sanguinis.svg",
    formattedName: "<i>Gemella sanguinis</i>",
    description:
      "Gemella sanguinis is a round bacterium found in the blood and mouth.",
  },
  "Enterococcus faecalis": {
    file: "Enterococcus_faecalis.svg",
    formattedName: "<i>Enterococcus faecalis</i>",
    description:
      "Enterococcus faecalis is a round bacterium that lives in the gut and can sometimes cause infections.",
  },
  "Photobacterium leiognathi": {
    file: "Photobacterium_leiognathi.svg",
    formattedName: "<i>Photobacterium leiognathi</i>",
    description:
      "Photobacterium leiognathi is a rod-shaped bacterium that glows in the dark under seawater.",
  },
  "Clostridium paraputrificum": {
    file: "Clostridium_paraputrificum.svg",
    formattedName: "<i>Clostridium paraputrificum</i>",
    description:
      "Clostridium paraputrificum is a rod-shaped bacterium that lives in soil and in the gut.",
  },
  "Photobacterium damselae": {
    file: "Photobacterium_damselae.svg",
    formattedName: "<i>Photobacterium damselae</i>",
    description:
      "Photobacterium damselae is a rod-shaped bacterium that lives in the ocean and can sometimes make fish sick.",
  },
  "Clostridium perfringens": {
    file: "Clostridium_perfringens.svg",
    formattedName: "<i>Clostridium perfringens</i>",
    description:
      "Clostridium perfringens is a rod-shaped bacterium that can cause food poisoning.",
  },
  "Clostridium moniliforme": {
    file: "Clostridium_moniliforme.svg",
    formattedName: "<i>Clostridium moniliforme</i>",
    description:
      "Clostridium moniliforme is a rod-shaped bacterium that can live in rodents and sometimes infect people.",
  },
  "Pseudomonas palmensis": {
    file: "Pseudomonas_palmensis.svg",
    formattedName: "<i>Pseudomonas palmensis</i>",
    description:
      "Pseudomonas palmensis is a rod-shaped bacterium found on plants.",
  },
  "Streptococcus toyakuensis": {
    file: "Streptococcus_toyakuensis.svg",
    formattedName: "<i>Streptococcus toyakuensis</i>",
    description:
      "Streptococcus toyakuensis is a round bacterium that scientists found in birds.",
  },
};

const EXAMPLE_DNAS = [
  { label: "...---C--A----C-A--C--T------...", value: DNA_EXAMPLE_1 },
  { label: "...----G-------CG---GC---GA--...", value: DNA_EXAMPLE_2 },
  { label: "...---C-T-G-----C----C--T-C--...", value: DNA_EXAMPLE_3 },
  { label: "...-----A-T--GGC-------T-TTT-...", value: DNA_EXAMPLE_4 },
];

function DNATextarea({ value, onChange }) {
  const textareaRef = useRef(null);
  useEffect(() => {
    if (value && textareaRef.current) {
      const el = textareaRef.current;
      el.scrollTop = el.scrollHeight / 3;
    }
  }, [value]);
  return (
    <div>
      <label
        htmlFor="dna-input"
        style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
      >
        Paste a DNA string:
      </label>
      <textarea
        id="dna-input"
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. ATCGGATCGA..."
        rows={6}
        style={{
          width: "100%",
          fontSize: 16,
          padding: 12,
          borderRadius: 8,
          border: "1px solid #ccc",
          resize: "vertical",
          marginBottom: 16,
        }}
      />
    </div>
  );
}

function DNADropdown({ value, onChange }) {
  return (
    <div>
      <label
        htmlFor="dna-dropdown"
        style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
      >
        Select a DNA string:
      </label>
      <select
        id="dna-dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          fontSize: 16,
          padding: 12,
          borderRadius: 8,
          border: "1px solid #ccc",
          marginBottom: 16,
        }}
      >
        <option value="">-- Choose an example --</option>
        {EXAMPLE_DNAS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function PredictionResultCard({ species, onClose }) {
  const data = BACTERIA_DATA[species];
  if (!data) return null;
  return (
    <div className="prediction-result-card celebratory-pop">
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 10,
          right: 14,
          background: "none",
          border: "none",
          fontSize: 22,
          cursor: "pointer",
          color: "#b85c38",
        }}
        aria-label="Close"
      >
        ×
      </button>
      <div
        style={{ fontSize: 48, marginBottom: 8, lineHeight: 1 }}
        role="img"
        aria-label="Confetti"
      >
        🎉
      </div>
      <div
        style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}
        dangerouslySetInnerHTML={{ __html: data.formattedName || species }}
      />
      <div style={{ fontSize: 18, color: "#6b4f3b", marginBottom: 12 }}>
        {data.description}
      </div>
    </div>
  );
}

function WhoseDNAPage() {
  const [dna, setDna] = useState("");
  const [useDropdown, setUseDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const resultCardRef = useRef(null);

  useEffect(() => {
    if (showResult && resultCardRef.current) {
      resultCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [showResult]);

  async function predictSpecies() {
    setLoading(true);
    setResult(null);
    setError(null);
    setShowResult(false);
    try {
      const response = await fetch(`${API_HOST}/api/predict-species`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: dna }),
      });
      if (!response.ok) throw new Error("Prediction failed");
      const data = await response.json();
      const result = data.result || JSON.stringify(data);
      setResult(JSON.parse(result).prediction);
      setShowResult(true);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = !dna || loading;
  const buttonStyle = {
    width: "100%",
    padding: "12px 0",
    borderRadius: 8,
    border: "none",
    background: isDisabled ? "#e0e0e0" : "#8b3a2b",
    color: isDisabled ? "#888" : "#fff",
    fontSize: 18,
    fontWeight: 600,
    cursor: isDisabled ? "not-allowed" : "pointer",
    marginTop: 24,
    transition: "background 0.2s, color 0.2s",
  };

  // Switch styles
  const switchWidth = 220;
  const switchHeight = 40;
  const pillStyle = {
    width: switchWidth,
    height: switchHeight,
    background: "#f7f5f2",
    border: "1px solid #aaa",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
    cursor: "pointer",
    userSelect: "none",
    marginLeft: "auto",
    marginRight: "auto",
  };
  const sliderStyle = {
    position: "absolute",
    top: 3,
    left: useDropdown ? switchWidth / 2 + 2 : 3,
    width: switchWidth / 2 - 6,
    height: switchHeight - 6,
    background: "#8b3a2b",
    borderRadius: 16,
    transition: "left 0.2s",
    zIndex: 1,
  };
  const labelStyle = (isActive) => ({
    flex: 1,
    textAlign: "center",
    zIndex: 2,
    color: isActive ? "#fff" : "#444",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: "color 0.2s",
    position: "relative",
  });

  // Duplicate the species list twice for seamless animation
  const marqueeSpecies = [...SPECIES_LIST, ...SPECIES_LIST, ...SPECIES_LIST];

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 700,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <h1>Whose DNA?</h1>
      <p>
        Our Machine Learning class created an experimental program that uses
        artificial intelligence (AI) to study DNA from sick spinner dolphins. 
        We trained a computer model—called a neural network,
        which is a type of AI—to recognize different kinds of bacteria by
        looking at their DNA. Now, when you give it a new strand of DNA, the AI
        can predict which species of bacteria it belongs to. Using this tool, we
        can help scientists understand what might be making dolphins sick. Try
        it out below!
      </p>
      <div
        style={pillStyle}
        role="group"
        aria-label="Choose DNA input mode"
        tabIndex={0}
        onClick={() => setUseDropdown((d) => !d)}
        onKeyDown={(e) => {
          if (
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === " "
          ) {
            setUseDropdown((d) => !d);
          }
        }}
      >
        <div style={sliderStyle} aria-hidden="true" />
        <div style={labelStyle(!useDropdown)} aria-pressed={!useDropdown}>
          Textbox
        </div>
        <div style={labelStyle(useDropdown)} aria-pressed={useDropdown}>
          Dropdown
        </div>
      </div>
      {useDropdown ? (
        <>
          <DNADropdown value={dna} onChange={setDna} />
          {dna && <DNATextarea value={dna} onChange={setDna} />}
        </>
      ) : (
        <DNATextarea value={dna} onChange={setDna} />
      )}
      <button
        onClick={predictSpecies}
        disabled={isDisabled}
        style={buttonStyle}
      >
        {loading ? "Predicting..." : "Predict species"}
      </button>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {result && console.log(result)}
      {showResult && result && BACTERIA_DATA[result] && (
        <div ref={resultCardRef}>
          <PredictionResultCard
            species={result}
            onClose={() => setShowResult(false)}
          />
        </div>
      )}
      {showResult && result && !BACTERIA_DATA[result] && (
        <div style={{ color: "#444", marginTop: 16 }}>
          <strong>Prediction:</strong> {result}
        </div>
      )}

      <div className="model-about-title">About the Model</div>
      <div className="model-about-desc">
        This model can identify up to 46 different species of Bacteria.
      </div>
      {/* Animated species marquee grid */}
      <div className="species-marquee-outer">
        <div className="species-marquee-inner">
          {marqueeSpecies.map((species, i) => (
            <div className="species-marquee-item" key={i}>
              {species}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhoseDNAPage;
