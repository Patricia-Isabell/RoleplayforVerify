"use client";

import { useEffect, useState } from "react";
import {
  ensureCharacter,
  saveCharacter,
  loadCharacter,
  resetCharacter,
} from "../lib/storage";
import { useRouter } from "next/navigation";

export default function CharacterPage() {
  const router = useRouter();
  const [form, setForm] = useState(() => ensureCharacter());

  useEffect(() => {
    const existing = loadCharacter();
    if (existing) setForm(existing);
  }, []);

  function updateStat(key, val) {
    setForm((prev) => ({
      ...prev,
      stats: { ...prev.stats, [key]: Number(val) },
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const cleaned = {
      ...form,
      name: form.name?.trim() || "Student",
      week: 1,
      stress: Number(form.stress) || 2,
      motivation: Number(form.motivation) || 3,
    };
    saveCharacter(cleaned);
    router.push("/game");
  }

  return (
    <section className="stack">
      <div className="row">
        <h2>Charakter Erstellen</h2>
        <span className="badge">Anfangswerte 0–10</span>
      </div>

      <form onSubmit={onSubmit} className="card stack">
        <div className="grid-2">
          <div className="stack">
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name eingeben"
            />
          </div>

          <div className="stack">
            <label>Motivation</label>
            <input
              type="number"
              min="0"
              max="10"
              value={form.motivation}
              onChange={(e) =>
                setForm({ ...form, motivation: Number(e.target.value) })
              }
            />
          </div>

          <div className="stack">
            <label>Stress</label>
            <input
              type="number"
              min="0"
              max="10"
              value={form.stress}
              onChange={(e) =>
                setForm({ ...form, stress: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <h3>Interessen / Anfangspunkte</h3>
        <div className="grid-2">
          <Field
            label="Mathematik"
            val={form.stats.math}
            onChange={(v) => updateStat("maths", v)}
          />
          <Field
            label="Fremdsprachen"
            val={form.stats.language}
            onChange={(v) => updateStat("languages", v)}
          />
          <Field
            label="Rechnungswesen"
            val={form.stats.science}
            onChange={(v) => updateStat("accounting", v)}
          />
          <Field
            label="Kunst-Musik"
            val={form.stats.art-music}
            onChange={(v) => updateStat("kunst-musik", v)}
          />
                 </div>
        <div className="row">
          <button type="submit">Speichern und Spiel starten</button>
          <button
            type="button"
            className="secondary"
            onClick={() => resetCharacter()}
          >
            Zurücksetzen
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({ label, val, onChange }) {
  return (
    <div className="stack">
      <label>{label}</label>
      <input
        type="number"
        min="0"
        max="10"
        value={val}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
