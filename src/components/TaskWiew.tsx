import { useContext, useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  pointerWithin,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  rectSwappingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableTask from "./Task";
import { TaskContext } from "../App";
import { useTranslation } from "react-i18next";
import { TaskViewProps } from "../types/Types";

const TaskView: React.FC<TaskViewProps> = ({ isCompletedPage }) => {
  const { tasks, swapTasks, isLoading, isError } = useContext(TaskContext)!;
  const [localTasks, setLocalTasks] = useState(tasks);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const { t }: any = useTranslation();

  const filteredTasks = tasks.filter((item) =>
    isCompletedPage ? item.isHidden : !item.isHidden
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const id1 = Number(active.id);
    const id2 = Number(over.id);

    const index1 = localTasks.findIndex((t) => t.id === id1);
    const index2 = localTasks.findIndex((t) => t.id === id2);

    if (index1 === -1 || index2 === -1) return;

    const updated = [...localTasks];
    const temp = updated[index1];
    updated[index1] = updated[index2];
    updated[index2] = temp;

    setLocalTasks(updated);
    swapTasks(id1, id2);
  };

  return (
    <div className="grid grid-cols-4 justify-center gap-[35px] flex-1 m-5 mt-5 p-5 mx-auto">
      {isLoading && tasks.length === 0 && (
        <div className="text-gray-800 dark:text-white">
          {t("fetching data...")}
        </div>
      )}

      {isError && (
        <div className="text-red-500">{t("error fetching data")}</div>
      )}

      {filteredTasks.length === 0 && !isLoading && (
        <div className="text-gray-500 dark:text-gray-300 italic">
          {t("No tasks available")}
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localTasks.map((task) => task.id)}
          strategy={rectSwappingStrategy}
        >
          {localTasks.map((task) => (
            <DraggableTask key={task.id} task={task} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TaskView;
