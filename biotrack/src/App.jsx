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

```
if (snap.exists()) {
  setDone(snap.data().done || []);
}
```

}

async function markDone(chapter) {
if (done.includes(chapter)) return;

```
const updated = [...done, chapter];

setDone(updated);

await setDoc(doc(db, "progress", "biology"), {
  done: updated,
});
```

}

const percent = ((done.length / chapters.length) * 100).toFixed(1);

return (
<div
style={{
maxWidth: "700px",
margin: "20px auto",
padding: "20px",
}}
>
<div
style={{
borderRadius: "20px",
padding: "20px",
}}
>
<h1
style={{
textAlign: "center",
marginBottom: "10px",
fontSize: "2.5rem",
}}
>
🧬 BIOtrack </h1>

```
    <h3 style={{ textAlign: "center" }}>
      Progress: {done.length} / {chapters.length} ({percent}%)
    </h3>

    <div
      style={{
        width: "100%",
        height: "20px",
        background: "#333",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "25px",
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: "#22c55e",
        }}
      />
    </div>

    {chapters.map((chapter) => (
      <div
        key={chapter}
        style={{
          padding: "10px 0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="checkbox"
          checked={done.includes(chapter)}
          disabled={done.includes(chapter)}
          onChange={() => markDone(chapter)}
          style={{
            transform: "scale(1.3)",
          }}
        />

        <label
          style={{
            marginLeft: "12px",
            fontSize: "18px",
          }}
        >
          {chapter}
        </label>
      </div>
    ))}
  </div>
  <footer
  style={{
    marginTop: "40px",
    textAlign: "center",
    fontSize: "14px",
    opacity: 0.8,
  }}
>
  Developed by{" "}
  <a
    href="https://hiimanish.space"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontWeight: "bold",
      textDecoration: "none",
      fontSize: "16px",
    }}
  >
    Maniish
  </a>
  <br />
  © {new Date().getFullYear()} BIOtrack. All rights reserved.
</footer>
</div>

);
}

export default App;
