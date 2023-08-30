import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export interface Task{
	title: string;
	description: string;
}

export async function GET() {

	// El task es el modelo(tabla) de la base de datos, tasks es el arreglo con los datos de la tabla
	const tasks = await prisma.task.findMany();

	// Uso el json de abajo para que me devuelva los datos en formato json
	return NextResponse.json({
		// msg: 'obteniendo tareas',
		tasks
	});
}

export async function POST(request: Request){

	// El {title, description} : data, es la info que vamos a mandar a la base de datos
	// El request.body es la info o datos que viene del front, pero en Next.js se usa request.json() para acceder a esa información
	const { title, description }: Task = await request.json();

	// El newTask es lo que se agregará a la base de datos
	const newTask = await prisma.task.create({
		// El data si va fijo, el title y description son los campos de la tabla
		data: {
			title,
			description
		}
	})

	return NextResponse.json({
		msg: 'Tarea agregada a la base de datos',
		newTask
	});
}