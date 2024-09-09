import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const AiOutput = pgTable('aiOutput', {
	id: serial('id').primaryKey(),
	formData: varchar('formData'),
	aiResponse: text('aiResponse'),
	templateSlug: varchar('templateSlug').notNull(),
	createdBy: varchar('createdBy'),
	createdAt: varchar('createdAt'),
})
