import React, { useState, useEffect } from "react";

/* =========================
   ChatGPT-like Styling (no deps)
   ========================= */
const Styles = () => (
  <style>{`
    :root {
      --bg: #0e1013;
      --surface: #15181d;
      --elev: #1b1f26;
      --border: #2a2f36;
      --text: #e6e8eb;
      --muted: #a0a6ad;
      --accent: #10a37f; /* ChatGPT green */
      --accent-quiet: rgba(16,163,127,.12);
      --danger: #ef4444;
      --radius: 14px;
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: #fafafa;
        --surface: #ffffff;
        --elev: #ffffff;
        --border: #e5e7eb;
        --text: #0b0f15;
        --muted: #4b5563;
        --accent: #10a37f;
        --accent-quiet: rgba(16,163,127,.12);
        --danger: #dc2626;
      }
    }
    * { box-sizing: border-box; }
    body { margin: 0; }
    .app {
      min-height: 100vh;
      background: radial-gradient(1200px 800px at 10% -10%, rgba(16,163,127,.08), transparent 60%),
                  radial-gradient(900px 700px at 110% 0%, rgba(16,163,127,.06), transparent 55%),
                  var(--bg);
      color: var(--text);
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
      padding: 20px 12px 56px;
    }
    .container {
      max-width: 720px;
      margin: 0 auto;
    }
    .header {
      display: flex; align-items: center; justify-content: center;
      gap: 10px; margin-bottom: 16px;
    }
    .logo-dot {
      width: 16px; height: 16px; border-radius: 30%;
      background: var(--accent);
      box-shadow: 0 0 0 6px var(--accent-quiet);
    }
    .title {
      font-weight: 700; letter-spacing: 0.2px; font-size: 20px;
    }
    .nav {
      display: flex; gap: 8px; justify-content: center; margin-bottom: 18px;
      position: sticky; top: 8px; z-index: 2;
    }
    .tab {
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      padding: 8px 12px;
      border-radius: 999px;
      cursor: pointer;
      transition: border-color .2s, background .2s, transform .02s;
    }
    .tab:hover { border-color: var(--accent); }
    .tab.active {
      background: var(--accent-quiet);
      border-color: var(--accent);
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 14px;
      box-shadow: 0 6px 20px rgba(0,0,0,.2);
    }
    .section-title {
      font-size: 14px; text-transform: uppercase; letter-spacing: .08em;
      color: var(--muted); margin: 0 0 10px;
    }
    .stack { display: grid; gap: 12px; }
    .row { display: flex; gap: 10px; }
    .row.center { align-items: center; }
    .btn {
      padding: 10px 12px; border-radius: 10px;
      background: var(--elev); color: var(--text);
      border: 1px solid var(--border);
      cursor: pointer;
      transition: border-color .2s, background .2s, transform .02s;
    }
    .btn:active { transform: translateY(1px); }
    .btn:hover { border-color: var(--accent); }
    .btn.primary {
      background: var(--accent);
      color: white;
      border-color: transparent;
    }
    .btn.primary:hover {
      filter: brightness(1.05);
    }
    .btn.ghost {
      background: transparent;
      border-color: var(--border);
    }
    .btn.danger {
      color: white;
      background: var(--danger);
      border-color: transparent;
    }
    .input, .select, .textarea {
      width: 100%;
      background: var(--elev);
      color: var(--text);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 12px;
      outline: none;
      transition: border-color .2s, box-shadow .2s;
      font-size: 14px;
    }
    .textarea { min-height: 68px; resize: vertical; }
    .input:focus, .select:focus, .textarea:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 4px var(--accent-quiet);
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--elev);
      color: var(--muted);
      font-size: 12px;
    }
    .list { list-style: none; margin: 0; padding: 0; }
    .list > li + li { margin-top: 6px; }
    .exercise {
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 10px;
      background: linear-gradient(180deg, var(--elev), var(--surface));
    }
    .exercise-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 8px;
    }
    .label {
      font-size: 12px; color: var(--muted); margin-bottom: 6px;
    }
    .hint {
      font-size: 12px; color: var(--muted);
    }
    .grid-4 {
      display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px;
    }
    .grid-3 {
      display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;
    }
    .space { height: 4px; }
    .kbd {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 12px;
      padding: 2px 6px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--elev);
      color: var(--muted);
    }
    .optgroup-label {
      background: transparent;
      color: var(--muted);
      padding: 4px 0 2px;
      font-weight: 600;
    }
  `}</style>
);

/* =========================
   Base App Logic (your features)
   ========================= */

// Grouped exercise options for dropdown
const EXERCISE_GROUPS = {
  Back: [
    "Barbell Row",
    "Pull-up",
    "Wide-Grip Pulldown",
    "Close-Grip Pulldown",
    "DB Rows",
    "Straight-Arm Pulldowns",
    "Face Pulls",
  ],
  Chest: [
    "Bench Press",
    "Incline Bench Press",
    "Dumbbell Fly",
    "Cable Fly",
    "Chest Press Machine",
  ],
  Arms: [
    "Bicep Curls",
    "Hammer Curls",
    "Triceps Extension",
    "Barbell Curls",
    "Forearm Curls",
    "Rope Pressdown",
    "Overhead Triceps Extension",
  ],
  Delts: [
    "Overhead Press",
    "Lateral Raise",
    "Front Raise",
    "Rear Delt Fly",
    "Arnold Press",
  ],
  Legs: [
    "Squat",
    "Deadlift",
    "Leg Press",
    "Leg Curl",
    "Leg Extension",
    "Calf Raise",
    "Lunge",
  ],
  Misc: ["Plank", "Crunches", "Farmer's Walk", "Shrugs", "Cardio"],
};

const WORKOUT_TYPES = ["Back", "Chest", "Arms", "Legs"];
const DEFAULT_DAY_NAMES = ["Day 1", "Day 2", "Day 3", "Day 4"];
const ALL_DEFAULT_EXERCISES = Object.values(EXERCISE_GROUPS).flat();

function loadData(key, def) {
  try {
    const d = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(def) && !Array.isArray(d)) return def;
    if (typeof def === "object" && typeof d !== "object") return def;
    return d ?? def;
  } catch {
    return def;
  }
}
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getExerciseGroup(name) {
  for (const group of Object.keys(EXERCISE_GROUPS)) {
    if (EXERCISE_GROUPS[group].includes(name)) return group;
  }
  return "Misc";
}

export default function App() {
  const [exerciseOptions, setExerciseOptions] = useState(() =>
    loadData("exerciseOptions", ALL_DEFAULT_EXERCISES)
  );
  const [history, setHistory] = useState(() => loadData("history", []));
  const [activeTab, setActiveTab] = useState("home");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editing, setEditing] = useState(false);
  const [workout, setWorkout] = useState({
    dayType: "",
    dayName: "",
    date: new Date().toISOString().slice(0, 10),
    exercises: [],
  });

  const [addExerciseName, setAddExerciseName] = useState("");
  const [addExerciseCustom, setAddExerciseCustom] = useState("");
  const [typeToStart, setTypeToStart] = useState("");
  const [addExerciseDropdown, setAddExerciseDropdown] = useState("");
  const [dayNames, setDayNames] = useState(() =>
    loadData("dayNames", DEFAULT_DAY_NAMES)
  );
  const [editingDayNames, setEditingDayNames] = useState(false);

  useEffect(() => {
    saveData("history", history);
  }, [history]);
  useEffect(() => {
    saveData("exerciseOptions", exerciseOptions);
  }, [exerciseOptions]);
  useEffect(() => {
    saveData("dayNames", dayNames);
  }, [dayNames]);

  function startNewWorkout(type) {
    const mostRecent = [...history].reverse().find((w) => w.dayType === type);
    let newExercises = [];
    if (mostRecent) {
      newExercises = mostRecent.exercises.map((ex) => {
        let last = null;
        for (let i = history.length - 1; i >= 0; i--) {
          const day = history[i];
          if (day.dayType !== mostRecent.dayType) continue;
          const found = day.exercises.find((e) => e.name === ex.name);
          if (found) {
            last = found;
            break;
          }
        }
        let weightIncrement = last?.weightIncrement || 5;
        let weight = last?.weight || "";
        if (last && last.increase) {
          weight = Number(last.weight || 0) + Number(weightIncrement);
        }
        return {
          ...ex,
          sets: last?.sets ?? ex.sets,
          reps: last?.reps ?? ex.reps,
          weight,
          weightIncrement,
          increase: false,
          notes: last?.notes ?? ex.notes,
        };
      });
    }
    setWorkout({
      dayType: type,
      dayName: type,
      date: new Date().toISOString().slice(0, 10),
      exercises: newExercises,
    });
    setEditingIndex(null);
    setEditing(true);
    setActiveTab("workout");
    setTypeToStart("");
  }

  function editWorkout(index) {
    setWorkout({ ...history[index] });
    setEditingIndex(index);
    setEditing(true);
    setActiveTab("workout");
  }

  function deleteWorkout(index) {
    if (!window.confirm("Delete this workout?")) return;
    setHistory((h) => {
      const updated = [...h];
      updated.splice(index, 1);
      return updated;
    });
  }

  function handleAddExercise(e) {
    e.preventDefault();
    let name =
      addExerciseName === "__custom__"
        ? addExerciseCustom.trim()
        : addExerciseName;
    if (!name) return;

    let mostRecent = null;
    for (let i = history.length - 1; i >= 0; i--) {
      const day = history[i];
      if (day.dayType !== workout.dayType) continue;
      const ex = day.exercises.find((ex) => ex.name === name);
      if (ex) {
        mostRecent = ex;
        break;
      }
    }

    let weightIncrement = 5,
      sets = "",
      reps = "",
      weight = "",
      notes = "";
    if (mostRecent) {
      weightIncrement = mostRecent.weightIncrement || 5;
      sets = mostRecent.sets;
      reps = mostRecent.reps;
      notes = mostRecent.notes || "";
      weight = mostRecent.increase
        ? Number(mostRecent.weight || 0) + Number(weightIncrement)
        : mostRecent.weight;
    }

    if (!exerciseOptions.includes(name)) {
      setExerciseOptions([...exerciseOptions, name]);
    }

    setWorkout((w) => ({
      ...w,
      exercises: [
        ...w.exercises,
        { name, sets, reps, weight, weightIncrement, increase: false, notes },
      ],
    }));

    setAddExerciseName("");
    setAddExerciseCustom("");
  }

  function updateExercise(idx, field, value) {
    setWorkout((w) => {
      const newEx = [...w.exercises];
      newEx[idx] = { ...newEx[idx], [field]: value };
      return { ...w, exercises: newEx };
    });
  }
  function removeExercise(idx) {
    setWorkout((w) => {
      const newEx = [...w.exercises];
      newEx.splice(idx, 1);
      return { ...w, exercises: newEx };
    });
  }

  function saveWorkout() {
    const fixedWorkout = {
      ...workout,
      exercises: workout.exercises.map((ex) => ({
        ...ex,
        weightIncrement: ex.weightIncrement || 5,
      })),
    };
    if (editingIndex === null) {
      setHistory((h) => [
        ...h,
        { ...fixedWorkout, date: new Date().toISOString().slice(0, 10) },
      ]);
    } else {
      setHistory((h) => {
        const updated = [...h];
        updated[editingIndex] = { ...fixedWorkout };
        return updated;
      });
    }
    setEditing(false);
    setEditingIndex(null);
    setActiveTab("home");
  }
  function cancelEdit() {
    setEditing(false);
    setEditingIndex(null);
    setActiveTab("history");
  }

  function handleEditDayNames() {
    setEditingDayNames(true);
  }
  function handleSaveDayNames(newNames) {
    setDayNames(newNames);
    setEditingDayNames(false);
  }

  function renderExerciseDropdown() {
    const groupedNames = new Set(Object.values(EXERCISE_GROUPS).flat());
    const customExercises = exerciseOptions.filter((e) => !groupedNames.has(e));
    const groupsWithCustoms = { ...EXERCISE_GROUPS };
    if (customExercises.length > 0) {
      groupsWithCustoms.Misc = [
        ...(groupsWithCustoms.Misc || []),
        ...customExercises,
      ];
    }

    return (
      <select
        className="select"
        value={addExerciseName}
        onChange={(e) => setAddExerciseName(e.target.value)}
        aria-label="Add Exercise"
      >
        <option value="">+ Add Exercise</option>
        {Object.entries(groupsWithCustoms).map(([group, exercises]) => (
          <optgroup label={group} key={group} className="optgroup-label">
            {exercises.map((name, i) => (
              <option value={name} key={name + i}>
                {name}
              </option>
            ))}
          </optgroup>
        ))}
        <option value="__custom__">Custom...</option>
      </select>
    );
  }

  return (
    <div className="app">
      <Styles />
      <div className="container">
        <header className="header">
          <span className="logo-dot" />
          <div className="title">Workout Tracker</div>
        </header>

        <nav className="nav">
          <button
            className={`tab ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
          <button
            className={`tab ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </nav>

        {/* HOME */}
        {activeTab === "home" && (
          <div className="stack">
            <div className="card">
              <div className="section-title">Start New Workout</div>
              <div className="stack">
                <select
                  className="select"
                  value={typeToStart}
                  onChange={(e) => setTypeToStart(e.target.value)}
                >
                  <option value="">Select workout type...</option>
                  {WORKOUT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button
                  className="btn primary"
                  onClick={() => startNewWorkout(typeToStart)}
                  disabled={!typeToStart}
                >
                  Create Workout
                </button>
              </div>
            </div>

            {history.length > 0 && (
              <div className="card">
                <div className="section-title">Last Workout</div>
                <div
                  className="row center"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="pill">
                    <span>{history[history.length - 1].dayType}</span>
                    <span className="kbd">
                      {history[history.length - 1].date}
                    </span>
                  </div>
                </div>
                <div className="space" />
                <ul className="list">
                  {history[history.length - 1].exercises.map((ex, i) => (
                    <li key={i}>
                      <b>{ex.name}</b> — {ex.sets} sets × {ex.reps} reps @{" "}
                      {ex.weight} lbs
                      {ex.increase ? " (↑ next time)" : ""}
                      {ex.weightIncrement && (
                        <span className="hint"> (▲ {ex.weightIncrement})</span>
                      )}
                      {ex.notes && <div className="hint">{ex.notes}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* WORKOUT EDITOR */}
        {activeTab === "workout" && editing && (
          <div className="stack">
            <div className="card">
              <div
                className="row center"
                style={{ justifyContent: "space-between" }}
              >
                <div className="pill">
                  <span>
                    Type: <b>{workout.dayType}</b>
                  </span>
                  <span className="kbd">{workout.date}</span>
                </div>
              </div>
              <div className="space" />
              <div className="label">Name</div>
              <input
                className="input"
                type="text"
                value={workout.dayName}
                onChange={(e) =>
                  setWorkout((w) => ({ ...w, dayName: e.target.value }))
                }
              />
            </div>

            <div className="card">
              <div className="section-title">Exercises</div>
              <form onSubmit={handleAddExercise} className="row">
                {renderExerciseDropdown()}
                {addExerciseName === "__custom__" && (
                  <input
                    className="input"
                    placeholder="Custom exercise"
                    value={addExerciseCustom}
                    onChange={(e) => setAddExerciseCustom(e.target.value)}
                  />
                )}
                <button className="btn" type="submit">
                  Add
                </button>
              </form>

              {workout.exercises.length === 0 && (
                <div className="hint" style={{ marginTop: 8 }}>
                  No exercises yet.
                </div>
              )}

              <ul className="list" style={{ marginTop: 10 }}>
                {workout.exercises.map((ex, idx) => (
                  <li key={idx} className="exercise">
                    <div className="exercise-head">
                      <b>{ex.name}</b>
                      <button
                        className="btn ghost"
                        onClick={() => removeExercise(idx)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid-4">
                      <input
                        className="input"
                        type="number"
                        placeholder="Sets"
                        value={ex.sets}
                        min="1"
                        onChange={(e) =>
                          updateExercise(idx, "sets", e.target.value)
                        }
                      />
                      <input
                        className="input"
                        type="number"
                        placeholder="Reps"
                        value={ex.reps}
                        min="1"
                        onChange={(e) =>
                          updateExercise(idx, "reps", e.target.value)
                        }
                      />
                      <input
                        className="input"
                        type="number"
                        placeholder="Weight"
                        value={ex.weight}
                        min="0"
                        onChange={(e) =>
                          updateExercise(idx, "weight", e.target.value)
                        }
                      />
                      <input
                        className="input"
                        type="number"
                        placeholder="▲+"
                        value={ex.weightIncrement || 5}
                        min="1"
                        onChange={(e) =>
                          updateExercise(idx, "weightIncrement", e.target.value)
                        }
                        title="Weight Increment"
                      />
                    </div>
                    <div
                      className="row center"
                      style={{ marginTop: 8, gap: 12 }}
                    >
                      <label
                        className="hint"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={!!ex.increase}
                          onChange={(e) =>
                            updateExercise(idx, "increase", e.target.checked)
                          }
                        />
                        ↑ Next time
                      </label>
                    </div>
                    <div className="space" />
                    <textarea
                      className="textarea"
                      placeholder="Notes"
                      value={ex.notes}
                      onChange={(e) =>
                        updateExercise(idx, "notes", e.target.value)
                      }
                    />
                  </li>
                ))}
              </ul>

              <div className="row" style={{ marginTop: 12 }}>
                <button
                  className="btn primary"
                  style={{ flex: 1 }}
                  onClick={saveWorkout}
                >
                  Save
                </button>
                <button
                  className="btn"
                  style={{ flex: 1 }}
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY */}
        {activeTab === "history" && (
          <div className="stack">
            <div className="card">
              <div className="section-title">Workout History</div>
              {history.length === 0 && (
                <div className="hint">No workouts yet.</div>
              )}

              <ul className="list">
                {[...history].reverse().map((day, i) => {
                  const histIndex = history.length - i - 1;
                  return (
                    <li key={histIndex} className="exercise">
                      <div className="exercise-head">
                        <div className="row center" style={{ gap: 10 }}>
                          <div className="pill">
                            <b>{day.dayName || day.dayType}</b>
                            <span className="kbd">{day.date}</span>
                            <span className="hint">[{day.dayType}]</span>
                          </div>
                        </div>
                        <div className="row" style={{ gap: 8 }}>
                          <button
                            className="btn"
                            onClick={() => editWorkout(histIndex)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn danger"
                            onClick={() => deleteWorkout(histIndex)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <ul className="list">
                        {day.exercises.map((ex, j) => (
                          <li key={j}>
                            <b>{ex.name}</b> — {ex.sets} × {ex.reps} @{" "}
                            {ex.weight}
                            {ex.increase ? " (↑ next time)" : ""}
                            {ex.weightIncrement && (
                              <span className="hint">
                                {" "}
                                (▲ {ex.weightIncrement})
                              </span>
                            )}
                            {ex.notes && <div className="hint">{ex.notes}</div>}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div className="stack">
            <div className="card">
              <div className="section-title">Exercise Library</div>
              <ul className="list">
                {Object.entries(EXERCISE_GROUPS).map(([group, exList]) => (
                  <li
                    key={group}
                    className="row"
                    style={{ flexWrap: "wrap", gap: 6 }}
                  >
                    <b style={{ minWidth: 70 }}>{group}:</b>
                    <span className="hint">{exList.join(", ")}</span>
                  </li>
                ))}
                <li className="row" style={{ flexWrap: "wrap", gap: 6 }}>
                  <b style={{ minWidth: 70 }}>Misc:</b>
                  <span className="hint">
                    {exerciseOptions
                      .filter((n) => getExerciseGroup(n) === "Misc")
                      .join(", ") || "—"}
                  </span>
                </li>
              </ul>

              <div className="space" />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = addExerciseDropdown.trim();
                  if (name && !exerciseOptions.includes(name)) {
                    setExerciseOptions([...exerciseOptions, name]);
                    setAddExerciseDropdown("");
                  }
                }}
                className="row"
              >
                <input
                  className="input"
                  placeholder="Add exercise"
                  value={addExerciseDropdown}
                  onChange={(e) => setAddExerciseDropdown(e.target.value)}
                />
                <button className="btn" type="submit">
                  Add
                </button>
              </form>
              <div className="hint" style={{ marginTop: 6 }}>
                New exercises appear under <b>Misc</b> (and are available in all
                dropdowns).
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
