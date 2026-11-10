import React, { useState, useEffect, useMemo } from 'react';

export interface SmartPortraitImgProps {
  figureId: string;
  photoUrl?: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
}

/**
 * Per-figure calibrated vertical focal coordinates (object-position)
 * tuned directly against the 16 archival portraits so every face,
 * eyes, mustache, and collar stay centered and uncropped in any portrait frame.
 */
const PORTRAIT_OBJECT_POSITION: Record<string, string> = {
  bokeikhanov: '50% 15%',
  baitursynov: '50% 24%',
  dulatov: '50% 30%',
  tynyshbaev: '50% 20%',
  kh_dosmukhamedov: '50% 26%',
  zh_dosmukhamedov: '50% 14%',
  zhumabaev: '50% 28%',
  toraighyrov: '50% 26%',
  ermekov: '50% 28%',
  marsekov: '50% 18%',
  aqbaev: '50% 28%',
  zhamanmurynov: '50% 28%',
  karataev: '50% 20%',
  torekulov: '50% 20%',
  shokay: '50% 24%',
  sadvakasov: '50% 18%',
};

/**
 * Tries the configured photoUrl first, then automatically probes .jpg, .jpeg, .png, .webp
 * in /images/portraits/<figureId>.<ext>. If none exists yet, renders the archival monogram fallback.
 */
export const SmartPortraitImg: React.FC<SmartPortraitImgProps> = ({
  figureId,
  photoUrl,
  alt,
  className = '',
  fallback,
}) => {
  const candidates = useMemo(() => {
    if (!photoUrl) return [];
    const list = [
      photoUrl,
      `/images/portraits/${figureId}.jpg`,
      `/images/portraits/${figureId}.jpeg`,
      `/images/portraits/${figureId}.png`,
      `/images/portraits/${figureId}.webp`,
    ];
    if (figureId === 'zhamanmurynov') {
      list.push('/images/portraits/zhamanmuryno.jpg');
    }
    return Array.from(new Set(list));
  }, [figureId, photoUrl]);

  const [candidateIndex, setCandidateIndex] = useState(0);

  useEffect(() => {
    setCandidateIndex(0);
  }, [figureId, photoUrl]);

  if (!photoUrl || candidateIndex >= candidates.length) {
    return <>{fallback}</>;
  }

  const objectPosition = PORTRAIT_OBJECT_POSITION[figureId] || '50% 22%';

  return (
    <img
      src={candidates[candidateIndex]}
      alt={alt}
      loading="lazy"
      style={{ objectPosition }}
      className={className}
      onError={() => setCandidateIndex((prev) => prev + 1)}
    />
  );
};
