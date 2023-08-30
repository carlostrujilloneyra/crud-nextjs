'use client'

import { useRouter } from "next/navigation";

export const Button = () => {

	const router = useRouter();

	const handleNavigateCreateTask = () => {
		router.push('/newtodo');
	}

	return (
    <>
      <button
        className="border m-3 mb-5 border-gray-400 py-2 px-4 bg-blue-400 text-white round"
        onClick={handleNavigateCreateTask}
      >
        Crear tarea
      </button>
    </>
  );
}
