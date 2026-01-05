// Data Manager Module: Handles importing and aggregating data

import { dataAE } from "../data/a-e.js";
import { dataFJ } from "../data/f-j.js";
import { dataKO } from "../data/k-o.js";
import { dataPT } from "../data/p-t.js";
import { dataUZ } from "../data/u-z.js";

export async function loadAllData() {
  // Combine all partial arrays
  // No explicit sort needed if we trust the parts to be ordered,
  // but a global sort is safer for the full list.
  const allData = [...dataAE, ...dataFJ, ...dataKO, ...dataPT, ...dataUZ];

  return allData.sort((a, b) => a.term.localeCompare(b.term));
}
