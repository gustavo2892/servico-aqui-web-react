export default function verifyCep(cep) {
  if (!cep) {
    return false;
  }

  const cepAnalysis = cep.replaceAll('_', '');

  if (cepAnalysis.length !== 9) {
    return false;
  }

  return true;
}
