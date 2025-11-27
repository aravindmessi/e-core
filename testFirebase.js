import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function testDB() {
  const snap = await getDocs(collection(db, "upcomingPlayers"));
  console.log("Upcoming Players:");
  snap.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
}
