export default {
  "*.{js,jsx,ts,tsx}": ["oxfmt --write", "oxlint"],
  "*.{json,md,css,yaml,yml}": ["oxfmt --write"],
};
