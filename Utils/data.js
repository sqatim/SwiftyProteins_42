import axios from "axios";
const parsePdb = require("parse-pdb");

export const parsePdbFunction = async (ligand) => {
  let connectParsed;
  let connectData = [];
  let serials = {};
  let result = {};
  const { data } = await axios.get(
    `https://files.rcsb.org/ligands/view/${ligand}_ideal.pdb`
  );
  const parsed = parsePdb(data);
  connectParsed = data.split("\n");
  connectParsed = connectParsed.filter((element) => element.includes("CONECT"));
  connectParsed.map((element, key) => {
    connectData[key] = element.split("   ").slice(1);
    connectData[key] = connectData[key].map((element) => element.trim());
  });

  parsed.atoms.forEach((element) => {
    serials[element.serial] = { x: element.x, y: element.y, z: element.z };
  });

  // parsed.atoms.map((element) => {
  //   console.log(element);
  // });
  result = { atoms: parsed.atoms, serials, connectData };
  return result;
};
