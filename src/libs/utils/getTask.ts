import { TaskData } from '@/libs/types/task.interface';
import { prisma } from '../prisma';

export const getTask = async (): Promise <TaskData []> => {

	const data = await prisma.task.findMany();

	return data;

}