import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './utils/schema.tsx',
	dialect: 'postgresql',
	dbCredentials: {
		url: 'postgresql://contentpulsedb_owner:5nZrsBRTjGM1@ep-soft-fire-a2vo6yub.eu-central-1.aws.neon.tech/contentpulsedb?sslmode=require',
	},
})
