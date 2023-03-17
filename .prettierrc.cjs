module.exports = {
	trailingComma: "es5",
	printWidth: 100,
	singleQuote: false,
	semi: true,
	organizeImportsSkipDestructiveCodeActions: process.env.REMOVE_UNUSED_IMPORTS !== "true",
	plugins: [require("prettier-plugin-organize-imports")],
};
