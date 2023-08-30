'use client'

// import { useForm } from "@/libs/hooks/useForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Task } from "../api/tasks/route";
import Link from "next/link";

export default function NewTodoPage() {

	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const router = useRouter();
	const { idTask } = useParams();

	// Con esa función hago un llamado al backend para obtener la tarea seleccionada
	const getTaskSelected = async () => {
		const rpta = await fetch(`/api/tasks/${idTask}`);

		// Aquí ya tenemos la data de la tarea seleccionada
		const taskSelected: Task = await rpta.json();
		
		const { title, description } = taskSelected;

		setTitle(title);
		setDescription(description);
	}

	// Esto es más para editar:
	useEffect(() => {
		if (idTask) {
			getTaskSelected();
		}
	}, [idTask])
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (idTask) {
			// Si existe el idTask, entonces es una edición:
			await fetch(`/api/tasks/${idTask}`, {
				method: 'PUT',
				body: JSON.stringify({ title, description }),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} else {
      // Aquí lo mandaramos al backend, el '/api/tasks' es igual a 'http://localhost:3000/api/tasks' ya que están el mismo dominio servido

      // Lo de abajo es una petición asincrona POST que viaja al servidor

      // const rpta = await ...(de abajo)

      await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          // Le indicas lo de abajo para que sea entendido como un json que espera el backend
          "Content-Type": "application/json",
        },
      });

      // Aquí recibimos la respuesta del backend
      // const data = await rpta.json();
    }

		router.refresh();
		router.push('/');

	}

	// Acción para eliminar una tarea
	const handleDeleteTask = async () => {
		await fetch(`/api/tasks/${idTask}`, {
			// Solo va el metodo porque no hay body (info a enviar) y tampoco necesito headers!!!
			method: 'DELETE'
		});

		router.refresh();
		router.push('/');
	}

	return (
    <>
      <h2 className="text-3xl m-3 mb-6 font-bold">Nueva tarea</h2>

      <Link href='/' className="border border-gray-400 py-2 m-3 px-4 mb-2 bg-blue-400 text-white round">Atrás</Link>

      {/* Aquí irá el formulario */}

      <div className="h-screen flex justify-center items-center">
        <form className="bg-slate-700 p-10 w-2/3" onSubmit={handleSubmit}>
          <label htmlFor="title" className="font-bold mb-2">
            Título de la tarea
          </label>
          <input
            className="border border-gray-400 text-black p-2 mt-2 mb-3 w-full"
            type="text"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            name="title"
            value={title}
            placeholder="Title"
          />

          <label htmlFor="description" className="font-bold mb-2">
            Descripción de la tarea
          </label>
          <textarea
            className="border border-gray-400 p-2 mt-2 mb-3 resize-none text-black w-full h-24"
            // onChange={handleInputChange}
            onChange={({ target }) => setDescription(target.value)}
            name="description"
            value={description}
            id="description"
            placeholder="Description"
          />

          <div>
            <button type="submit" className="border border-gray-400 py-2 px-4 mr-4 mb-2 bg-blue-400 text-white round">
              Crear
            </button>

            {idTask && (
							<button type="button"
								className="border border-gray-400 py-2 px-4 mb-2 bg-red-400 text-white round"
								onClick={handleDeleteTask}
							>
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
