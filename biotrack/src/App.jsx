import { useState, useEffect } from "react";
import { chapters } from "./chapters";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function App() {
  const [done, setDone] = useState([]);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    const ref = doc(db, "progress", "biology");
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setDone(snap.data().done || []);
    }
  }

  async function markDone(chapter) {
    if (done.includes(chapter)) return;

    const updated = [...done, chapter];

    setDone(updated);

    await setDoc(doc(db, "progress", "biology"), {
      done: updated,
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>BIOtrack</h1>

      <h3>
        Progress: {done.length} / {chapters.length}
        {" "}
        (
        {((done.length / chapters.length) * 100).toFixed(1)}
        %)
      </h3>

      {chapters.map((chapter) => (
        <div key={chapter}>
        <input
          type="checkbox"
          checked={done.includes(chapter)}
          disabled={done.includes(chapter)}
          onChange={() => markDone(chapter)}
        />
          <label>{chapter}</label>
        </div>
      ))}
    </div>
  );
}

export default App;