function benchmark(start, serviceName) {

  const end = performance.now(); // Marca o tempo de término para benchmark
  const timeTaken = end - start;
  let formatTimeTaken = end - start;

  if (timeTaken < 1000) {
    formatTimeTaken = `${timeTaken.toFixed(2)} ms`; // Milissegundos
  } else if (timeTaken < 60000) {
    formatTimeTaken = `${(timeTaken / 1000).toFixed(2)} s`; // Segundos
  } else if (timeTaken < 3600000) {
    formatTimeTaken = `${(timeTaken / 60000).toFixed(2)} min`; // Minutos
  } else {
    formatTimeTaken = `${(timeTaken / 3600000).toFixed(2)} h`; // Horas
  }

  const colors = {
    red: '\u001b[31m',
    green: '\u001b[32m',
    blue: '\u001b[34m',
    reset: '\u001b[0m',
  };

  console.info(`
  ${colors.blue}=-=-=-=-=-=-=-=- RUNTIME -=-=-=-=-=-=-=-=${colors.reset}
  ${colors.blue}>>>${colors.reset} ${colors.red}${serviceName}${colors.reset} performed in ${colors.green}${formatTimeTaken}${colors.reset}
  ${colors.blue}>>>${colors.reset} ${timeTaken} ms
  ${colors.blue}=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=${colors.reset}
  `);
}

module.exports = {
  benchmark,
};
