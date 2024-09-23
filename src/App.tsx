"use client"; // Use "use client" se você estiver em um ambiente Next.js

import React, { useEffect, useState } from "react";
import { EmptyGoals } from "./components/EmptyGoals";
import Summary from "./components/Summary";

interface Goal {
  id: string;
  title: string;
  completedAt: string; // assuming this is a date string in ISO format
}

interface GoalsPerDay {
  [date: string]: Goal[];
}

interface Progress {
  Response: {
    completed: number;
    total: number;
    goalsPerDay: GoalsPerDay;
  };
}

async function getSummary() {
  const url = "http://localhost:3333/summary";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error: any) {
    console.error(error.message);
    return null; // Retorna null em caso de erro
  }
}


async function getPendingGoals() {
  const url = "http://localhost:3333/pending-goals";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error: any) {
    console.error(error.message);
    return null; // Retorna null em caso de erro
  }
}

export function App() {
  const [summary, setSummary] = useState<any>(null);
  const [pendingGoals, setPendingGoals] = useState<any>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getSummary();
      setSummary(data);
    };
    const fetchPending = async () => {
      const data = await getPendingGoals();
      setPendingGoals(data);
    };

    // Chama a função para buscar o resumo apenas uma vez ao montar o componente
    fetchSummary();
    fetchPending();
  }, []); // O array vazio significa que o efeito só será executado uma vez

  return (
    <>
      {summary ? <Summary goals={summary} pendingGoals={pendingGoals} /> : <EmptyGoals />}
    </>
  );
}

export default App;
