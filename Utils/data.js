import axios from "axios";
const parsePdb = require("parse-pdb");

export const parsePdbFunction = async (ligand) => {
  const { data } = await axios.get(
    `https://files.rcsb.org/ligands/view/${ligand}_ideal.pdb`
  );
  //   parsePdb;
  const parsed = parsePdb(data);
  // console.log(parsed);
  return parsed;
};
