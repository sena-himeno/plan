'use server'
import path from 'path';
import fs from 'fs/promises';

// todo
export const getTodoListAtServer = async (fileName: string): Promise<any> => {
	const filePath = path.join(process.cwd(), 'public', 'todoList', `${fileName}.json`);
	try {
		const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
		if (!fileExists) {
			await fs.writeFile(filePath, '[]', 'utf-8');
			console.log(`${fileName}.json created.`);
		}
		const fileData = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(fileData);
	} catch (error) {
		console.error('Error:', error);
	}
}

// diary
export const getTodoDayDiary = async (date: string): Promise<string | null> => {
	const diaryPath = path.join(process.cwd(), 'public', 'diary', `${date}.md`);
	try {
		const diaryExists = await fs.access(diaryPath).then(() => true).catch(() => false);
		if (diaryExists) {
			const diaryContent = await fs.readFile(diaryPath, 'utf-8');
			return diaryContent === '' ? null : diaryContent;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error reading diary file:', error);
		return null;
	}
};
