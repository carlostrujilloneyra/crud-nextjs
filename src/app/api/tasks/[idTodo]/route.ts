import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Task } from "@prisma/client";

// En estas funciones vemos que va el "where" y el "data", el where es para buscar el registro y el data es para actualizarlo, además que es para ruta dinámica

export async function GET(request: Request,{ params }: { params: { idTodo: number } }) {
	
	const { idTodo } = params;

	// ¿Por qué va await en la siguiente línea?
	// Porque estamos esperando a que se ejecute la función, para que nos devuelva el resultado

	const taskSearch = await prisma.task.findUnique({
		where: {
			id: Number(idTodo)
		}
	})

	return NextResponse.json(taskSearch);
}

export async function PUT(request: Request, { params }: { params: { idTodo: number } }) {

	const data: Task = await request.json();
	
	const { idTodo } = params;

	const taskUpdated = await prisma.task.update({
		where: {
			id: Number(idTodo)
		},
		// Los datos que voy actualizar son los que vienen en el segundo data (title y description), pueden ser uno o los dos!!!
		data: data
	})

	return NextResponse.json(taskUpdated);
}

export async function DELETE(request: Request, { params }: { params: { idTodo: number } }) {
	
	const { idTodo } = params;

	try {
		const taskDelete = await prisma.task.delete({
			// Significa donde el id sea igual al idTodo, para eliminar el registro
			where: {
				id: Number(idTodo)
			}
		})

		return NextResponse.json(taskDelete);

	} catch (error: any) {
		return NextResponse.json(error.message);
	}

}