import { missions } from "./missions";

export const levels = [
  { name: "Explorador Digital", points: 0 },
  { name: "Aprendiz de Apps", points: 100 },
  { name: "Constructor Junior", points: 250 },
  { name: "Creador de Apps", points: 500 },
  { name: "Arquitecto Local", points: 900 },
  { name: "Builder HGI", points: 1400 },
  { name: "Maestro Molie", points: 2000 },
];

export const getCurrentLevel = (points: number) => {
  return [...levels].reverse().find((level) => points >= level.points) ?? levels[0];
};

export const getNextLevel = (points: number) => {
  return levels.find((level) => points < level.points) ?? null;
};

export const getProgressPercent = (points: number) => {
  const current = getCurrentLevel(points);
  const next = getNextLevel(points);

  if (!next) {
    return 100;
  }

  const span = next.points - current.points;
  return Math.min(100, Math.round(((points - current.points) / span) * 100));
};

export const getMissionStatus = (missionId: string, completedMissions: string[]) => {
  if (completedMissions.includes(missionId)) {
    return "completada" as const;
  }

  const missionIndex = missions.findIndex((mission) => mission.id === missionId);
  if (missionIndex === 0) {
    return "disponible" as const;
  }

  const previousMission = missions[missionIndex - 1];
  return completedMissions.includes(previousMission.id) ? "disponible" : "bloqueada";
};
