import colors from "colors";

export const logFire = (
  protocol: "http" | "https",
  host: string,
  port: string,
) => {
  colors.enable();
  console.log(
    "⠀⠀⠀⠀⠀⠀⢱⣆⠀⠀⠀⠀⠀⠀\n".red,
    "⠀⠀⠀⠀⠀⠀⠈⣿⣷⡀⠀⠀⠀⠀\n".red,
    "⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣧⠀⠀⠀".red +
      `Backend is already ${"burning".red} on port ${port}, I wonder why...\n`,
    "⠡⠀⠀⠀⡀⢠⣿⡟⣿⣿⣿⡇⠀⠀\n".red,
    "⠀⠡⠀⠀⣳⣼⣿⡏⢸⣿⣿⣿⢀⠀".red + `      () => ${protocol}://${host}:${port}/\n`.red,
    "⠀⠀⠈⣰⣿⣿⡿⠁⢸⣿⣿⡟⣼⡆\n".red,
    "⢰⢀⣾⣿⣿⠟⠀⠀⣾⢿⣿⣿⣿⣿".red + "     " + "Happy hacking, soldier\n".green,
    "⢸⣿⣿⣿⡏⠁⠀⠀⠃⠸⣿⣿⣿⡿".red + "    " + "         .---.\n".green,
    "⢳⣿⣿⣿⠀⠀⠀⠀⡁⠀⢹⣿⡿⡁".red + "    " + "    ___ /_____\\\n".green,
    "⠀⠹⣿⣿⡄⠀⠀⠀⠀⠀⢠⣿⡞⠁".red + "    " + "   /\\.-`( '.' )\n".green,
    "⠀⠀⠈⠛⢿⣄⠀⠀⠀⣠⠞⠋⠀⢀".red + "    " + "  / /    \\_-_/_\n".green,
    "⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀".red + "    " + "  \\ `-.-\"`'V'//-.\n".green,
  );

  colors.disable();
};
