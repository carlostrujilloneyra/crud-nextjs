
import { getTask } from "@/libs/utils/getTask"
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/Button";

// Para actualizar los datos de la pagina cada cierto tiempo, cada 60 segundos se va a actualizar
export const revalidate = 30;

export default async function HomePage() {

  const tasks = await getTask();

  return (
    <>
      <h1 className="text-3xl m-3 font-bold">Tareas:</h1>
      <Button />
      <div className="grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-2 max-w-screen-xl">
        {tasks.map((task: any) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
