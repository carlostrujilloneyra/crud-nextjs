'use client'

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from "next/navigation";
import { TaskData } from "@/libs/types/task.interface"

interface TaskCardProps {
	task: TaskData
}

export const TaskCard = ({ task }: TaskCardProps) => {

	const router = useRouter();
	
	const { title, description, createdAt, id } = task;	

	const date = new Date(createdAt);
	const day = 'dd MMM yyyy';
	const hour = 'hh:mm:ss a';

	const dateFormated = format(date, day, { locale: es });
	const hourFormated = format(date, hour, { locale: es });

	// const handleDeleteTask = (id: number) => {
	// }

	const handleNavigateTask = (id: number) => {
		router.push(`/tasks/edit/${id}`);
	}

	return (
		<>
			<div className="bg-slate-700 p-6 w-full sm:m-3 mb-5 rounded hover:bg-slate-600 hover:cursor-pointer ease-in-out duration-300"
				onClick={() => handleNavigateTask(id)}
			>
				<h2 className="text-2xl m-3 font-bold">{title}</h2>
				<p className="text-base m-3 min-h-[80px]">{description}</p>
				<p className="text-base m-3">Día: {dateFormated}</p>
				<p className="text-base m-3 mb-5">Hora: {hourFormated}</p>

				<div className="m-3">
					<button className="border mr-3 border-gray-400 py-2 px-4 mb-2 bg-blue-400 text-white round">Editar</button>
				</div>

			</div>
		</>
	)
}
