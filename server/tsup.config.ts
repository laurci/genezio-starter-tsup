import { defineConfig } from "tsup";
import * as fs from "fs";

export default defineConfig({
	entry: ["src/hello.ts"],
	format: "cjs",
	target: "es2020",
	platform: "node",
	noExternal: [],
	splitting: false,
	sourcemap: true,
	dts: false,
	clean: true,
	plugins: [{
		name: "genezio",
		buildEnd(ctx) {
			ctx.writtenFiles.map((file) => {
				const content = fs.readFileSync(file.name, "utf8");
				let regex = /var ([a-zA-Z_][a-zA-Z0-9_]*) = class {/g;

				let newContent: string = content;
				while (true) {
					const matches = regex.exec(content);

					if (!matches) {
						break;
					}

					newContent = newContent.replace(matches[0], `export class ${matches[1]} {`);
				}

				fs.writeFileSync(file.name, newContent);
			});
		},
	}]
});;
